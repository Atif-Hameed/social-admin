'use client';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const CustomInput = ({ type, placeholder, onChange, value, label, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full">
            <div
                tabIndex="0"
                className={`bg-white w-full py-1 border border-[#1C1B1F] flex relative gap-2 justify-between items-center px-3 rounded-md `}
            >
                <input
                    type={showPassword && type === 'password' ? 'text' : type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    className={`flex-1 py-3 px-1 bg-transparent h-full outline-none `}
                />
                {type === 'password' && (
                    <div
                        className="absolute right-3 cursor-pointer text-gray"
                        onClick={handleTogglePassword}
                    >
                        {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                    </div>
                )}

                <label
                    className="text-[#1C1B1F] text-[14px] absolute -top-3 left-3 z-[10] bg-white px-2"
                    style={{ backgroundColor: "white" }}
                >
                    {label}
                </label>
            </div>
        </div>
    );
};

export default CustomInput;
