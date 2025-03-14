import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { updateProps } from "../../../typeScript/cms.interface";
import toast from "react-hot-toast";
import {
  fetchProductQuery,
  updateMutation,
} from "@/customHooks/query/cms.query.createhooks";

export default function UpdateProduct() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug as string;

  const { data: product, isLoading, isError } = fetchProductQuery(id);
  const { mutate, isPending } = updateMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateProps>();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  const sendData = (data: updateProps) => {
    mutate(
      { id, ...data },
      {
        onSuccess: () => {
          toast.success("Product Updated!");
          router.push("/cms/list");
        },
        onError: () => toast.error("Failed to update product."),
      }
    );
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Failed to load product.</Typography>;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(sendData)}>
          <TextField
            {...register("name", { required: true })}
            label="Name"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register("description", { required: true })}
            label="Description"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register("category", { required: true })}
            label="Category"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register("price", { required: true })}
            label="Price"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
