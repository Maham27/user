import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import axios from 'axios';
import { useDispatch,useSelector} from 'react-redux';
import { setUser } from '../redux/username';
import { hideloading, showloading } from '../redux/alertslice';


function Protectedroutes(props) {

    const {user}=useSelector((state)=>state.user);
    console.log(user);

    const navigation=useNavigate();
    const dispatched=useDispatch();
    const getUser=async()=>{


        try{
            dispatched(showloading());
            const response = await axios.post(
              "/api/user/getuserinfobyid",
              { token: localStorage.getItem("token") },
              {
                headers: {
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
              }
            );
    dispatched(hideloading());
    if(response.data.success)
    {
       dispatched(setUser(response.data.data));
    }
    else
    {
      localStorage.clear();
        navigation('/login');
    }
            
        } catch (error)
        {
          localStorage.clear();
            dispatched(hideloading());
           navigation("/login");  
        }
    }


  useEffect(()=>{
    if(!user){
      getUser();

    }
  },[user]);



    if (localStorage.getItem("token")){
        return props.children;
        
    }
    else
    {
       return <Navigate to="/login"/>;
    }
  
}

export default Protectedroutes
