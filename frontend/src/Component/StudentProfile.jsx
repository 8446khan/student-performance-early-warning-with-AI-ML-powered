import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [showPastActivity, setShowPastActivity] = useState(false);
    const [showPastMissed, setShowPastMissed] = useState(false);

    const fetchStudent = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/auth/users/${id}`
            );
            setStudent(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

    useEffect(() => {
        fetchStudent(id);
    }, [id]);

    if (!student) {
        return <div className="md:ml-[30%] p-6 mt-16">Loading...</div>;
    }

    return (
        <div className="md:ml-[30%] p-6 mt-16 md:mt-0 flex flex-col items-center gap-10 bg-gray-50 min-h-screen">

            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src={


                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="Student"
                        className="w-28 h-28 rounded-full"
                    />
                </div>

                <h2 className="text-2xl capitalize font-semibold text-center text-gray-800 mb-6">
                    {student.fullname}
                </h2>

                <div className="space-y-3 text-gray-600 text-sm">
                    <p><span className="font-medium text-gray-800">Roll No:</span> {student.rollNo}</p>
                    <p><span className="font-medium text-gray-800">IEN No:</span> {student.ienNo}</p>
                    <p><span className="font-medium bg- text-gray-800">Branch:</span> {student.branch}</p>
                    <p><span className="font-medium text-gray-800">Email:</span> {student.email}</p>
                </div>
            </div>

            {/* Academic Overview */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">

                <h3 className="text-xl font-semibold text-gray-800 mb-8 border-b pb-3">
                    Academic Overview
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                        <p className="text-sm text-gray-500">Assignments</p>
                        <p className="text-2xl font-semibold text-gray-800 mt-2">8 / 10</p>
                        <p className="text-xs text-gray-400 mt-1">Submitted</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                        <p className="text-sm text-gray-500">Attendance</p>
                        <p className="text-2xl font-semibold text-gray-800 mt-2">85%</p>
                        <p className="text-xs text-gray-400 mt-1">Current Semester</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                        <p className="text-sm text-gray-500">Performance</p>
                        <p className="text-2xl font-semibold text-gray-800 mt-2">A</p>
                        <p className="text-xs text-gray-400 mt-1">Overall Grade</p>
                    </div>

                </div>

                {/* Progress */}
                <div>
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">
                            Overall Progress
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                            80%
                        </p>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-in-out"
                            style={{ width: "80%" }}
                        ></div>
                    </div>
                </div>

            </div>

            {/* ✅ Daily Activity Log */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">

                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Daily Activity Log
                </h3>

                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li>✔ Attended Data Structures Lecture - 09:00 AM</li>
                    <li>✔ Submitted DBMS Assignment - 11:45 AM</li>
                    <li>✔ Present in Lab Session - 02:00 PM</li>
                </ul>

                <button
                    onClick={() => setShowPastActivity(!showPastActivity)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    {showPastActivity ? "Hide Past Activity" : "View Past Activity"}
                </button>

                {showPastActivity && (
                    <div className="mt-4 border-t pt-4">
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>✔ Mathematics Lecture - Yesterday</li>
                            <li>✔ OS Assignment Submission - Yesterday</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* ❌ Daily Missed Activity Log */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">

                <h3 className="text-xl font-semibold text-red-600 mb-4">
                    Daily Missed Activity Log
                </h3>

                <ul className="space-y-2 text-sm text-red-600 mb-4">
                    <li>❌ Missed Operating Systems Lecture - 10:00 AM</li>
                    <li>❌ Did Not Submit AI Assignment - 01:30 PM</li>
                </ul>

                <button
                    onClick={() => setShowPastMissed(!showPastMissed)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                    {showPastMissed ? "Hide Past Missed Logs" : "View Past Missed Logs"}
                </button>

                {showPastMissed && (
                    <div className="mt-4 border-t pt-4">
                        <ul className="space-y-2 text-sm text-red-600">
                            <li>❌ Absent in Mathematics - 2 Days Ago</li>
                            <li>❌ Missed Lab Session - 3 Days Ago</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="bg-white  p-8 w-full max-w-3xl shadow-md rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Parent Contacts
                </h2>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="border rounded-xl p-4">
                        <p className="font-medium text-gray-800">{student.parentName}</p>
                        <p className="text-gray-500">Father</p>
                        <p className="mt-2 text-gray-600">Email:{(student.parentName)}@gmail.com</p>
                        <p className="text-gray-600">Phone:{student.parentContact}</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default StudentProfile;