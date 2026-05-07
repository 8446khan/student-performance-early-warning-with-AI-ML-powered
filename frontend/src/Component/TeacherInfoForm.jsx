import React, { useState } from "react";
import axios from "axios";

function TeacherInfoForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        subject: "",
        ContactNo: "",
        email: "",
        image: null,
    });

    const [teachers, setTeachers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            alert("Please select an image");
            return;
        }

        try {
            // Prepare FormData for file upload
            const formDataObj = new FormData();
            formDataObj.append("fullName", formData.fullName);
            formDataObj.append("subject", formData.subject);
            formDataObj.append("ContactNo", formData.ContactNo);
            formDataObj.append("email", formData.email);
            formDataObj.append("image", formData.image);

            // Send POST request to Flask backend
            const response = await axios.post(
                "http://localhost:5000/addteacher",
                formDataObj,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            // Add teacher to local state
            setTeachers((prev) => [...prev, formData]);

            // Reset form
            setFormData({
                fullName: "",
                subject: "",
                ContactNo: "",
                email: "",
                image: null,
            });

            // Show success alert
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);

            console.log(response.data);
        } catch (error) {
            console.error("Error adding teacher:", error);
            alert("Failed to add teacher. Check console for details.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 ml-64">
            <div className="max-w-md mx-auto">

                {/* ALERT */}
                {showAlert && (
                    <div className="fixed top-6 right-6 bg-green-50 border border-green-400
                        text-green-800 px-4 py-3 rounded-lg shadow-md z-50">
                        ✅ Teacher added successfully!
                    </div>
                )}

                {/* FORM */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        🎓 Teacher Registration Form
                    </h2>

                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            placeholder="Enter Full Name"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            placeholder="Enter Subject"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="ContactNo"
                            value={formData.ContactNo}
                            placeholder="Enter Contact No..."
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter Email ID"
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            Add Teacher
                        </button>
                    </form>
                </div>

                {/* REGISTERED TEACHERS */}
                {teachers.length > 0 && (
                    <div className="mt-8 max-h-96 overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            📋 Registered Teachers
                        </h3>
                        <div className="space-y-4">
                            {teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600 flex gap-4 items-center"
                                >
                                    <img
                                        src={URL.createObjectURL(teacher.image)}
                                        alt="teacher"
                                        className="w-16 h-16 rounded-full object-cover border"
                                    />
                                    <div>
                                        <p><strong>Name:</strong> {teacher.fullName}</p>
                                        <p><strong>Subject:</strong> {teacher.subject}</p>
                                        <p><strong>Contact No:</strong> {teacher.ContactNo}</p>
                                        <p><strong>Email:</strong> {teacher.email}</p>
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

export default TeacherInfoForm;