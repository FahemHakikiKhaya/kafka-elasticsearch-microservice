import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
  private repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }

  async createProduct(input: any) {
    const data = await this.repository.create(input);

    if (!data.id) {
      throw new Error("unable to create product");
    }

    return data;
  }

  async updateProduct(input: any) {
    const data = await this.repository.update(input);

    if (!data.id) {
      throw new Error("unable to update product");
    }
    // todo: emit event to update record in Elastic Search

    return data;
  }

  async getProducts(limit: number, offset: number) {
    const products = await this.repository.find(limit, offset);

    return products;
  }

  async getProduct(id: number) {
    const product = await this.repository.findOne(id);

    return product;
  }

  async deleteProduct(id: number) {
    const response = await this.repository.delete(id);

    return response;
  }

  async getProductStock(ids: number[]) {
    const products = await this.repository.findStock(ids);

    if (!products) {
      throw new Error("unable to find product stock details");
    }

    return products;
  }

  async handleBrokerMessage(data: any) {}
}
