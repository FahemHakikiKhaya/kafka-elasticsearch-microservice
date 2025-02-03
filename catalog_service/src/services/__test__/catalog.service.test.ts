import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatelogRepository } from "../../repository/mockCatalog.repository";
import { ProductFactory } from "../../utils/fixtures";
import { CatalogService } from "../catelog.service";
import { faker } from "@faker-js/faker";

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: faker.commerce.price(),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatelogRepository();
  });

  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);

      const product = mockProduct({ price: +faker.commerce.price() });

      const result = await service.createProduct(product);

      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw error with unable to create product", async () => {
      const services = new CatalogService(repository);

      const reqBody = mockProduct({
        price: faker.commerce.price(),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(services.createProduct(reqBody)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("should throw error with product already exist", async () => {
      const services = new CatalogService(repository);

      const reqBody = mockProduct({
        price: faker.commerce.price(),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exist"))
        );

      await expect(services.createProduct(reqBody)).rejects.toThrow(
        "product already exist"
      );
    });
  });

  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({
        price: +faker.commerce.price(),
        id: faker.number.int({ min: 100, max: 1000 }),
      });

      const result = await service.updateProduct(reqBody);

      expect(result).toMatchObject(reqBody);
    });

    test("should throw error with product does not exist", async () => {
      const services = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );

      await expect(services.updateProduct({})).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 50 });

      const products = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));

      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);

      expect(result).toMatchObject(products);
    });

    test("should throw error with product does not exist", async () => {
      const services = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );

      await expect(services.getProducts(0, 0)).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("getProduct", () => {
    test("should get product by id", async () => {
      const service = new CatalogService(repository);

      const product = ProductFactory.build();

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.getProduct(product.id!);

      expect(result).toMatchObject(product);
    });

    test("should throw error with product does not exist", async () => {
      const services = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );

      await expect(services.getProducts(0, 0)).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("deleteProduct", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);

      const product = ProductFactory.build();

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id! }));

      const result = await service.deleteProduct(product.id!);

      expect(result).toMatchObject({
        id: product.id,
      });
    });
  });

  afterEach(() => {
    repository = {} as MockCatelogRepository;
  });
});
