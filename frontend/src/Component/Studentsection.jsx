import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Studentsection = () => {
    const navigate = useNavigate();
    const { role } = useParams();

    const [activeTab, setActiveTab] = useState("assignment");

    // ML States
    const [attendance, setAttendance] = useState("");
    const [assignment, setAssignment] = useState("");
    const [studyHours, setStudyHours] = useState("");
    const [prediction, setPrediction] = useState(null);

    // Data States
    const [assignments, setAssignments] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [timetables, setTimetables] = useState([]);
    const [attendances, setAttendances] = useState([]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate(`/Login/${role}`);
    };

    // ML Prediction
    const runPrediction = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/ml/predict", {
                attendance: Number(attendance),
                assignment: Number(assignment),
                study_hours: Number(studyHours),
            });
            setPrediction(response.data);
        } catch (error) {
            console.error("Prediction Error:", error);
        }
    };

    // Fetch functions
    const loadAssignments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/assignments");
            setAssignments(res.data);
        } catch (err) {
            console.log("Load Assignments Error:", err);
        }
    };

    const loadAnnouncements = async () => {
        try {
            const res = await axios.get("http://localhost:5000/announcements");
            setAnnouncements(res.data);
        } catch (err) {
            console.log("Load Announcements Error:", err);
        }
    };

    const loadTimetable = async () => {
        try {
            const res = await axios.get("http://localhost:5000/timetable");
            setTimetables(res.data);
        } catch (err) {
            console.log("Load Timetable Error:", err);
        }
    };

    const loadAttendance = async () => {
        try {
            const res = await axios.get("http://localhost:5000/attendances");
            setAttendances(res.data);
        } catch (err) {
            console.log("Load Attendance Error:", err);
        }
    };

    useEffect(() => {
        if (activeTab === "assignment") loadAssignments();
        if (activeTab === "announcement") loadAnnouncements();
        if (activeTab === "timetable") loadTimetable();
        if (activeTab === "attendance") loadAttendance();
    }, [activeTab]);

    return (
        <div className="md:ml-[30%] p-8 mt-16 md:mt-0 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">🎓 Student Section</h2>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    🚪 Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
                <button onClick={() => setActiveTab("assignment")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "assignment" ? "bg-blue-600" : "bg-slate-500 hover:bg-blue-500"}`}>📚 Assignment</button>
                <button onClick={() => setActiveTab("announcement")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "announcement" ? "bg-blue-600" : "bg-slate-500 hover:bg-blue-500"}`}>📢 Announcement</button>
                <button onClick={() => setActiveTab("timetable")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "timetable" ? "bg-blue-600" : "bg-slate-500 hover:bg-blue-500"}`}>📅 Timetable</button>
                <button onClick={() => setActiveTab("attendance")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "attendance" ? "bg-blue-600" : "bg-slate-500 hover:bg-blue-500"}`}>📝 Attendance</button>
                <button onClick={() => setActiveTab("materials")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "materials" ? "bg-blue-600" : "bg-slate-500 hover:bg-blue-500"}`}>📂 Materials</button>
                <button onClick={() => setActiveTab("notices")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "notices" ? "bg-blue-600" : "bg-slate-500 hover:bg-blue-500"}`}>🔔 Notices</button>
                <button onClick={() => setActiveTab("ml")} className={`p-3 rounded-lg text-white font-medium transition ${activeTab === "ml" ? "bg-blue-600" : "bg-purple-500 hover:bg-purple-600"}`}>🤖 ML Insights</button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-md p-6">

                {/* ASSIGNMENT SECTION */}
                {activeTab === "assignment" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">📚 Assignments</h3>

                        {assignments.length === 0 ? (
                            <p>No assignments posted yet.</p>
                        ) : (
                            assignments.map((a) => <AssignmentCard key={a.id} assignment={a} />)
                        )}
                    </div>
                )}

                {/* ML SECTION */}
                {activeTab === "ml" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">🤖 ML Performance Prediction</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <input type="number" placeholder="Attendance %" value={attendance} onChange={(e) => setAttendance(e.target.value)} className="p-2 border rounded" />
                            <input type="number" placeholder="Assignment Marks" value={assignment} onChange={(e) => setAssignment(e.target.value)} className="p-2 border rounded" />
                            <input type="number" placeholder="Study Hours" value={studyHours} onChange={(e) => setStudyHours(e.target.value)} className="p-2 border rounded" />
                        </div>
                        <button onClick={runPrediction} className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Run Prediction</button>
                        {prediction && (
                            <div className="mt-6 p-4 border rounded-lg bg-green-50">
                                <h4 className="font-semibold text-lg">📊 Prediction Result</h4>
                                <p className="mt-2"><strong>Score:</strong> {prediction.predicted_score}</p>
                                <p><strong>Grade:</strong> {prediction.grade}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Other sections */}
                {activeTab === "announcement" && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">📢 Announcements</h3>
                        {announcements.length === 0 ? (<p>No announcements yet.</p>) :
                            announcements.map((a) => (
                                <div key={a.id} className="bg-gray-100 p-3 mb-2 rounded shadow">
                                    <p>{a.text}</p>
                                    <p className="text-sm text-gray-600">📅 {a.date_posted}</p>
                                </div>
                            ))
                        }
                    </div>
                )}

            </div>
        </div>
    );
};

// AssignmentCard Component
const AssignmentCard = ({ assignment }) => {
    const [fileToUpload, setFileToUpload] = useState(null);

    const handleUpload = async () => {
        if (!fileToUpload) return alert("Please select a file!");
        const formData = new FormData();
        formData.append("file", fileToUpload);
        formData.append("title", assignment.title); // backend requires title
        try {
            await axios.post("http://localhost:5000/upload-assignment", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Assignment uploaded successfully!");
            setFileToUpload(null);
        } catch (err) {
            console.error("Upload Error:", err);
            alert("Failed to upload assignment.");
        }
    };

    return (
        <div className="bg-gray-100 p-3 mb-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
                <p><strong>Title:</strong> {assignment.title}</p>
                <p className="text-sm text-gray-600">📅 {assignment.date_uploaded}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <button onClick={() => window.open(`http://localhost:5000/assignments/download/${assignment.filename}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded shadow">Download</button>

                <input type="file" onChange={(e) => setFileToUpload(e.target.files[0])} className="border p-1 rounded" />

                <button onClick={handleUpload} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Upload</button>
            </div>
        </div>
    );
};

export default Studentsection;