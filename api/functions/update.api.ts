import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import { MutationFunction } from "@tanstack/react-query";
import { updateProps } from "@/typeScript/cms.interface";

export const updateProductFn: MutationFunction<updateProps> = async (
  payload
) => {
  if (!payload._id) {
    throw new Error("Product ID is required for update.");
  }

  const res = await axiosInstance.put<updateProps>(
    `${endPoints.pages.update}/${payload._id}`,
    payload
  );
  return res.data;
};
