import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils";
import { ProductFactory } from "../utils/fixtures";
import { PrismaClient } from "@prisma/client";

export class CatalogRepository implements ICatalogRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }
  async update(data: Product): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
  async delete(id: any): Promise<{ id: number }> {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findFirst({ where: { id } });

    if (product) {
      return Promise.resolve(product);
    }

    throw new NotFoundError("product not found");
  }

  findStock(ids: number[]): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
