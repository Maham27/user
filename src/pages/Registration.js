import { Button, Form, Input } from "antd";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { showloading, hideloading } from "../redux/alertslice";

function Registration() {

  const dispatch = useDispatch();
  const navigation=useNavigate();
const onFinish = async (values) => {


     try {
      dispatch(showloading());
       const response = await axios.post('/api/user/registration', values);
      dispatch(hideloading());
       if (response.data.success) {
         toast.success(response.data.message);
         toast("back to login page");
         navigation('/login');
         
       } else {
         toast.error(response.data.message);
       }
     } catch (error) {
      dispatch(hideloading());
       toast.error("Something went wrong");
     }
  
};
  return (
    <>
      <div className="text-center pt-3">
        <h1>LAWYER SERVICES</h1>
      </div>
      <section>
        <div className="container p-1">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6">
              <div className="card mt-3">
                <div className="card-body  text-center">
                  <h2 className="fw-bold mb-2">Sign up now</h2>
                  <Form layout="vertical" onFinish={onFinish}>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <div className="form-outline">
                          <Form.Item
                            label={
                              <label style={{ color: "white" }}>
                                First name:
                              </label>
                            }
                            name="firstname"
                            className="fw-bold"
                          >
                            <Input placeholder="firstname" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6 mb-2">
                        <div className="form-outline">
                          <Form.Item
                            label={
                              <label style={{ color: "white" }}>
                                Last name:
                              </label>
                            }
                            name="lastname"
                            className="fw-bold"
                          >
                            <Input placeholder="lastname" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-2">
                      <Form.Item
                        label={<label style={{ color: "white" }}>Email:</label>}
                        name="email"
                        className="fw-bold"
                      >
                        <Input placeholder="Email" />

                      </Form.Item>
                    </div>

                    <div className="form-outline mb-2">
                      <Form.Item
                        label={
                          <label style={{ color: "white" }}>Password:</label>
                        }
                        name="password"
                        className="fw-bold"
                      >
                        <Input placeholder="Password" type="password" />
                      </Form.Item>
                    </div>

                    <div className="pt-1 mb-2">
                      <Button
                        className="btn btn-lg pb-5"
                        htmlType="submit"
                        style={{
                          backgroundColor: "#333",

                          color: "white",
                        }}
                      >
                        Sign up
                      </Button>
                    </div>
                    <Link to="/login">Click here to login</Link>

                    <div className="text-center mt-2 text-white">
                      <h6>or sign up with:</h6>

                      <Button
                        className="btn btn-lg pb-5 btn-block"
                        style={{
                          backgroundColor: "#dd4b39",

                          color: "white",
                        }}
                        type="submit"
                      >
                        <i class="fab fa-google me-2"></i> Sign up with google
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="w-75  m-2 rounded-4 shadow-5"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registration;
