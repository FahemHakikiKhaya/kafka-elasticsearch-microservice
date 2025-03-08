import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import { CartRepository } from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";
import { RequestAuthorizer } from "./middleware";
import { AuthorizeError } from "../utils";

const router = express.Router();
const repo = CartRepository;

router.post(
  "/cart",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        next(new AuthorizeError());
        return;
      }

      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (error) {
        res.status(404).json({ error });
        return;
      }

      const input: CartRequestInput = req.body;
      const response = await service.CreateCart(
        { ...input, customerId: user.id },
        repo
      );
      res.status(200).json(response);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/cart",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        next(new AuthorizeError());
        return;
      }

      const response = await service.GetCart(Number(user.id), repo);
      res.status(200).send(response);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/cart/:lineItemId",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        next(new Error("User not found"));
        return;
      }

      const lineItemId = req.params.lineItemId;
      const response = await service.UpdateCart(
        {
          id: +lineItemId,
          qty: req.body.qty,
          customerId: user.id,
        },
        repo
      );
      res.status(200).send(response);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/cart/:lineItemId",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const lineItemId = req.params.lineItemId;
      const response = await service.DeleteCart(
        { id: +lineItemId, customerId: user.id },
        repo
      );
      res.status(200).send(response);
      return;
    } catch (error) {
      next(error);
    }
  }
);

export default router;
