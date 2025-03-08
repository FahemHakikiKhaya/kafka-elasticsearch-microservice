import axios from "axios";
import { CATALOG_SERVICE_BASE_URL, USER_SERVICE_BASE_URL } from "../../config";
import { logger } from "../logger";
import { AuthorizeError, NotFoundError } from "../error";
import { Product } from "../../dto/product.dto";
import { User } from "../../dto/User.Model";

export const GetProductDetails = async (productId: number) => {
  try {
    const response = await axios.get<Product>(
      `${CATALOG_SERVICE_BASE_URL}/products/${productId}`
    );

    return response.data;
  } catch (error) {
    logger.error(error);
    throw new NotFoundError("prodcut not found");
  }
};

export const GetStockDetails = async (ids: number[]) => {
  try {
    const response = await axios.post(
      `${CATALOG_SERVICE_BASE_URL}/products/stock`,
      {
        ids,
      }
    );
    return response.data as Product[];
  } catch (error) {
    throw new NotFoundError("error on getting stock details");
  }
};

export const ValidateUser = async (token: string) => {
  try {
    const response = await axios.get(`${USER_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      throw new AuthorizeError("user not authorized");
    }

    return response.data as User;
  } catch (error) {
    throw new AuthorizeError("user not authorized");
  }
};
