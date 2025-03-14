import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState, useEffect } from "react";
import {
  allProductsQuery,
  deleteMutation,
  updateMutation,
} from "../../../customHooks/query/cms.query.createhooks";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertComponent from "@/ui/sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function List() {
  const [page, setPage] = useState(1);
  const [isTableView, setIsTableView] = useState(false);
  const perPage = 10;
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = allProductsQuery(page, perPage);
  const { mutate: deleteMutate } = deleteMutation();
  const { mutate: updateMutate, isPending: isUpdating } = updateMutation();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const router = useRouter();
  const products = data?.products || [];
  const totalCount = data?.totalCount ?? data?.products?.length ?? 0;
  const totalPages = Math.ceil(totalCount / perPage);
  console.log("Total Pages:", totalPages, "Total Count:", totalCount);

  useEffect(() => {
    console.log("Current Page:", page);
  }, [page]);

  const handleDelete = () => {
    if (deleteId) {
      deleteMutate(deleteId, {
        onSuccess: () => {
          setModal(false);
          queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
          toast.success("Product deleted successfully!");
        },
        onError: () => toast.error("Failed to delete product."),
      });
    }
  };

  const handleUpdate = () => {
    if (!editProduct) return;
    updateMutate(editProduct, {
      onSuccess: () => {
        setEditProduct(null);
        queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
        toast.success("Product updated successfully!");
      },
      onError: () => toast.error("Failed to update product."),
    });
  };

  const handleNextPage = () => {
    console.log(
      "Next Page Clicked, Current Page:",
      page,
      "Total Pages:",
      totalPages
    );
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    console.log("Previous Page Clicked, Current Page:", page);
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box sx={{ minHeight: "100vh", background: "#f5f5f5", padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Product List
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            onClick={() => setIsTableView(!isTableView)}
            color="primary"
          >
            {isTableView ? <GridViewIcon /> : <ViewListIcon />}
          </IconButton>
        </Box>

        <Box sx={{ maxWidth: "1300px", margin: "0 auto", padding: "0 16px" }}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Typography align="center" variant="h6" color="error">
              Failed to load products.
            </Typography>
          ) : products.length > 0 ? (
            isTableView ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <img
                            src={product.image || "/productImg.jpg"}
                            alt={product.name}
                            width={50}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(product._id);
                              setModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => setEditProduct(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              router.push(`/cms/details/${product._id}`)
                            }
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card
                        sx={{
                          background: "#ffffff",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          borderRadius: 3,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.image || "/productImg.jpg"}
                          alt={product.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            align="center"
                            fontWeight="bold"
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                          >
                            ${product.price}
                          </Typography>
                        </CardContent>
                        <Box
                          display="flex"
                          justifyContent="center"
                          gap={2}
                          p={2}
                        >
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(product._id);
                              setModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => setEditProduct(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              router.push(`/cms/details/${product._id}`)
                            }
                          >
                            View Details
                          </Button>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )
          ) : (
            <Typography align="center" width="100%">
              No products found.
            </Typography>
          )}

          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <IconButton
              onClick={handlePreviousPage}
              disabled={page === 1}
              color="primary"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" align="center">
              Page {page} of {totalPages}
            </Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={page >= totalPages}
              color="primary"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {modal && (
            <SweetAlertComponent
              confirm={handleDelete}
              cancle={() => setModal(false)}
              title="Are You Sure?"
              subtitle="You will not be able to recover this product"
              type="warning"
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
            />
          )}

          {editProduct && (
            <Dialog
              open={!!editProduct}
              onClose={() => setEditProduct(null)}
              fullWidth
            >
              <DialogTitle>Edit Product</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Title"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Category"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Price"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditProduct(null)} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  color="primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Save"}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      </Box>
    </>
  );
}
