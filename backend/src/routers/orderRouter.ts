import asyncHandler from "express-async-handler";
import express, { Request, Response } from "express";
import { Product } from "../models/productModel";
import { OrderModel } from "../models/orderModel";
import { isAuth } from "../utils";
export const orderRouter = express.Router();

orderRouter.get(
	"/mine",
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await OrderModel.find({ user: req.user._id });
		res.send(orders);
	})
);
orderRouter.get(
	"/:id",
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const order = await OrderModel.findById(req.params.id);
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ message: "Order Not Found" });
		}
	})
);

orderRouter.post(
	"/",
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		if (req.body.orderItems.length === 0) {
			res.status(400).json({ message: "Cart is empty" });
		} else {
			const createdOrder = await OrderModel.create({
				orderItems: req.body.orderItems.map((x: Product) => ({
					...x,
					product: x._id,
				})),
				shippingAddress: req.body.shippingAddress,
				paymentMethod: req.body.paymentMethod,
				itemsPrice: req.body.itemsPrice,
				shippingPrice: req.body.shippingPrice,
				taxPrice: req.body.taxPrice,
				totalPrice: req.body.totalPrice,
				user: req.user._id,
			});
			res.status(201).json({ message: "Order Created", order: createdOrder });
		}
	})
);
