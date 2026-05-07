import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TuterSection = () => {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("studentsList");
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [presentStudents, setPresentStudents] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);
    const [riskResults, setRiskResults] = useState({});
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    // Assignments & Announcements
    const [assignments, setAssignments] = useState([]);
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [announcementText, setAnnouncementText] = useState("");

    // ===== LOGOUT =====
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Logged out successfully ✅");
        navigate("/Login/teacher");
    };

    // ===== DATE & TIME =====
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentDate(now.toLocaleDateString());
            setCurrentTime(now.toLocaleTimeString());
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // ===== LOAD STUDENTS =====
    const loadStudents = () => {
        axios
            .get("http://localhost:5000/auth/users")
            .then((res) => setStudents(res.data))
            .catch((err) => console.log("Student Load Error:", err));
    };
    useEffect(() => loadStudents(), []);

    // ===== ATTENDANCE =====
    const handleAttendanceChange = (id, status) => {
        setAttendance({ ...attendance, [id]: status });
    };

    const saveAttendance = () => {
        axios
            .post("http://localhost:5000/save-attendance", { attendance })
            .then(() => {
                alert("Attendance Saved ✅");
                const presentList = [];
                const absentList = [];
                students.forEach((student) => {
                    if (attendance[student.id] === "Present") {
                        presentList.push({ ...student, date: currentDate, time: currentTime });
                    }
                    if (attendance[student.id] === "Absent") {
                        absentList.push({ ...student, date: currentDate, time: currentTime });
                    }
                });
                setPresentStudents(presentList);
                setAbsentStudents(absentList);
                setAttendance({});
            })
            .catch((err) => console.log("Attendance Save Error:", err));
    };

    // ===== PREDICT RISK (Hardcoded Example) =====
    const predictRisk = (studentId) => {
        let risk = "Low";
        if (studentId % 3 === 0) risk = "High";
        else if (studentId % 2 === 0) risk = "Medium";
        setRiskResults({ ...riskResults, [studentId]: risk });
    };
    const predictAllRisk = () => students.forEach((s) => predictRisk(s.id));

    // ===== ASSIGNMENT FUNCTIONS =====
    const uploadAssignment = () => {
        if (!assignmentTitle || !assignmentFile) {
            alert("Please provide a title and file ✅");
            return;
        }

        const formData = new FormData();
        formData.append("title", assignmentTitle);
        formData.append("file", assignmentFile);
        formData.append("uploaded_by", "teacher"); // add uploaded_by field

        axios
            .post("http://localhost:5000/upload-assignment", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                alert(res.data.message);
                setAssignmentTitle("");
                setAssignmentFile(null);
                loadAssignments(); // refresh assignments list
            })
            .catch((err) => console.log("Upload Error:", err));
    };

    const loadAssignments = () => {
        axios
            .get("http://localhost:5000/assignments")
            .then((res) => setAssignments(res.data))
            .catch((err) => console.log("Load Assignments Error:", err));
    };
    useEffect(() => loadAssignments(), []);

    const downloadAssignment = (filename) => {
        window.open(`http://localhost:5000/assignments/download/${filename}`);
    };

    // ===== ANNOUNCEMENT FUNCTIONS =====
    const postAnnouncement = () => {
        if (!announcementText) {
            alert("Enter announcement text ✅");
            return;
        }
        axios
            .post("http://localhost:5000/announcements", { text: announcementText })
            .then((res) => {
                alert(res.data.message);
                loadAnnouncements();
                setAnnouncementText("");
            })
            .catch((err) => console.log("Announcement Error:", err));
    };

    const loadAnnouncements = () => {
        axios
            .get("http://localhost:5000/announcements")
            .then((res) => setAnnouncements(res.data))
            .catch((err) => console.log("Load Announcement Error:", err));
    };
    useEffect(() => loadAnnouncements(), []);

    return (
        <div className="md:ml-[30%] p-6 mt-16 md:mt-0 bg-gray-100 min-h-screen">
            {/* HEADER */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Teacher Dashboard</h1>
                    <p className="text-gray-500">Manage Students, Attendance & More</p>
                    <p className="text-sm text-gray-600 mt-2">
                        📅 Date: {currentDate} | ⏰ Time: {currentTime}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-5 py-2 rounded shadow hover:bg-red-700"
                >
                    🚪 Logout
                </button>
            </div>

            {/* MENU */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => setActiveMenu("studentsList")} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
                    Student List
                </button>
                <button onClick={() => setActiveMenu("markAttendance")} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                    Mark Attendance
                </button>
                <button onClick={() => setActiveMenu("presentStudents")} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                    Present Students
                </button>
                <button onClick={() => setActiveMenu("absentStudents")} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700">
                    Absent Students
                </button>
                <button onClick={() => setActiveMenu("uploadAssignment")} className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700">
                    Upload Assignment
                </button>
                <button onClick={() => setActiveMenu("viewAssignment")} className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700">
                    View Assignment
                </button>
                <button onClick={() => setActiveMenu("announcements")} className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700">
                    Announcements
                </button>
            </div>

            {/* ================== MENU CONTENT ================== */}

            {/* STUDENT LIST */}
            {activeMenu === "studentsList" && (
                <div>
                    {students.map((s) => (
                        <div key={s.id} className="bg-white p-4 mb-3 rounded shadow">
                            <h3 className="font-bold text-lg">{s.fullname}</h3>
                            <p>Roll: {s.rollNo}</p>
                            <p>Branch: {s.branch}</p>
                            <button onClick={() => predictRisk(s.id)} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">
                                Predict Risk
                            </button>
                            {riskResults[s.id] && (
                                <p className="mt-2 font-bold">
                                    Risk:
                                    <span className={
                                        riskResults[s.id] === "High"
                                            ? "text-red-600"
                                            : riskResults[s.id] === "Medium"
                                                ? "text-yellow-600"
                                                : "text-green-600"
                                    }>
                                        {" "}{riskResults[s.id]}
                                    </span>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* MARK ATTENDANCE */}
            {activeMenu === "markAttendance" && (
                <div>
                    <div className="mb-4 font-semibold text-gray-700">
                        📅 {currentDate} | ⏰ {currentTime}
                    </div>
                    {students.map((s) => (
                        <div key={s.id} className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center">
                            <span>{s.fullname}</span>
                            <span>Roll: {s.rollNo}</span>
                            <span>Branch: {s.branch}</span>
                            <div>
                                <button
                                    onClick={() => handleAttendanceChange(s.id, "Present")}
                                    className={`px-3 py-1 mr-2 rounded text-white ${attendance[s.id] === "Present" ? "bg-green-700" : "bg-green-500"}`}
                                >
                                    Present
                                </button>
                                <button
                                    onClick={() => handleAttendanceChange(s.id, "Absent")}
                                    className={`px-3 py-1 rounded text-white ${attendance[s.id] === "Absent" ? "bg-red-700" : "bg-red-500"}`}
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={saveAttendance} className="mt-4 bg-blue-700 text-white px-5 py-2 rounded shadow">
                        Save Attendance
                    </button>
                </div>
            )}

            {/* PRESENT STUDENTS */}
            {activeMenu === "presentStudents" && (
                <div>
                    {presentStudents.length === 0 ? (
                        <p>No Present Students</p>
                    ) : (
                        presentStudents.map((s) => (
                            <div key={s.id} className="bg-green-100 p-3 mb-2 rounded shadow">
                                <p>{s.fullname}</p>
                                <p>Roll: {s.rollNo}</p>
                                <p>Branch: {s.branch}</p>
                                <p className="text-sm text-gray-600">📅 {s.date} | ⏰ {s.time}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* ABSENT STUDENTS */}
            {activeMenu === "absentStudents" && (
                <div>
                    {absentStudents.length === 0 ? (
                        <p>No Absent Students</p>
                    ) : (
                        absentStudents.map((s) => (
                            <div key={s.id} className="bg-red-100 p-3 mb-2 rounded shadow">
                                <p>{s.fullname}</p>
                                <p>Roll: {s.rollNo}</p>
                                <p>Branch: {s.branch}</p>
                                <p className="text-sm text-gray-600">📅 {s.date} | ⏰ {s.time}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* UPLOAD ASSIGNMENT */}
            {activeMenu === "uploadAssignment" && (
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="font-bold mb-2">Upload Assignment</h2>
                    <input
                        type="text"
                        placeholder="Assignment Title"
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="file"
                        onChange={(e) => setAssignmentFile(e.target.files[0])}
                        className="mb-2"
                    />
                    <button
                        onClick={uploadAssignment}
                        className="bg-green-600 text-white px-4 py-2 rounded shadow"
                    >
                        Upload
                    </button>
                </div>
            )}

            {/* VIEW ASSIGNMENT */}
            {activeMenu === "viewAssignment" && (
                <div>
                    <h2 className="font-bold mb-4">Assignments</h2>
                    {assignments.length === 0 ? (
                        <p>No assignments uploaded</p>
                    ) : (
                        assignments.map((a) => {
                            const dateObj = new Date(a.date_uploaded);
                            const date = dateObj.toLocaleDateString();
                            const time = dateObj.toLocaleTimeString();
                            return (
                                <div key={a.id} className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center">
                                    <div>
                                        <p>Title: {a.title}</p>
                                        <p>Uploaded By: <strong>{a.uploaded_by || "Student"}</strong></p>
                                        <p>Date: {date} | Time: {time}</p>
                                    </div>
                                    <button
                                        onClick={() => downloadAssignment(a.filename)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded shadow"
                                    >
                                        Download
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* ANNOUNCEMENTS */}
            {activeMenu === "announcements" && (
                <div>
                    <h2 className="font-bold mb-2">Post Announcement</h2>
                    <input
                        type="text"
                        placeholder="Enter announcement..."
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    />
                    <button
                        onClick={postAnnouncement}
                        className="bg-yellow-600 text-white px-4 py-2 rounded shadow mb-4"
                    >
                        Post
                    </button>

                    <h3 className="font-bold mb-2">Announcements</h3>
                    {announcements.length === 0 ? (
                        <p>No announcements yet</p>
                    ) : (
                        announcements.map((a) => {
                            const dateObj = new Date(a.date_posted);
                            const date = dateObj.toLocaleDateString();
                            const time = dateObj.toLocaleTimeString();
                            return (
                                <div key={a.id} className="bg-white p-3 mb-2 rounded shadow">
                                    <p>{a.text}</p>
                                    <p className="text-sm text-gray-600">📅 {date} | ⏰ {time}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default TuterSection;