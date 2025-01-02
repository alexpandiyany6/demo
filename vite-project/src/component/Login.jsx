import "./Login.css"
import React, { useEffect, useState } from 'react'
import { Form, Button, FormControl, FormLabel } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
   const [inputData, setInputData] = useState({ email: '', password: '',id:1 }); 
   const [data, setData] = useState([]);
   const [error, setError] = useState("");
   const navigate = useNavigate(); 

   useEffect(() => {
      async function getData() {
         try {
            let res = await axios.get("http://localhost:3003/userData");
            setData(res.data); 
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      }
      getData();
   }, []);

   function handleChange(e) {
      const { name, value } = e.target;
      setInputData((oldData) => ({ ...oldData, [name]: value }));
   }

   function handleSubmit(event) {
      event.preventDefault();
      console.log(inputData)
     
  const output=data.find(state=>state.email===inputData.email && state.password==inputData.password)
 
  console.log(output)

      
     
      if (output) {
         console.log("Login successful:", output);
         navigate("/todoapp"); 
         console.log(output)
      } else {
         setError("Incorrect email or password. Please try again.");
      }
   }

   return (
      <div className='login-page m-3'>
         <Form className='form-table m-3' onSubmit={handleSubmit}>
            <FormLabel className='input-1'>Name</FormLabel>
            <FormControl 
               className='w-50' 
               type='text' 
               name="email" 
               placeholder='Name or Email' 
               onChange={handleChange} 
            />
            <FormLabel>Password</FormLabel>
            <FormControl 
               className='w-50' 
               type="password" 
               name="password" 
               placeholder='Password' 
               onChange={handleChange} 
            />
            <Button className="w-50" type="submit">Submit</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            <p>Already have an Account? <a href="#">Login!</a></p>
         </Form>
      </div>
   );
}

export default Login;
