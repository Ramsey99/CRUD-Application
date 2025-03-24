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
      <ToastContainer position="top-right" autoClose={3000} />
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right,#d1c4e9,rgb(238, 206, 254))",
        }}
      >
        <Paper
          style={{
            width: "100%",
            maxWidth: 400,
            padding: 25,
            background: "#f3e5f5",
            borderRadius: 15,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginBottom: 20 }}
          >
            Create New Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Name"
              placeholder="Enter product name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              label="Price"
              placeholder="Enter product price"
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              {...register("category", {
                required: "Category is required",
              })}
              label="Category"
              placeholder="Enter product category"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
            />
            <TextField
              {...register("description", {
                required: "Description is required",
              })}
              label="Description"
              placeholder="Enter product description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, fontSize: 18, color: "#000" }}
              disabled={isPending}
            >
              <b>{isPending ? "Creating..." : "Create Product"}</b>
            </Button>
          </form>
        </Paper>
      </Grid2>
    </>
  );
};

export default ProductCreate;
