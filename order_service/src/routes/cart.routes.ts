import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import { CartRepository } from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = CartRepository;

router.post(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (error) {
        res.status(404).json({ error });
        return;
      }

      const response = await service.CreateCart(
        req.body as CartRequestInput,
        repo
      );
      res.status(200).send(response);
      return;
    } catch (error) {
      res.status(404).json({ error });
      return;
    }
  }
);

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
  const response = await service.GetCart(req.body, repo);
  res.status(200).send(response);
  return;
});

router.patch(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.UpdateCart(req.body, repo);
    res.status(200).send(response);
    return;
  }
);

router.delete(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.DeleteCart(req.body, repo);
    res.status(200).send(response);
    return;
  }
);

export default router;
