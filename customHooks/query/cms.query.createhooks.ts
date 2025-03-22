import { Cookies } from "react-cookie";
import {
  createProps,
  deleteProps,
  updateProps,
  detailsProps,
} from "@/typeScript/cms.interface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { createProductFn } from "../../api/functions/create.api";
import { deleteProductFn } from "../../api/functions/delete.api";
import { updateProductFn } from "../../api/functions/update.api";
import {
  allProductsAPICall,
  allProductDetails,
} from "../../api/functions/list.api";
import { listProps } from "@/typeScript/cms.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const allProductsQuery = () =>
  useQuery({
    queryKey: ["LISTPRODUCTS"],
    queryFn: () => allProductsAPICall(),
    select: (data) => ({
      products: data.products || [],
      totalCount: data.totalCount || 0,
      keepPreviousData: false,
    }),
  });

export const fetchProductQuery = (
  id: string | undefined
): UseQueryResult<detailsProps, unknown> => {
  return useQuery({
    queryKey: ["PRODUCTDETAILS", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const data = await allProductDetails(id);
      if (!data) throw new Error("No product data found");
      return data;
    },
    enabled: !!id,
    retry: 1,
  });
};

export const createMutation = (): UseMutationResult<createProps, unknown, createProps> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<createProps, unknown, createProps>({
    mutationFn: createProductFn,
    onSuccess: (res) => {
      const { token, status, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
      }
      queryClient.invalidateQueries({ queryKey: ["CREATE"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
  
};

export const deleteMutation = (): UseMutationResult<void, unknown, string> => {
  const { queryClient } = useGlobalHooks();

  return useMutation<void, unknown, string>({
    mutationFn: deleteProductFn,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};

export const updateMutation = (): UseMutationResult<
  updateProps,
  unknown,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<updateProps, unknown, unknown>({
    mutationFn: updateProductFn,
    onSuccess: (res) => {
      const { status, user, token } = res || {};
      if (status === 200 && token) {
        alert("Product updated successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["UPDATE"] });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};
