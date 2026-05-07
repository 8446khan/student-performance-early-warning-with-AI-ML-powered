import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();
    const { role } = useParams(); // 🔥 role from URL

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("http://127.0.0.1:5000/login", {
                email: formData.email,
                password: formData.password,
                role: role
            });

            // ✅ FIX: handle both token formats
            const token = res.data.token || res.data.access_token;

            console.log("LOGIN TOKEN:", token);

            // ✅ store properly
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            alert(res.data.message || "Login Success");

            // 🔥 role-based redirect
            const roleRoutes = {
                student: "/studentdashboard",
                teacher: "/TuterSection",
                parent: "/parent",
                coordinator: "/teacherinfo"
            };

            // ✅ FIX: force reload (important)
            window.location.href = roleRoutes[role] || "/";

        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (

        <div
            className="
            min-h-screen
            flex items-center justify-center
            bg-gray-100
            pt-20 md:pt-0
            md:ml-[30%]
            "
        >

            <div className="bg-white w-[90%] max-w-md p-8 rounded-xl shadow-lg">

                {/* 🔥 Dynamic Heading */}
                <h2 className="text-2xl font-bold text-center mb-2">
                    {role ? `${role.toUpperCase()} LOGIN` : "LOGIN"}
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Login to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-slate-800 text-white p-3 rounded-lg hover:bg-green-500 transition"
                    >
                        Login
                    </button>

                </form>

                {/* Signup Link */}
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate(`/SignUp/${role}`)}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </button>
                </p>

            </div>

        </div>
    );
};

export default Login;