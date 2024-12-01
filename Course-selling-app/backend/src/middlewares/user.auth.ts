import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../utils/constants";


function userAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token: string = req.headers.token as string;

  const decodedData = jwt.verify(token, JWT_USER_SECRET);

  if (!decodedData) {
    res.status(403).json({
      message: "Not able to sign in",
    });
    return;
  } else {
    console.log(decodedData.firstName);
    
    // req.headers.username = decodedData.firstName;
    // req.headers.userId = decodedData.userId;
    next();
  }
}

export default userAuthMiddleware;
