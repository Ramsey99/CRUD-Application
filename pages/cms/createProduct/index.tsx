import { createMutation } from "@/customHooks/query/cms.query.createhooks";
import { createProps } from "@/typeScript/cms.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid2,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createProps>();
  const { mutate, isPending } = createMutation();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (formData: createProps) => {
    const { name, price, description, category } = formData;
    mutate(
      { name, price, category, description, token: "", message: "", status: 0 },
      {
        onSuccess: () => {
          reset();
          toast.success("Product created successfully");
        },
      }
    );
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-100">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create New Product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter product name"
                className={`w-full p-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <input
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Enter product price"
                className={`w-full p-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Category
              </label>
              <input
                {...register("category", { required: "Category is required" })}
                placeholder="Enter product category"
                className={`w-full p-2 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter product description"
                rows={4}
                className={`w-full p-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
