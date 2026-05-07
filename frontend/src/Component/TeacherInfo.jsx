import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherInfo = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchTeachers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/teachers");
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    // 🔍 Filter logic (by name, subject, or contact)
    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.ContactNo.includes(searchTerm)
    );

    return (
        <div className="md:ml-[30%] p-8 mt-16 md:mt-0 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Teacher Directory
                </h2>

                <input
                    type="text"
                    placeholder="Search by name, subject, or contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-4 md:mt-0 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72"
                />
            </div>

            {/* Teacher Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
                                    {teacher.fullName.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                        {teacher.fullName}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Subject: {teacher.subject}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-5">
                                <p>
                                    <span className="font-medium text-gray-700">
                                        Contact No:
                                    </span>{" "}
                                    {teacher.ContactNo}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">
                                        Email:
                                    </span>{" "}
                                    {teacher.email}
                                </p>
                            </div>

                            <button
                                onClick={() => navigate(`/TeacherProfile/${teacher.id}`)}
                                className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-300"
                            >
                                View Profile
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 mt-10">
                        No teachers found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherInfo;