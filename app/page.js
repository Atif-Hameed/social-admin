"use client";

import { useState } from "react";
import Image from "next/image";
import { BiSolidHide } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/api";
import CustomInput from "@/components/shared/CustomInput";
import CustomCheckBox from "@/components/shared/CustomCheckBox";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/store/adminSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [isRemember, setIsRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleRemember = () => {
    setIsRemember(!isRemember)
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validation = (formData) => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (validation(formData)) {
      setLoading(true)
      console.log(formData);
      try {
        const res = await adminLogin(formData.email, formData.password)
        console.log(res)
        dispatch(setAdmin(res.admin));
        toast.success(res.message)
        setLoading(false)
        router.push('/customers')
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred during login.';
        toast.error(errorMessage); // Display error from backend
        console.log("Error logging in:", errorMessage);
        setLoading(false)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  };


  return (
    <div className="w-full py-10 sm:px-20 px-6 flex h-[100vh] justify-between items-center">
      <Toaster />
      <div className="lg:w-[45%] w-full">
        <div className="">
          <h2 className="text-[24px] font-[900] text-[#fe9274]">
            Social <span className="text-[#d379ac]">Media</span>
          </h2>
        </div>
        <div className=" mt-9 w-full  relative">
          <h2 className="text-[40px] text-black font-semibold text-left">
            Login
          </h2>
          <p className="mt-4 text-left text-black text-[18px]">
            Login to access your travelwise account
          </p>

          <div className="mt-8 mb-4 space-y-6 w-full">

            <div>
              <CustomInput
                label={'Email'}
                name={'email'}
                onChange={handleFormChange}
                value={formData.email}
                placeholder={'Enter Email Adress'}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <CustomInput
                label={'Password'}
                name={'password'}
                type={'password'}
                onChange={handleFormChange}
                value={formData.password}
                placeholder={'Enter Password'}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex justify-start gap-3 items-center">
            <CustomCheckBox
              name="remember"
              label="Remember me"
              isChecked={isRemember}
              onChange={handleRemember}
            />
          </div>

          <button
            className="w-full bg-[#FE9274] rounded-[4px] text-white py-4 relative mt-5"
            onClick={handleSubmit}
          >
            {loading ? 'loging in...' : 'Login'}
          </button>
          <div className="text-[#FE9274] text-center w-full mt-4">
            forgot password
          </div>
        </div>
      </div>
      <div className="lg:block hidden w-[50%] h-full relative">
        <Image
          src="/assets/admin-bg.png"
          alt="Login"
          width={500}
          height={500}
          className="w-full h-full bg-cover"
        />
        <div className="w-full mx-auto h-full absolute bottom-0">
          <Image
            src="/assets/admin-login-user.png"
            alt="Login"
            width={500}
            height={500}
            className="w-[80%] mx-auto h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
