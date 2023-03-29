import React from 'react'
import Layout from '../components/Layout'
import {useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import toast from "react-hot-toast";
import { showloading, hideloading } from "../redux/alertslice";
import { setUser } from '../redux/username';
function Notifications() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
 const navigation = useNavigate();
    const markedallasseen=async()=>{
  try {
    dispatch(showloading());
    const response = await axios.post("/api/user/markallnotificationsasseen", {userId: user._id},{
       headers:{
        Authorization:`bearer ${localStorage.getItem("token")}`
      }
    });
    dispatch(hideloading());
    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(setUser(response.data.data));
    
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch(hideloading());
    toast.error("Something went wrong");
  }
  
    };
    const deletedallnotifications = async () => {
      try {
        dispatch(showloading());
        const response = await axios.post(
          "/api/user/deleteallnotifications",
          { userId: user._id },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideloading());
        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(setUser(response.data.data));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideloading());
        toast.error("Something went wrong");
      }
    };
  return (
    <div>
      <Layout>
        <h1>Notifications</h1>
        <div className="container mt-3">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#seen">
                Seen
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#unseen">
                Unseen
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div id="seen" className="container tab-pane fade">
              <div className="d-flex justify-content-end">
                <a href="" onClick={() => deletedallnotifications()}>
                  Delete all notifications
                </a>
              </div>
              {user?.seennotifications.map((notification) => (
                <div
                  className="card p-2 m-1"
                  onClick={() => navigation(notification.onClickPath)}
                >
                  <div className="card-text">{notification.message}</div>
                </div>
              ))}
            </div>
            <div id="unseen" className="container tab-pane fade">
              <div className="d-flex justify-content-end">
                <a href=" " onClick={() => markedallasseen()}>
                  Mark all as seen
                </a>
              </div>
              {user?.unseennotifications.map((notification) => (
                <div
                  className="card p-2 m-1"
                  onClick={() => navigation(notification.onClickPath)}
                >
                  <div className="card-text">{notification.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Notifications
