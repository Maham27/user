import React ,{useEffect} from 'react'
import axios from 'axios'
import Layout from '../components/Layout';

function Home() {

const getdata=async()=>{
  try {
    const response=await axios.post("/api/user/getuserinfobyid",{},
    {
      headers:
      {
        Authorization:"bearer " + localStorage.getItem("token"),
      },
    }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
 useEffect(()=>
 {
  getdata();
 },[]);




  return (
    <>
      <Layout>
        <h1 className="text-center pt-4 mb-4">LAWYER SERVICES</h1>

        <div className="infopart m-2 pt-3 pb-3">
          <h1 className='p-3'>LAWYERS</h1>
          <div className="card  mx-3" style={{ width: "20rem" }}>
            <img
              className="image  mx-2 "
              src="https://thumbs.dreamstime.com/z/lady-boss-2274237.jpg"
              alt="Card image"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Maham Naveed</h5>
              <h6 className="card-title">Education:LLB</h6>
              <h6 className="card-title">Experience:3years</h6>
              <h6 className="card-title">Education:LLB</h6>
              <h6 className="card-title">Phonenumber:03336768</h6>
              <p className="card-text">
                <span className="fw-bold">Address:</span> umt johr town lahore
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home
