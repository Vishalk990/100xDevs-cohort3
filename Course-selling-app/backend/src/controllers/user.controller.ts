import z, { string } from "zod";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";
import purchaseModel from "../models/purchase.model";
import courseModel from "../models/course.model";

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

async function userSignupHandler(req: Request, res: Response): Promise<void> {
  const zodUserSchema = z.object({
    email: z.string().email().min(5).max(50),
    password: z.string().min(5),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    userName: z.string().min(2).max(20),
  });

  const userParseData = zodUserSchema.safeParse(req.body);

  if (!userParseData.success) {
    res.status(400).json({
      error: userParseData.error.issues[0].message,
    });
    return;
  }

  const { email, password, firstName, lastName, userName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName,
    });

    res.status(200).json({
      message: "Signup successful",
      userId: user._id,
    });
    return;
  } catch (error) {
    // Check if it's a MongoDB duplicate key error
    if (error instanceof MongooseError) {
      res.status(400).json({ error: "Username or email already exists" });
      return;
    }
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function userSignInHandler(
  req: Request,
  res: Response
): Promise<undefined> {
  const { identifier, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!existingUser) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      res.status(403).json({
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        firstName: existingUser.firstName,
      },
      JWT_USER_SECRET as string
    );

    // return res.status(200).cookie("jwt", token).json({
    //     message: "Signin successfull",
    //     token: token
    // });

    // Using cookie-based auth here
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      message: "SignIn successfull",
      token: token,
    });
    return;
  } catch (err) {
    res.status(500).json({
      error: err,
    });
    return;
  }
}

async function userPurchase(req: Request, res: Response) {
  const { userId } = req.headers;

  try {
    const purchasedCourses = await purchaseModel.find({
      userId: userId,
    });

    const coursesData = await courseModel.find({
      _id: { $in: purchasedCourses.map((x) => x.courseId) },
    });

    res.json({
      purchasedCourses,
      coursesData,
    });

    return;
  } catch (err) {
    res.json({ err });
    return;
  }
}

async function checkUsername(req: Request, res: Response) {
  try {
    const user = await userModel.findOne({
      userName: req.query.userName,
    });

    res.status(200).json({
      data: user ? false : true,
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: error,
    });
    return;
  }
}
async function userLogout(req: Request, res: Response) {
  res.status(200).clearCookie("token").json({
    message: "Logout successfull",
  });
}

export { userSignInHandler, userSignupHandler, userPurchase, checkUsername ,userLogout};
