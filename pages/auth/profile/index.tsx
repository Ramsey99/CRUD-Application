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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-6 bg-gray-900 text-white shadow-xl rounded-lg text-center z-50 border border-cyan-500">
            <h2 className="text-2xl font-bold text-cyan-400">
              Profile Details
            </h2>

            {isPendingCategories ? (
              <div className="flex justify-center mt-6">
                <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : isErrorCategories ? (
              <p className="text-cyan-400 mt-4">
                Error fetching profile details.
              </p>
            ) : (
              user && (
                <div className="mt-6">
                  <img
                    src="/cartoon.jpg"
                    alt="Profile Image"
                    className="w-28 h-28 mx-auto rounded-full border-4 border-cyan-400 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-cyan-500"
                  />
                  <p className="text-lg font-semibold mt-3">
                    <span className="text-cyan-400 font-bold">Name:</span>{" "}
                    {user.data.name}
                  </p>
                  <p>
                    <span className="text-cyan-400 font-bold">Email:</span>{" "}
                    {user.data.email}
                  </p>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProfileModal;
