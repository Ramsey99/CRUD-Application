import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { deleteProps } from "@/typeScript/cms.interface";
import { endPoints } from "../endPoints/endPoints";

export const deleteProductFn: MutationFunction<void, string> = async (id) => {
  try {
    const res = await axiosInstance.delete(`${endPoints.pages.delete}/${id}`);
    console.log("Delete Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Delete API Error:", error);
    throw new Error("Failed to delete product");
  }
};
