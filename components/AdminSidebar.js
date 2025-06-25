import Link from "next/link";
import { BsPersonSquare } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosMenu } from "react-icons/io"; // Menu icon for smaller screens
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false); // Track the sidebar state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar if clicked outside (only applies to mobile view)
  const handleClickOutside = (e) => {
    if (!e.target.closest(".sidebar") && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Sidebar for Desktop (always visible on md and above) */}
      <div
        className={`sidebar bg-white z-40 min-h-screen md:w-full w-[50%] px-4 pt-7  md:relative flex flex-col justify-between pb-7 fixed left-0 top-0 transition-transform ${
          isOpen ? "transform-none" : "transform -translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="text-center">
            <h2 className="text-[24px] font-[900] text-[#fe9274]">
              Social <span className="text-[#d379ac]">Media</span>
            </h2>
          </div>
          <Link
            href={"/admin/customers"}
            className="mt-6 w-full flex justify-between items-center px-3 rounded-[8px] bg-[#FE9274] py-2"
          >
            <div className="flex justify-start items-center gap-3 text-white font-[500]">
              <BsPersonSquare className="text-[34px]" />
              <h3 className="text-[14px] font-[500] text-white">Customers</h3>
            </div>
            <MdOutlineKeyboardArrowRight className="text-[24px] text-white" />
          </Link>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-3 text-black font-[500]">
            <BsPersonSquare className="rounded-full text-[34px]" />
            <div className="text-black">
              <h3 className="text-[14px] font-[500]">Evano</h3>
              <p className="text-[12px] text-[#757575]">Project Manager</p>
            </div>
          </div>
          <MdOutlineKeyboardArrowDown className="text-[24px] text-[#757575]" />
        </div>
      </div>

      {/* Mobile Menu Button (visible only on smaller screens) */}
      <div
        onClick={toggleSidebar}
        className="absolute top-3 left-4 text-[30px] text-[#fe9274] z-50 md:hidden"
      >
        <IoIosMenu />
      </div>

      {/* Overlay when sidebar is open (only on mobile screens) */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
