import React from "react";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { profileProps } from "@/typeScript/auth.interface";
import { useProfileQuery } from "../../../customHooks/query/auth.query.hooks";
import { motion } from "framer-motion";

const ProfileModal: React.FC<profileProps> = () => {
  const {
    data: user,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = useProfileQuery();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
            textAlign: "center",
            zIndex: 50,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary">
            Profile Details
          </Typography>

          {isPendingCategories ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : isErrorCategories ? (
            <Typography color="error" sx={{ mt: 4 }}>
              Error fetching profile details.
            </Typography>
          ) : (
            user && (
              <Box sx={{ mt: 4 }}>
                <Avatar
                  src="/cartoon.jpg"
                  alt="Profile Image"
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid #1976d2",
                    boxShadow: "0px 0px 10px rgba(25, 118, 210, 0.5)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0px 0px 20px rgba(25, 118, 210, 0.8)",
                    },
                  }}
                />
                <Typography variant="h6">
                  <strong>Name:</strong> {user.data.name}
                </Typography>
                <Typography>
                  <strong>Email: </strong>
                  {user.data.email}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </motion.div>
    </>
  );
};

export default ProfileModal;
