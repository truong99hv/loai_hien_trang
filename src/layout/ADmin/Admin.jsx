import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("user-token");
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };

  //       const response = await axios.get(
  //         "http://wlp.howizbiz.com/api/me",
  //         config
  //       );

  //       const data = response.data;
  //       console.log(data);
  //       localStorage.setItem("username", data.user.username);
  //       if (!data) {
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       navigate("/login");
  //     }
  //   };

  //   fetchData();
  // }, [navigate]);

  const handleLogout = () => {
    // localStorage.removeItem("user-token");
    logout();
    navigate("/login");
  };

  // return <button>Logout</button>;
  return <button onClick={handleLogout}>Logout</button>;
};

export default Admin;
