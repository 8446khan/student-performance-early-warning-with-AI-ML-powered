import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        fullname: "",
        rollNo: "",
        ienNo: "",
        branch: "",
    });

    const [loading, setLoading] = useState(true);

    // ================= FETCH STUDENT DATA =================
    const fetchStudent = async () => {
        try {
            const response = axios.get(`http://localhost:5000/auth/users/${id}`);
            setStudent(response.data);
        } catch (error) {
            console.error("Error fetching student:", error);
            alert("Failed to load student data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]);

    // ================= HANDLE CHANGE =================
    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    // ================= UPDATE STUDENT =================
    const handleUpdate = async () => {
        if (!student.fullname || !student.rollNo || !student.branch) {
            alert("Please fill all required fields");
            return;
        }

        try {
            // Update student
            axios.put(`http://localhost:5000/auth/users/${id}`, student);
            alert("Student updated successfully ✅");
            navigate("/StudentInfo"); // go back to student list
        } catch (error) {
            console.error("Update Error:", error);
            alert("Failed to update student");
        }
    };

    if (loading) return <div className="p-8 text-gray-700">Loading...</div>;

    return (
        <div className="md:ml-[30%] p-8 mt-16 md:mt-0 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Student</h2>

            <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
                <label className="block mb-2 font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    name="fullname"
                    value={student.fullname}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded-lg"
                />

                <label className="block mb-2 font-medium text-gray-700">Roll No</label>
                <input
                    type="text"
                    name="rollNo"
                    value={student.rollNo}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded-lg"
                />

                <label className="block mb-2 font-medium text-gray-700">IEN No</label>
                <input
                    type="text"
                    name="ienNo"
                    value={student.ienNo}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded-lg"
                />

                <label className="block mb-2 font-medium text-gray-700">Branch</label>
                <input
                    type="text"
                    name="branch"
                    value={student.branch}
                    onChange={handleChange}
                    className="w-full p-2 mb-6 border rounded-lg"
                />

                <div className="flex gap-3">
                    <button
                        onClick={handleUpdate}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                        Update
                    </button>

                    <button
                        onClick={() => navigate("/StudentInfo")}
                        className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditStudent;