import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Parent = () => {
    const [showPastActivity, setShowPastActivity] = useState(false);
    const [showPastMissed, setShowPastMissed] = useState(false);
    const navigate = useNavigate();
    const { role } = useParams(); // expects "parent" in URL

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Logged out successfully ✅");
        navigate(`/Login/${role}`);
    };

    return (
        <div className="md:ml-[30%] p-8 mt-16 md:mt-0 bg-gray-50 min-h-screen">

            {/* Logout Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Parent Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Monitor your child’s academic progress and daily activity.
                </p>
            </div>

            {/* Student Summary */}
            <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Overview</h2>
                <div className="grid md:grid-cols-4 gap-6 text-sm">
                    <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">Rahul Sharma</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Class</p>
                        <p className="font-medium text-gray-800">B.Tech CSE</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Semester</p>
                        <p className="font-medium text-gray-800">6th</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Roll No</p>
                        <p className="font-medium text-gray-800">101</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Academic Status</p>
                        <p className="font-medium text-green-600">Good Standing</p>
                    </div>
                </div>
            </div>

            {/* Performance Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-2">88%</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">Assignments</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-2">9 / 10</p>
                    <p className="text-xs text-gray-400 mt-1">Completed</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">Marks</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-2">499/560</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">Overall Grade</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-2">A</p>
                    <p className="text-xs text-gray-400 mt-1">Current Semester</p>
                </div>
            </div>

            {/* Daily Activity Log */}
            <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity Log</h2>
                <ul className="space-y-3 text-sm text-gray-600 mb-4">
                    <li>✔ Attended Data Structures Lecture - 09:00 AM</li>
                    <li>✔ Submitted DBMS Assignment - 11:45 AM</li>
                    <li>✔ Present in Lab Session - 02:00 PM</li>
                    <li>✔ Library Visit - 04:15 PM</li>
                </ul>
                <button
                    onClick={() => setShowPastActivity(!showPastActivity)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    {showPastActivity ? "Hide Past Activity Log" : "View Past Activity Log"}
                </button>

                {showPastActivity && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Past Activity Log</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>✔ Attended Mathematics Lecture - Yesterday</li>
                            <li>✔ Submitted OS Assignment - Yesterday</li>
                            <li>✔ Sports Practice - 2 Days Ago</li>
                            <li>✔ Seminar Participation - 3 Days Ago</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Daily Missed Activity Log */}
            <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-red-600 mb-4">❌ Daily Missed Activity Log</h2>
                <ul className="space-y-3 text-sm text-red-600 mb-4">
                    <li>❌ Missed Operating Systems Lecture - 10:00 AM</li>
                    <li>❌ Did Not Submit AI Assignment - 01:30 PM</li>
                </ul>
                <button
                    onClick={() => setShowPastMissed(!showPastMissed)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                    {showPastMissed ? "Hide Past Missed Logs" : "View Past Missed Logs"}
                </button>

                {showPastMissed && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Past Missed Logs</h3>
                        <ul className="space-y-2 text-sm text-red-600">
                            <li>❌ Absent in Mathematics - Yesterday</li>
                            <li>❌ Missed Lab Session - 2 Days Ago</li>
                            <li>❌ Missed Seminar - 3 Days Ago</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Teacher Contacts */}
            <div className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Teacher Contacts</h2>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="border rounded-xl p-4">
                        <p className="font-medium text-gray-800">Dr. Amit Verma</p>
                        <p className="text-gray-500">Class Teacher</p>
                        <p className="mt-2 text-gray-600">Email: amit.verma@college.edu</p>
                        <p className="text-gray-600">Phone: +91 9876543210</p>
                    </div>
                    <div className="border rounded-xl p-4">
                        <p className="font-medium text-gray-800">Prof. Neha Kapoor</p>
                        <p className="text-gray-500">Data Structures</p>
                        <p className="mt-2 text-gray-600">Email: neha.kapoor@college.edu</p>
                        <p className="text-gray-600">Phone: +91 9123456780</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Parent;