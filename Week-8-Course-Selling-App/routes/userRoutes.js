const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { userAuthMiddleware } = require("../middlewares/user.auth");


userRouter.post("/signup", async function (req, res) {

    const zodUserSchema = z.object({
        email: z.string().email().min(5).max(50),
        password: z.string().min(5),
        firstName: z.string().min(2).max(20),
        lastName: z.string().min(2).max(20),
    });

    const userParseData = zodUserSchema.safeParse(req.body);

    if (!userParseData.success) {
        return res.json({
            // error: "Incorrect format"
            error: userParseData.error.issues[0].message
        })
    }

    const { email, password, firstName, lastName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        return res.json({
            message: "Signup successfull",
            userId: user._id
        })
    } catch (err) {
        return res.json({
            error: err
        })
    }
});

userRouter.post("/signin", async function (req, res) {

    const zodUserLoginSchema = z.object({
        identifier: z.union([z.string().email(), z.string().min(2).max(20)]),
        password: z.string().min(5),
    });

    const { identifier, password } = req.body;

    const userLoginParseData = zodUserLoginSchema.safeParse(req.body);

    if (!userLoginParseData.success) {
        return res.json({
            error: userLoginParseData.error.issues[0].message
        })
    }

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email: identifier }, { firstName: identifier }]
        });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Invalid password",
            })
        }

        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            firstName: existingUser.firstName
        }, process.env.JWT_USER_SECRET);

        return res.status(200).cookie("jwt", token).json({
            message: "Signin successfull",
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            err: err
        })
    }
})

userRouter.get("/purchases", userAuthMiddleware, function (req, res) {

    const { username, userId } = req.headers;
    return res.json({
        message: "User courses endpoint",
        username: username,
        userId: userId,
    });
});

module.exports = {
    userRouter: userRouter
}