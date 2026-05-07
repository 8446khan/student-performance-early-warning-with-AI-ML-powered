import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentInfo = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/users");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // 🔍 Filter Logic
    const filteredStudents = students.filter((student) =>
        student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toString().includes(searchTerm) ||
        student.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ================= EDIT STUDENT =================
    const editStudent = (id) => {
        // Navigate to a student edit page
        navigate(`/Editstudent/${id}`);
    };

    return (
        <div className="md:ml-[30%] p-8 mt-16 md:mt-0 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Student Directory
                </h2>

                <input
                    type="text"
                    placeholder="Search by name, roll no, or branch..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-4 md:mt-0 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72"
                />
            </div>

            {/* Student Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
                                    {student.fullname.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                        {student.fullname}
                                    </h3>
                                    <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-5">
                                <p>
                                    <span className="font-medium text-gray-700">IEN No:</span>{" "}
                                    {student.ienNo}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Branch:</span>{" "}
                                    {student.branch}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/StudentProfile/${student.id}`)}
                                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-300"
                                >
                                    View Profile
                                </button>

                                <button
                                    onClick={() => editStudent(student.id)}
                                    className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all duration-300"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 mt-10">
                        No students found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentInfo;