import React, { useState } from "react";
import axios from "axios";

function StudentForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        rollNo: "",
        ienNo: "",
        branch: "",
        email: "",
        parentName: "",
        parentContact: "",
        image: null,
    });

    const [students, setStudents] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save locally (UI display)
        setStudents([...students, formData]);

        try {
            // Use FormData for file upload
            const data = new FormData();
            data.append("fullName", formData.fullName);
            data.append("rollNo", formData.rollNo);
            data.append("ienNo", formData.ienNo);
            data.append("branch", formData.branch);
            data.append("email", formData.email);
            data.append("parentName", formData.parentName);
            data.append("parentContact", formData.parentContact);
            data.append("image", formData.image);

            const response = await axios.post(
                "http://localhost:5000/auth/user",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);
        } catch (error) {
            console.log(error);
        }

        // Success Alert
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);

        // Reset Form
        setFormData({
            fullName: "",
            rollNo: "",
            ienNo: "",
            branch: "",
            email: "",
            parentName: "",
            parentContact: "",
            image: null,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 ml-64">
            <div className="max-w-md mx-auto">

                {/* ALERT */}
                {showAlert && (
                    <div className="fixed top-6 right-6 bg-green-50 border border-green-400
                        text-green-800 px-4 py-3 rounded-lg shadow-md flex items-center gap-3 z-50">
                        <span className="text-2xl">✔</span>
                        <div>
                            <p className="font-semibold">Success</p>
                            <p className="text-sm">Student added successfully.</p>
                        </div>
                    </div>
                )}

                {/* FORM */}
                <div className="bg-white border w-full p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        🎓 Student Registration Form
                    </h2>

                    <form className="space-y-3" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <input
                            type="text"
                            name="rollNo"
                            placeholder="Roll Number"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <input
                            type="text"
                            name="ienNo"
                            placeholder="IEN Number"
                            value={formData.ienNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <input
                            type="text"
                            name="branch"
                            placeholder="Branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        {/* NEW FIELDS */}
                        <input
                            type="text"
                            name="parentName"
                            placeholder="Parent Name"
                            value={formData.parentName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <input
                            type="text"
                            name="parentContact"
                            placeholder="Parent Contact Number"
                            value={formData.parentContact}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                            Add Student
                        </button>
                    </form>
                </div>

                {/* STUDENT LIST */}
                {students.length > 0 && (
                    <div className="mt-8 max-h-96 overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            📋 Registered Students
                        </h3>

                        <div className="space-y-4">
                            {students.map((student, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600 flex gap-4"
                                >
                                    <img
                                        src={URL.createObjectURL(student.image)}
                                        alt="student"
                                        className="w-20 h-20 rounded-full object-cover border"
                                    />

                                    <div>
                                        <h4 className="text-lg font-bold">
                                            {student.fullName}
                                        </h4>
                                        <p><strong>Roll No:</strong> {student.rollNo}</p>
                                        <p><strong>Branch:</strong> {student.branch}</p>
                                        <p><strong>Email:</strong> {student.email}</p>
                                        <p><strong>Parent:</strong> {student.parentName}</p>
                                        <p><strong>Contact:</strong> {student.parentContact}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default StudentForm;