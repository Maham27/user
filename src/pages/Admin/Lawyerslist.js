import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showloading, hideloading } from "../../redux/alertslice";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";

function Lawyerslist() {
  const[lawyers,setLawyers]=useState([])
    const dispatched=useDispatch()
    const getlawyersdata = async () => {
      try {
        dispatched(showloading())
        const response=await axios.get('/api/admin/getalllawyers',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatched(hideloading());
        if(response.data.success)
        {
          setLawyers(response.data.data)
        }

      } catch (error) {
        console.log(error);
        dispatched(hideloading());
      }
    };
    useEffect(() => {
      getlawyersdata();
    }, []);

    const columnslists = [
      {
        title: "Full Name",
        dataIndex: "firstname",
        render: (text, record) => (
          <h5 className="card-text">
            {record.firstname} 
            {record.lastname}
          </h5>
        ),
      },

      {
        title: "phone",
        dataIndex: "phonenumber",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
      },
      {
        title: "status",
        dataIndex: "status",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, records) => (
          <div className="d-flex">
            {records.status==="pending" && <Link>Approve</Link>}
            {records.status==="approved" && <Link>Block</Link>}
          </div>
        ),
      },
    ];

 
  return (
    <Layout>
      <h1 className="text-center pt-4 mb-4">LAWYERS LIST</h1>
      <Table columns={columnslists} dataSource={lawyers} />
    </Layout>
  );
}

export default Lawyerslist
