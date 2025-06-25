"use client";

import { updateUser } from "@/services/api";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";

export default function EditCustomer({
  onClose,
  fetchCustomers,
  userData,
  setCustomers,
}) {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    country: userData?.country || "",
    state: userData?.state || "",
    status: userData?.status || "Active", // Default to "Active" if no status is provided
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };



  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const res = await updateUser(userData?._id, formData);
      console.log(res)
      fetchCustomers();
      toast.success("Customer updated successfully!"); // Success toast
      setLoading(false); // Stop loading
      onClose();
    } catch (error) {
      setLoading(false); // Stop loading
      toast.error("Error updating customer. Please try again."); // Error toast
    } finally {
      setLoading(false);
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
          Update Customer
        </h2>

        <div className="mt-8 mb-4 w-full">
          <div className="border border-[#1C1B1F] rounded-[4px] p-1 w-full relative">
            <input
              type="text"
              placeholder="Name"
              className="w-full py-2 bg-transparent focus:bg-transparent text-[#1C1B1F] text-[16px] px-4 focus:outline-none"
              id="fullName"
              value={formData.fullName}
              onChange={handleFormChange}
            />
            <label
              htmlFor="fullName"
              className="text-[#1C1B1F] text-[14px] absolute -top-3 left-3 z-[10] bg-white px-2"
            >
              Name
            </label>
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}

          <div className="border mt-4 border-[#1C1B1F] rounded-[4px] p-1 w-full relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 bg-transparent focus:bg-transparent text-[#1C1B1F] text-[16px] px-4 focus:outline-none"
              id="email"
              value={formData.email}
              onChange={handleFormChange}
            />
            <label
              htmlFor="email"
              className="text-[#1C1B1F] text-[14px] absolute -top-3 left-3 z-[10] bg-white px-2"
            >
              Email
            </label>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}

          <div className="border mt-4 border-[#1C1B1F] rounded-[4px] p-1 w-full relative">
            <input
              type="text"
              placeholder="Country"
              className="w-full py-2 bg-transparent focus:bg-transparent text-[#1C1B1F] text-[16px] px-4 focus:outline-none"
              id="country"
              value={formData.country}
              onChange={handleFormChange}
            />
            <label
              htmlFor="country"
              className="text-[#1C1B1F] text-[14px] absolute -top-3 left-3 z-[10] bg-white px-2"
            >
              Country
            </label>
          </div>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
          )}

          <div className="border mt-4 border-[#1C1B1F] rounded-[4px] p-1 w-full relative">
            <input
              type="text"
              placeholder="State"
              className="w-full py-2 bg-transparent focus:bg-transparent text-[#1C1B1F] text-[16px] px-4 focus:outline-none"
              id="state"
              value={formData.state}
              onChange={handleFormChange}
            />
            <label
              htmlFor="state"
              className="text-[#1C1B1F] text-[14px] absolute -top-3 left-3 z-[10] bg-white px-2"
            >
              State
            </label>
          </div>
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
          )}

          {/* Select option for status */}
          <div className="border mt-4 border-[#1C1B1F] rounded-[4px] p-1 w-full relative">
            <select
              id="status"
              className="w-full py-2 bg-transparent focus:bg-transparent text-[#1C1B1F] text-[16px] px-4 focus:outline-none"
              value={formData.status}
              onChange={handleFormChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label
              htmlFor="status"
              className="text-[#1C1B1F] text-[14px] absolute -top-3 left-3 z-[10] bg-white px-2"
            >
              Status
            </label>
          </div>
        </div>

        <button
          className={`w-full bg-[#FE9274] rounded-[4px] text-white py-4 relative mt-5 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Customer"}
        </button>
      </div>
    </div>
  );
}
