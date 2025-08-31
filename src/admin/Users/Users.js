

import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/axiosInstance";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

  const showAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/users`
      );
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    showAllUsers();
  }, []);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h3 className="mb-5 mt-2">
        <span className="py-2 px-4 rounded bg-primary text-white ">
          Customers List
        </span>
      </h3>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table className="border border-1 border-black p-5">
            <thead className="border border-1 border-black p-5">
              <tr className="border border-1 border-black p-5">
                <th className="border border-1 border-black px-5 text-center">
                  Id
                </th>
                <th className="border border-1 border-black px-5 text-center">
                  Name
                </th>
                <th className="border border-1 border-black px-5 text-center">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr className="mb-2" key={user._id}>
                  <td className="border border-1 border-black  px-5 ">
                    {user._id}
                  </td>
                  <td className="border border-1 border-black px-5 ">
                    {user.name}
                  </td>
                  <td className="border border-1 border-black px-5">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
              (_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Users;
