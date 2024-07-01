import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IoSettings } from "react-icons/io5";
import { BsFillXCircleFill } from "react-icons/bs";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <table class="table table-hover table-light">
          <thead>
            <tr className="table-light">
              <th scope="col-">#</th>
              <th scope="col">Name</th>
              <th scope="col">Date Created</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-light">
              <th scope="row">1</th>
              <td>Michael Hotz</td>
              <td>04/10/2013</td>
              <td>Admin</td>
              <td>Active</td>
              <td>
                <IoSettings /> <BsFillXCircleFill />{" "}
              </td>
            </tr>
            <tr className="table-light">
              <th scope="row">2</th>
              <td>Paula Wilson</td>
              <td>05/08/2014</td>
              <td>Publisher</td>
              <td>Active</td>
              <td>
                <IoSettings /> <BsFillXCircleFill />{" "}
              </td>
            </tr>
            <tr className="table-light">
              <th scope="row">3</th>
              <td>Antonio Moreno</td>
              <td>11/05/2015</td>
              <td>Publisher</td>
              <td>Suspended</td>
              <td>
                <IoSettings /> <BsFillXCircleFill />
              </td>
            </tr>
            <tr className="table-light">
              <th scope="row">4</th>
              <td>Mary Saveley</td>
              <td>06/09/2016</td>
              <td>Reveiwer</td>
              <td>Active</td>
              <td>
                <IoSettings /> <BsFillXCircleFill />{" "}
              </td>
            </tr>
            <tr className="table-light">
              <th scope="row">5</th>
              <td>Martin Sommer</td>
              <td>12/08/2017</td>
              <td>Moderator</td>
              <td>Inactive</td>
              <td>
                <IoSettings /> <BsFillXCircleFill />{" "}
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
