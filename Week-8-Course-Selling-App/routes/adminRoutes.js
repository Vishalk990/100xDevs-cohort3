const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const { adminModel } = require("../db");
const { adminAuthMiddlware } = require("../middlewares/admin.auth");

adminRouter.post("/signup", async function (req, res) {

    const adminSignUpSchema = z.object({
        email: z.string().email().min(5).max(50),
        password: z.string().min(5),
        firstName: z.string().min(2).max(20),
        lastName: z.string().min(2).max(20),
    });

    const parsedData = adminSignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.json({
            error: parsedData.error.issues[0].message,
        })
    }

    const { email, password, firstName, lastName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return res.json({
            message: "Admin signup successfull",
            userId: user._id,
        })

    } catch (err) {
        return res.json({
            error: err,
        });
    }
});

adminRouter.post("/signin", async function (req, res) {

    const zodUserLoginSchema = z.object({
        identifier: z.union([z.string().email(), z.string().min(2).max(20)]),
        password: z.string().min(5),
    });

    const { identifier, password } = req.body;

    const adminLoginParseData = zodUserLoginSchema.safeParse(req.body);

    if (!adminLoginParseData.success) {
        return res.json({
            error: adminLoginParseData.error.issues[0].message
        })
    }

    try {
        const existingAdmin = await adminModel.findOne({
            $or: [{ email: identifier }, { firstName: identifier }]
        });

        if (!existingAdmin) {
            return res.status(404).json({
                message: "Admin not found!"
            });
        }

        const passwordMatch = await bcrypt.compare(password, existingAdmin.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Invalid password",
            })
        }

        const token = jwt.sign({
            adminId: existingAdmin._id,
            email: existingAdmin.email,
            firstName: existingAdmin.firstName
        }, process.env.JWT_ADMIN_SECRET);

        return res.status(200).cookie("jwt", token).json({
            message: "Signin successfull",
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            err: err
        })
    }
});

adminRouter.post("/", adminAuthMiddlware, function (req, res) {

    const { username, adminId } = req.headers;
    res.json({
        message: "create course endpoint",
        username: username,
        adminId: adminId
    })
})

adminRouter.put("/", function (req, res) {
    res.json({

    })
});

adminRouter.get("/bulk", function (req, res) {
    res.json({

    })
})


module.exports = {
    adminRouter: adminRouter
}
