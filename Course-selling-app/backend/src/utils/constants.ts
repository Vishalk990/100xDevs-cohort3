const JWT_USER_SECRET: string = process.env.JWT_USER_SECRET as string;
const PORT: number = Number(process.env.PORT);
const MONGO_URL: string = String(process.env.MONGO_URL);

export { JWT_USER_SECRET, PORT, MONGO_URL };
