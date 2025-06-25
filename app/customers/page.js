"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MdWavingHand } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import DeleteModel from "@/components/deleteModel";
import EditModel from "@/components/EditModel";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearAdmin } from "@/store/adminSlice";
import { getAllUser } from "@/services/api";

const sortType = ["Newest", "Oldest", "Name", "Active", "Inactive"];
const actions = ["Edit", "Delete"];

export default function Customers() {
  const [sort, setSort] = useState("Newest");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showSort, setShowSort] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const admin = useSelector((state) => state.admin.admin);
  const [userData, setUserData] = useState();
  const [actionId, setActionId] = useState(null);
  const dispatch = useDispatch();
  const adminLoggedIn = useSelector((state) => state.admin.adminLoggedIn);
  const router = useRouter();
  const [models, setModels] = useState({
    edit: false,
    delete: false,
  });

  const [currentPage, setCurrentPage] = useState(1); // Page state
  const itemsPerPage = 10;

  const sortRef = useRef(null);
  const actionRef = useRef(null);

  const toggleSort = () => {
    setShowSort((prev) => !prev);
  };

  const toggleActions = (id, customer) => {
    setActionId((prevId) => (prevId === id ? null : id));
  };



  const handleSortChange = (type) => {
    setSort(type);
    setShowSort(false);

    // Sorting logic based on selected type
    const sortedCustomers = [...filteredCustomers];
    switch (type) {
      case "Newest":
        sortedCustomers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Oldest":
        sortedCustomers.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "Name":
        sortedCustomers.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case "Active":
        sortedCustomers.sort((a, b) => {
          const lastLoginA = new Date(a.lastLogin);
          const lastLoginB = new Date(b.lastLogin);
          return lastLoginB - lastLoginA;
        });
        break;
      case "Inactive":
        sortedCustomers.sort((a, b) => {
          const lastLoginA = new Date(a.lastLogin);
          const lastLoginB = new Date(b.lastLogin);
          return lastLoginA - lastLoginB;
        });
        break;
      default:
        break;
    }

    setFilteredCustomers(sortedCustomers);
  };




  const handleClickOutside = (event) => {
    // Close the sort dropdown if clicked outside
    if (sortRef.current && !sortRef.current.contains(event.target)) {
      setShowSort(false);
    }
    // Close the action menu if clicked outside
    if (actionRef.current && !actionRef.current.contains(event.target)) {
      setActionId(null); // Use setActionId, not setShowActions
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const fetchCustomers = async () => {
    try {
      const res = await getAllUser();
      setCustomers(res.users);
      setFilteredCustomers(res.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on the search term
    const filtered = customers.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const handleLogout = () => {
    dispatch(clearAdmin());
    router.push('/')
  };



  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // console.log(customers)

  return (
    <div className="flex justify-between items-start bg-[#f9fbfd] overflow-y-auto max-h-[100vh]">
      <div className="xl:w-[15%] md:w-[25%] ">
        <AdminSidebar />
      </div>

      <div className="xl:w-[85%] md:w-[75%] md:mt-0 mt-5 w-full flex-1 h-screen overflow-y-auto">
        <div className=" px-4 mx-auto py-4">
          <div className="w-full md:flex-row flex-col flex justify-between md:items-center">
            <div className="flex justify-start lg:text-[24px] font-[500] items-center gap-3">
              Hello {admin?.fullName}{" "}
              <MdWavingHand className="text-[#e0b993] text-[24px]" />
            </div>
            <div className="flex sm:flex-row flex-col items-center gap-2">
              <div className="flex justify-start items-center sm:w-[300px] w-full py-2 px-3 border border-[#ebebeb] rounded-[5px] gap-3">
                <FiSearch className="text-[#8b8b8b] text-[24px]" />
                <input
                  type="text"
                  placeholder="Search Customers"
                  className="text-[#B5B7C0] border-none outline-none bg-transparent placeholder-[#B5B7C0] text-[16px] focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {
                adminLoggedIn &&
                <button onClick={handleLogout} className="w-full py-2 hover:shadow-lg bg-primary px-3 text-white rounded-lg">Logout</button>
              }
            </div>
          </div>
          <div className="w-full my-4  rounded-[10px] bg-white shadow-md pt-2 pb-7">

            <div className="flex lg:flex-row flex-col justify-between w-full lg:items-end xl:px-8 px-4">

              <div>
                <h3 className="text-[#000000] font-semibold text-[22px]">
                  All Customers
                </h3>
                <p className="text-[#16C098] text-[14px]">Active Members</p>
              </div>

              <div className="flex sm:flex-row flex-col lg:w-auto w-full justify-end items-center gap-4">
                <div className="flex justify-start items-center lg:w-[300px] w-full py-2 px-3 border border-[#ebebeb] rounded-[5px] gap-3">
                  <FiSearch className="text-[#8b8b8b] flex-shrink-0 sm:text-[24px]" />
                  <input
                    type="text"
                    placeholder="Search Customers"
                    className="text-[#B5B7C0] border-none outline-none bg-transparent placeholder-[#B5B7C0] text-[16px] focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div
                  className="flex lg:justify-start justify-between items-center lg:w-[190px] w-full py-2 px-3 border border-[#ebebeb] rounded-[5px] gap-3 relative"
                  onClick={() => toggleSort()}
                  ref={sortRef}
                >
                  <div className="text-[#7e7e7e]">
                    Sort by: <span className="text-[#000000]">{sort}</span>
                  </div>
                  {showSort ? (
                    <MdOutlineKeyboardArrowUp className="text-[#000000] text-[24px]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-[#000000] text-[24px]" />
                  )}
                  {showSort && (
                    <div className="w-full absolute top-12 right-0 h-auto bg-white shadow-md">
                      <div className="w-full">
                        {sortType.map((type, index) => (
                          <div
                            key={index}
                            className="w-full py-2 px-3 hover:bg-[#f9fbfd] cursor-pointer"
                            onClick={() => handleSortChange(type)}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="w-full overflow-auto mt-4">
              <table className="w-full px-4">
                <thead className="text-left text-[14px] text-[#B5B7C0]">
                  <tr>
                    <td className="py-3 px-4">Name</td>
                    <td className="py-3 px-4">Email ID</td>
                    <td className="py-3 px-4">Country</td>
                    <td className="py-3 px-4">State</td>
                    <td className="py-3 px-4">Registration Date</td>
                    <td className="py-3 px-4">Last Login</td>
                    <td className="py-3 px-4">Status</td>
                    <td className="py-3 px-4">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer, index) => {

                    return (
                      <tr
                        key={index}
                        className="text-[#000000] text-[14px] border-t border-t-[#EEEEEE] py-2"
                      >
                        <td className="py-3 px-4">{customer.fullName}</td>
                        <td className="py-3 px-4">{customer.email}</td>
                        <td className="py-3 px-4">
                          {customer.country || "---"}
                        </td>
                        <td className="py-3 px-4">{customer.state}</td>
                        <td className="py-3 px-4">
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {customer.lastLogin
                            ? new Date(customer.lastLogin).toLocaleDateString()
                            : "---"}
                        </td>
                        <td className="py-3 px-4">
                          <p
                            className={`w-[90px] text-center py-[6px] rounded-[5px]  text-[14px] font-[500] ${customer.status == "active"
                              ? "text-[#00B087] border-[#00B087] border bg-[#a6e7d8]"
                              : "text-[#FF754C] border-[#FF754C] border bg-[#FFF3F3]"
                              }`}
                          >
                            {customer.status}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <div
                            onClick={() => toggleActions(customer._id)}
                            className="border border-[#D5D5D5] rounded-[4px] w-[40px] py-2 flex justify-center items-center relative"
                          >
                            <CiMenuKebab className="cursor-pointer text-[18px] text-[#8B8B8B]" />

                            {actionId === customer._id && (
                              <div
                                ref={actionRef} // Ensure this ref is applied to the correct pop-up div
                                className={`absolute ${index == filteredCustomers.length - 1 ? "bottom-6" : "top-7"
                                  } right-3 w-[80px] bg-white shadow-md z-50 rounded-[8px]`}
                              >
                                <p
                                  onClick={() => {
                                    setModels({ ...models, edit: true });
                                    toggleActions(customer._id, customer);
                                    setUserData(customer)
                                  }}
                                  className="hover:bg-sky-200 w-full py-2 px-3 cursor-pointer"
                                >
                                  Edit
                                </p>
                                <p
                                  onClick={() => {
                                    setModels({ ...models, delete: true });
                                    toggleActions(customer._id);
                                  }}
                                  className="hover:bg-sky-200 w-full py-2 px-3 cursor-pointer"
                                >
                                  Delete
                                </p>
                              </div>
                            )}
                          </div>
                        </td>


                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>


            <div className="w-full mt-4 flex justify-between items-center px-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>







      {models.delete && (
        <DeleteModel
          onClose={() => setModels({ ...models, delete: false })}
          id={actionId}
          fullName={
            filteredCustomers.find((customer) => customer._id === actionId)
              .fullName
          }
          setCustomers={setCustomers}
        />
      )}


      {models.edit && (
        <EditModel
          onClose={() => setModels({ ...models, edit: false })}
          fetchCustomers={fetchCustomers}
          setCustomers={setCustomers}
          userData={userData}
        // fullName={
        //   filteredCustomers.find((customer) => customer._id === actionId)
        //     .fullName
        // }
        // email={
        //   filteredCustomers.find((customer) => customer._id === actionId)
        //     .email
        // }
        // country={
        //   filteredCustomers.find((customer) => customer._id === actionId)
        //     .country
        // }
        // state={
        //   filteredCustomers.find((customer) => customer._id === actionId)
        //     .state
        // }
        />
      )}
    </div>
  );
}
