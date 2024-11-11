const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userAuthMiddleware } = require("../middlewares/user.auth");


userRouter.post("/signup", async function (req, res) {

    const zodUserSchema = z.object({
        email: z.string().email().min(5).max(50),
        password: z.string().min(5),
        firstName: z.string().min(2).max(20),
        lastName: z.string().min(2).max(20),
        userName: z.string().min(2).max(20),
    });

    const userParseData = zodUserSchema.safeParse(req.body);

    if (!userParseData.success) {
        return res.status(400).json({
            // error: "Incorrect format"
            error: userParseData.error.issues[0].message
        })
    }

    const { email, password, firstName, lastName, userName } = req.body;
    console.log(req.body);


    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            userName: userName
        });

        return res.status(200).json({
            message: "Signup successfull",
            userId: user._id
        })
    } catch (error) {
        if (error?.code === 11000) {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        return res.status(500).json({ error: "Something went wrong" });
    }
});

userRouter.post("/signin", async function (req, res) {

    const { identifier, password } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email: identifier }, { userName: identifier }]
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

        // return res.status(200).cookie("jwt", token).json({
        //     message: "Signin successfull",
        //     token: token
        // });

        // Using cookie-based auth here
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: "SignIn successfull",
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            error: err
        })
    }
})

userRouter.get("/purchases", userAuthMiddleware, async function (req, res) {

    const { userId } = req.headers;

    try {
        const purchasedCourses = await purchaseModel.find({
            userId: userId
        });

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourses.map(x => x.courseId) }
        })

        return res.json({
            purchasedCourses,
            coursesData
        })
    } catch (err) {
        res.json({ err })
    }
});

userRouter.get("/check-username", async (req, res) => {

    try {
        const user = await userModel.findOne({
            userName: req.query.userName,
        });

        return res.status(200).json({
            data: user ? false : true,
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

userRouter.get("/logout", (req,res) => {
    res.status(200).clearCookie("token").json({
        message: "Logout successfull"
    });
});

module.exports = {
    userRouter: userRouter
}