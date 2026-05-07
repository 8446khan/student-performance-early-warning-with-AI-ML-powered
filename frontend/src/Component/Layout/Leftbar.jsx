import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Leftbar = () => {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [coordinatorOpen, setCoordinatorOpen] = useState(false)
    const [studentOpen, setStudentOpen] = useState(false)
    const [teacherOpen, setTeacherOpen] = useState(false)

    // ✅ Get role + token
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    // ✅ Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")

        alert("Logged out successfully")

        navigate("/login/coordinator")
    }

    // ✅ Common protected navigation
    const handleNavigation = (path, allowedRole) => {

        if (!token) {
            alert("Please login first")
            navigate(`/login/${allowedRole}`)
            return
        }

        if (role !== allowedRole) {
            alert(`Access denied! Only ${allowedRole} can access`)
            return
        }

        navigate(path)
    }

    return (

        <div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-slate-800 text-white p-4 flex justify-between items-center z-50">
                <h1 className="text-lg font-bold">🏫 Dashboard</h1>

                <button
                    onClick={() => setOpen(!open)}
                    className="text-2xl"
                >
                    ☰
                </button>
            </div>


            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-[70%] md:w-[30%] bg-slate-800 text-white p-6 z-40
                transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                transition duration-500`}>

                <h1 className="text-xl md:text-2xl font-bold mb-8 mt-12 md:mt-0">
                    🏫 Dashboard
                </h1>

                <div className="flex flex-col space-y-4">

                    {/* Student */}
                    <button
                        onClick={() => handleNavigation("/Studentsection", "Studentsection")}
                        className="cursor-pointer p-2 bg-orange-500 rounded hover:bg-green-500 transition hover:scale-105">
                        👤 Student
                    </button>


                    {/* Tutors */}
                    <button
                        onClick={() => handleNavigation("/TuterSection", "TuterSection")}
                        className="cursor-pointer p-2 bg-orange-500 rounded hover:bg-green-500 transition hover:scale-105">
                        👨‍🏫 Tutors/Instructors
                    </button>


                    {/* Parent */}
                    <button
                        onClick={() => handleNavigation("/parent", "parent")}
                        className="cursor-pointer p-2 bg-orange-500 rounded hover:bg-green-500 transition hover:scale-105">
                        👨‍👩‍👧 Parent
                    </button>


                    {/* Class Coordinator */}
                    <button
                        onClick={() => {

                            if (!token) {
                                navigate("/login/coordinator")
                                return
                            }

                            if (role !== "coordinator") {
                                alert("Only coordinator can access")
                                return
                            }

                            setCoordinatorOpen(!coordinatorOpen)
                        }}
                        className="cursor-pointer p-2 bg-orange-500 rounded hover:bg-green-500 transition hover:scale-105">
                        🏫 Class Co-ordinator
                    </button>


                    {/* Coordinator Dropdown */}
                    {coordinatorOpen && (

                        <div className="ml-4 flex flex-col space-y-2">

                            {/* Student Section */}
                            <button
                                onClick={() => setStudentOpen(!studentOpen)}
                                className="p-2 bg-slate-600 rounded hover:bg-green-500 transition">
                                📋 Student Section
                            </button>

                            {studentOpen && (
                                <div className="ml-4 flex flex-col space-y-2">

                                    <button
                                        onClick={() => handleNavigation("/studentform", "coordinator")}
                                        className="p-2 bg-slate-500 rounded hover:bg-green-500 transition">
                                        ➕ Add Student
                                    </button>

                                    <button
                                        onClick={() => handleNavigation("/studentinfo", "coordinator")}
                                        className="p-2 bg-slate-500 rounded hover:bg-green-500 transition">
                                        📄 Student Information
                                    </button>

                                </div>
                            )}


                            {/* Teacher Section */}
                            <button
                                onClick={() => setTeacherOpen(!teacherOpen)}
                                className="p-2 bg-slate-600 rounded hover:bg-green-500 transition">
                                👨‍🏫 Teacher Section
                            </button>

                            {teacherOpen && (
                                <div className="ml-4 flex flex-col space-y-2">

                                    <button
                                        onClick={() => handleNavigation("/TeacherInfoForm", "coordinator")}
                                        className="p-2 bg-slate-500 rounded hover:bg-green-500 transition">
                                        ➕ Add Teacher
                                    </button>

                                    <button
                                        onClick={() => handleNavigation("/teacherinfo", "coordinator")}
                                        className="p-2 bg-slate-500 rounded hover:bg-green-500 transition">
                                        📄 Teacher Information
                                    </button>

                                </div>
                            )}

                            {/* Upload Timetable */}
                            <button
                                onClick={() => handleNavigation("/Timetable", "coordinator")}
                                className="p-2 bg-slate-600 rounded hover:bg-green-500 transition">
                                📅 Upload Timetable
                            </button>

                            {/* Logout (Only for Coordinator) */}
                            {role === "coordinator" && (
                                <button
                                    onClick={handleLogout}
                                    className="p-2 bg-red-500 rounded hover:bg-red-700 transition">
                                    🚪 Logout
                                </button>
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}

export default Leftbar