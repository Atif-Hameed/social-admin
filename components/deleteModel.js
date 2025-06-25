"use client";

import { deleteUser } from "@/services/api";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

export default function Delete({ onClose, id, fullName, setCustomers }) {
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    setDeleteId(id);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id)
      setCustomers((prev) => prev.filter((customer) => customer._id !== id));
      console.log(res);
      toast.success("Deleted successfully")
      onClose();
    } catch (error) {
      console.log("Error Deleting Customer");
      toast.error(error || 'Error occur')
    }
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-70">
      <Toaster />
      <div className="w-[50vw] h-auto bg-white rounded-lg py-6 px-20 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 text-lg font-bold"
          onClick={onClose}
        >
          <IoMdClose className="text-black text-2xl" />
        </button>
        <h2 className="text-[40px] text-black font-semibold text-center">
          Delete User : {fullName}
        </h2>

        <div className="mt-8 mb-4 w-full">
          <p className="text-center text-black text-[18px]">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              className="w-full bg-[#FE9274] rounded-[4px] text-white py-4 relative"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-full bg-[#FE9274] rounded-[4px] text-white py-4 relative"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
