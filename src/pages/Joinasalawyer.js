import { Button, Form, Input, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import toast from "react-hot-toast";
import { showloading ,hideloading} from "../redux/alertslice";

function Joinasalawyer() {

  const dispatch = useDispatch();
  const{user}=useSelector(state=>state.user);

  const navigation = useNavigate();
  const onfinish = async (values) => {
    try {
      dispatch(showloading());
      const response = await axios.post(
        "/api/user/joinasalawyer",
        {
          ...values,
          userId: user._id,
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigation("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-center pt-4 mb-4">LAWYER'S INFORMATION</h1>
      <div className="infopart m-2 pt-3 pb-3">
      <Form onFinish={onfinish}>
        <div className="row text-center mx-3">
          <div className="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Firstname"
              name="firstname"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="string" placeholder="First name" />
            </Form.Item>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Lastname"
              name="lastname"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="string" placeholder="last name" />
            </Form.Item>
          </div>
        </div>

        <div class="row text-center mx-3 mt-2">
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="City"
              name="city"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="string" placeholder="City" />
            </Form.Item>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Phone Number"
              name="phonenumber"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="phonenummber" />
            </Form.Item>
          </div>
        </div>
        <div class="row col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 mx-3 mt-3">
          <Form.Item
            required
            label="Address"
            name="address"
            className="fw-bold"
            rules={[{ required: true }]}
          >
            <Input type="string" placeholder="Address" />
          </Form.Item>
        </div>
        <div class="row text-center mx-3 mt-2">
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Qualification"
              className="fw-bold"
              name="qualification"
              rules={[{ required: true }]}
            >
              <Input type="string" placeholder="Qualification" />
            </Form.Item>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Experience"
              name="experience"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="string" placeholder="Experience" />
            </Form.Item>
          </div>
        </div>
        <div class="row mx-3 mt-2">
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Fees"
              name="fees"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Fees" />
            </Form.Item>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Image"
              name="image"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <Input type="string" placeholder="image" />
            </Form.Item>
          </div>
        </div>
        <div class="row text-center mx-3 mt-2">
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6 col-12">
            <Form.Item
              required
              label="Timings"
              name="timings"
              className="fw-bold"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </div>
        </div>

        <div className="text-center">
          <Button
            className="btn btn-lg pb-5  mb-2 font-weight-bold"
            htmlType="submit"
            style={{
              backgroundColor: "black",

              color: "whitesmoke",
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
      </div>
    </Layout>
  );
}

export default Joinasalawyer;
