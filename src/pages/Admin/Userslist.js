import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout'
import {showloading,hideloading} from '../../redux/alertslice'
import axios from 'axios'
import {Table} from 'antd'
import { Link} from "react-router-dom";

function Userslist() {
    const[users,setUsers]=useState([])
    const dispatched=useDispatch()
    const getusersdata = async () => {
      try {
        dispatched(showloading())
        const response=await axios.get('/api/admin/getallusers',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatched(hideloading());
        if(response.data.success)
        {
          setUsers(response.data.data)
        }

      } catch (error) {
        console.log(error);
        dispatched(hideloading());
      }
    };
    useEffect(() => {
      getusersdata();
    }, []);

    const columnslists = [
      {
        title: "Name",
        dataIndex: "firstname",
       
      },
     

      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, records) => (
          <div className="d-flex">
            <Link>Block</Link>
          </div>
        ),
      },
    ];

  return (
    <Layout>
      <h1 className="text-center pt-4 mb-4">Users List</h1>
      <Table columns={columnslists} dataSource={users}/>
    </Layout>
  );
}

export default Userslist
