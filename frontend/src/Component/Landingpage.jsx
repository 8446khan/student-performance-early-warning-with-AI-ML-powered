import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from "react-router-dom";
import StudentForm from './StudentForm';
import TeacherInfoForm from './TeacherInfoForm';
import axios from 'axios';
// import { useEffect } from 'react';

function App() {
    const [open, setOpen] = useState(false)
    const [dropdownTeabtnstatus, setdropdownTeabtnstatus] = useState(false)
    const [dropdownStubtnstatus, setdropdownStubtnstatus] = useState(false)


    const dropdownstubtnHandler = () => {
        setdropdownStubtnstatus(true)
        setdropdownTeabtnstatus(false)
    }

    const dropdownTeabtnHandler = () => {
        setdropdownTeabtnstatus(true)
        setdropdownStubtnstatus(false)
    }
    return (
        <div className="md:ml-[30%] w-full md:w-[70%] min-h-screen bg-gray-100 p-4 md:p-10 mt-16 md:mt-0">

            {/* Main Content */}



            {

                dropdownStubtnstatus ? <StudentForm /> : dropdownTeabtnstatus ? <TeacherInfoForm /> : <div>
                    <div className="bg-white rounded-xl shadow-lg p-5 md:p-10 mb-10 animate-fadeInUp">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4">
                            &#128218; Smart Attendance & Academic Monitoring System
                        </h1>
                        <p className="text-sm md:text-base text-gray-600 mb-4">
                            A unified platform to manage attendance, study activity, assignments, performance and GPS verification.
                        </p>
                        <p className="text-sm md:text-base text-gray-600">
                            Integrates AI &#129302; and Location Intelligence &#128506;.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                            <h2 className="text-lg md:text-xl font-semibold">&#128221; Study Progress</h2>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                            <h2 className="text-lg md:text-xl font-semibold">&#128221; Assignments</h2>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                            <h2 className="text-lg md:text-xl font-semibold">&#128200; Performance</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-10">
                        <div className="bg-white p-4 md:p-6 rounded shadow">&#128205; GPS Verification</div>
                        <div className="bg-white p-4 md:p-6 rounded shadow">&#128374; AI Identity</div>
                        <div className="bg-white p-4 md:p-6 rounded shadow">&#9888; Risk Alerts</div>
                        <div className="bg-white p-4 md:p-6 rounded shadow">&#128274; Security</div>
                    </div>

                    <footer className="mt-10 bg-slate-800 text-white p-4 md:p-6 rounded-lg text-center">
                        <p>&copy; 2026 Smart Academic Monitoring System</p>
                        <p>&#128101; Developed by Team</p>
                    </footer>

                </div>


            }



        </div>
    )
}

export default App
