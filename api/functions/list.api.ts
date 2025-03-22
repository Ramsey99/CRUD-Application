import { listProps, detailsProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export const allProductsAPICall = async () => {
  const res = await axiosInstance.get<{
    status: boolean;
    message: string;
    product: listProps[];
    totalCount: number;
  }>(endPoints.pages.list);
  console.log("API Response:", res.data);
  return { products: res.data.product, totalCount: res.data.totalCount };
};

export const allProductDetails = async (
  id: string
): Promise<detailsProps | null> => {
  try {
    const res = await axiosInstance.get<{
      status: boolean;
      message: string;
      product: detailsProps;
    }>(`${endPoints.pages.details}/${id}`);

    if (!res.data || !res.data.product) {
      throw new Error("Product details not found.");
    }

    return res.data.product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};
