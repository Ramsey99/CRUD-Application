import { createProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export const createProductFn = async (data: createProps): Promise<createProps> => {
  return axiosInstance.post(endPoints.pages.create, data, {
    headers: { "Content-Type": "application/json" },
  });
};
