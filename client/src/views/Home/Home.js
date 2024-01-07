import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Home.css'
function Home() {
 
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [image, setImage] = useState('');

  const loadData =  async () => {
    // const data = {
    //   name,
    //   image,
    //   email,
    // }
    // const response = await axios.post("/api/login", data)

    // alert(response?.data?.message)

    // if(response?.data?.success){
    //   window.location.href = "/";
      // localStorage.setItem('nexalinkcustomer', JSON.stringify(response?.data?.data));
      
  
  // else{
  //   console.log(response?.data?.message)
  // }
  }

  useEffect(()=>{
    // loadData()
    // const storageUser = JSON.parse(localStorage.getItem("nexalinkcustomer") || "{}");


    // if (!storageUser?.email) {
      
    //   alert("All ready Account login !");
    //   window.location.href = "/";
    // }
  }, [])
 
  return (
    <>
    <div className='login-container'>
    <h2 className='col-light'>Login Here</h2>
    <GoogleLogin className='login-containr'
    onSuccess={credentialResponse => {
      const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
      console.log(credentialResponseDecoded);
      // setName(credentialResponseDecoded.name)
      // setEmail(credentialResponseDecoded.email)
      // setImage(credentialResponseDecoded.picture)
      if(credentialResponseDecoded.name){
        localStorage.setItem('nexalinkcustomer', JSON.stringify(credentialResponseDecoded));
        window.location.href = "/";
      }
    }}
    onError={() => {
      console.log('Login Failed')
      
    }}
    
  />
  {/* <h4>Name: {name} </h4>
  <p>Email: {email}</p> 
  <p>img: {image}</p> */}
    </div>
    </>


  )
}

export default Home;
