import React from 'react'
import Leftbar from './Leftbar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div className=' bg-red-500' >
            <Leftbar />
            <Outlet />
        </div >
    )
}

export default Layout




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // console.log("Login Data:", formData);

//         // After successful login
//         navigate("/");
//     };

//     return (

//         <div
//             className="
//             min-h-screen
//             flex items-center justify-center
//             bg-gray-100
//             pt-20 md:pt-0
//             md:ml-[30%]
//             "
//         >

//             <div className="bg-white w-[90%] max-w-md p-8 rounded-xl shadow-lg">

//                 <h2 className="text-2xl font-bold text-center mb-2">
//                     Login Account
//                 </h2>

//                 <p className="text-center text-gray-500 mb-6">
//                     Login to continue
//                 </p>


//                 <form onSubmit={handleSubmit} className="space-y-4">

//                     {/* Email */}
//                     <div>
//                         <label className="block text-sm mb-1">
//                             Email
//                         </label>

//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Enter your email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
//                         />
//                     </div>


//                     {/* Password */}
//                     <div>
//                         <label className="block text-sm mb-1">
//                             Password
//                         </label>

//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Enter your password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
//                         />
//                     </div>


//                     {/* Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-slate-800 text-white p-3 rounded-lg hover:bg-green-500 transition"
//                     >
//                         Login
//                     </button>

//                 </form>


//                 {/* Signup Link */}
//                 <p className="text-center text-sm mt-4">
//                     Don't have an account?{" "}
//                     <button
//                         onClick={() => navigate("/SignUp")}
//                         className="text-blue-600 cursor-pointer hover:underline"
//                     >
//                         Sign Up
//                     </button>
//                 </p>

//             </div>

//         </div>
//     );
// };

// export default Login;