import { DB } from "../db";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async (input: any): Promise<{}> => {
  const result = await DB.insert(carts)
    .values({
      customerId: 1,
    })
    .returning({ cartId: carts.id });

  console.log(result);

  return Promise.resolve({ message: "response from cart repository" });
};

const findCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "response from cart repository" });
};

const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "response from cart repository" });
};

const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "response from cart repository" });
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: findCart,
  update: updateCart,
  delete: deleteCart,
};
