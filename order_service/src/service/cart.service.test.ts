import { CartRepository } from "../repository/cart.repository";
import { CartRepositoryType } from "../types/repository.type";
import { CreateCart } from "./cart.service";

describe("cartService", () => {
  let repo: CartRepositoryType;

  beforeEach(() => {
    repo = CartRepository;
  });

  afterEach(() => {
    repo = {} as CartRepositoryType;
  });

  it("should return correct data while creating cart", async () => {
    const mockCart = {
      title: "smart phone",
      amount: 123,
    };

    const res = await CreateCart(mockCart, repo);

    expect(res).toEqual(res);
  });
});
