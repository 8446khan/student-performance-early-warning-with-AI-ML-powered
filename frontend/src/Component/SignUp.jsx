import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();
    const { role } = useParams(); // 🔥 get role

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobileno: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ FIX: role validation
        if (!role) {
            alert("Role is missing in URL");
            return;
        }

        console.log("SIGNUP ROLE:", role);

        try {

            const response = await axios.post("http://127.0.0.1:5000/signup", {
                ...formData,
                role: role
            });

            alert(response.data.message || "Signup Success");

            // ✅ FIX: force full reload (important)
            window.location.href = `/login/${role}`;

        } catch (error) {
            console.log(error);
            alert("Signup failed");
        }
    };

    return (
        <div
            className="
            min-h-screen 
            flex items-center justify-center 
            bg-gray-100
            pt-10 md:pt-0
            md:ml-[30%]
        "
        >
            <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">

                {/* 🔥 Dynamic Heading */}
                <h2 className="text-2xl font-bold text-center mb-2">
                    {role ? `${role.toUpperCase()} SIGNUP` : "CREATE ACCOUNT"}
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Sign up to get started
                </p>

                <form onSubmit={handleSubmit} className="space-y-2">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-sm mb-1">Mobile No</label>
                        <input
                            type="text"
                            name="mobileno"
                            placeholder="Enter your mobile No.."
                            value={formData.mobileno}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
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
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-800 text-white p-3 rounded-lg hover:bg-green-500 transition"
                    >
                        Sign Up
                    </button>

                </form>

                {/* 🔥 Login Link */}
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => window.location.href = `/login/${role}`}  // ✅ FIX HERE ALSO
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
};

export default SignUp;