import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { sampleProducts } from "./data";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/TSAMAZONDB";

mongoose.set("strictQuery", true);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to mongodb");
	})
	.catch(() => {
		console.log("error mongodb");
	});

const app = express();
app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:5173"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

// app.get("/api/products", (req: Request, res: Response) => {
// 	res.json(sampleProducts);
// });

// app.get("/api/products/:slug", (req: Request, res: Response) => {
// 	res.json(sampleProducts.find((x) => x.slug === req.params.slug));
// });

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`);
});
