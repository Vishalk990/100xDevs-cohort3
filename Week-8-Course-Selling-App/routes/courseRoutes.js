const { Router } = require("express");
const { userAuthMiddleware } = require("../middlewares/user.auth");
const { purchaseModel, courseModel } = require("../db")
const courseRouter = Router();

courseRouter.get("/preview", async function (req, res) {
    const courses = await courseModel.find({});

    return res.json({
        courses
    })
})

courseRouter.post("/purchase", userAuthMiddleware, async function (req, res) {

    const { userId } = req.headers;
    const { courseId } = req.body;

    const alreadyBought = await purchaseModel.findOne({
        userId: userId,
        courseId: courseId,
    })

    if (alreadyBought) {
        return res.json({
            message: "Course already purchased"
        })
    }

    try {
        await purchaseModel.create({
            userId: userId,
            courseId: courseId
        })
        return res.json({
            message: "Course purchased successfully",
        })
    } catch (error) {
        return res.json({
            error: error
        })
    }
});



module.exports = {
    courseRouter: courseRouter
}