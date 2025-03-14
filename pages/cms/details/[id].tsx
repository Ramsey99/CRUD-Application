import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { fetchProductQuery } from "@/customHooks/query/cms.query.createhooks";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, isLoading, isError } = fetchProductQuery(id as string);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ background: "linear-gradient(to right, #d1c4e9, #b39ddb)" }}
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        Failed to load product details.
      </Typography>
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        padding: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 500,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
            Product Details
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {product?.image}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {product?.name}
          </Typography>
          <Typography variant="body1" mt={1} color="text.secondary">
            Description: {product?.description}
          </Typography>
          <Typography variant="h6" color="secondary" mt={1}>
            Category: {product?.category}
          </Typography>
          <Typography variant="h5" color="green" fontWeight="bold" mt={2}>
            ${product?.price}
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/cms/list")}
              sx={{ fontSize: 16, px: 3, py: 1 }}
            >
              Back to List
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
