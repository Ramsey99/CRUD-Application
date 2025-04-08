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
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState } from "react";
import {
  allProductsQuery,
  deleteMutation,
  updateMutation,
} from "../../../customHooks/query/cms.query.createhooks";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Product } from "@/typeScript/cms.interface";
import SweetAlertComponent from "@/ui/sweetalert";

export default function List() {
  const [isTableView, setIsTableView] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = allProductsQuery();
  const { mutate: deleteMutate } = deleteMutation();
  const { mutate: updateMutate, isPending: isUpdating } = updateMutation();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const router = useRouter();
  const products = data?.products || [];

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

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-100 p-6">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Product List
        </h2>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsTableView(!isTableView)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all"
          >
            {isTableView ? <GridViewIcon /> : <ViewListIcon />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isError ? (
            <p className="text-center text-red-500 font-medium">
              Failed to load products.
            </p>
          ) : products.length > 0 ? (
            isTableView ? (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-3">Image</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="text-center border-b">
                        <td className="p-3">
                          <img
                            src={product.image || "/productImg.jpg"}
                            alt={product.name}
                            className="w-12 h-12 rounded-md mx-auto"
                          />
                        </td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3">${product.price}</td>
                        <td className="p-3 flex justify-center gap-2">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow"
                            onClick={() => {
                              setDeleteId(product._id);
                              setModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow"
                            onClick={() => setEditProduct(product)}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md shadow"
                            onClick={() =>
                              router.push(`/cms/details/${product._id}`)
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
                  >
                    <img
                      src={product.image || "/productImg.jpg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">${product.price}</p>
                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                          onClick={() => {
                            setDeleteId(product._id);
                            setModal(true);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                          onClick={() => setEditProduct(product)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                          onClick={() =>
                            router.push(`/cms/details/${product._id}`)
                          }
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}

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
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-gray-800">
                  Edit Product
                </h2>
                <input
                  className="w-full bg-gray-100 p-2 rounded-md mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
                <input
                  className="w-full bg-gray-100 p-2 rounded-md mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full bg-gray-100 p-2 rounded-md mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                />
                <input
                  className="w-full bg-gray-100 p-2 rounded-md mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: Number(e.target.value),
                    })
                  }
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setEditProduct(null)}
                    className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
