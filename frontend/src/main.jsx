import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TuterSection = () => {
//   const navigate = useNavigate();

//   const [activeMenu, setActiveMenu] = useState("studentsList");
//   const [students, setStudents] = useState([]);
//   const [assignments, setAssignments] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [presentStudents, setPresentStudents] = useState([]);
//   const [absentStudents, setAbsentStudents] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);

//   /* ================= LOAD STUDENTS ================= */
//   const loadStudents = () => {
//     axios.get("http://localhost:5000/auth/users")
//       .then((res) => setStudents(res.data))
//       .catch((err) => console.log(err));
//   };

//   /* ================= LOAD ASSIGNMENTS ================= */
//   const loadAssignments = () => {
//     axios.get("http://localhost:5000/assignments")
//       .then((res) => setAssignments(res.data));
//   };

//   /* ================= FILE ================= */
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type !== "application/pdf") {
//       alert("Only PDF allowed");
//       return;
//     }
//     setFile(selectedFile);
//   };

//   /* ================= UPLOAD ASSIGNMENT ================= */
//   const handleUploadAssignment = () => {
//     if (!title || !description || !file) {
//       alert("Fill all fields");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("file", file);

//     axios.post("http://localhost:5000/add-assignment", formData)
//       .then(() => {
//         alert("Assignment Uploaded");
//         setTitle("");
//         setDescription("");
//         setFile(null);
//         loadAssignments();
//         setActiveMenu("viewAssignment");
//       });
//   };

//   /* ================= ATTENDANCE ================= */
//   const handleAttendanceChange = (id, status) => {
//     setAttendance(prev => ({ ...prev, [id]: status }));
//   };

//   const saveAttendance = () => {
//     axios.post("http://localhost:5000/save-attendance", { attendance })
//       .then(() => {
//         alert("Attendance Saved ✅");
//         setAttendance({});
//       })
//       .catch((err) => console.log(err));
//   };

//   /* ================= LOAD PRESENT / ABSENT ================= */
//   const loadPresentStudents = () => {
//     axios.get("http://localhost:5000/present-students")
//       .then((res) => setPresentStudents(res.data));
//   };

//   const loadAbsentStudents = () => {
//     axios.get("http://localhost:5000/absent-students")
//       .then((res) => setAbsentStudents(res.data));
//   };

//   /* ================= LOGOUT ================= */
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     alert("Logged out successfully");
//     navigate("/login/tutor"); // change path if your login route is different
//   };

//   return (
//     <div className="md:ml-[30%] p-6 mt-16 bg-gray-100 min-h-screen">

//       {/* Header with Logout */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">👨‍🏫 Teacher Panel</h2>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Menu Buttons */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         <button onClick={() => { setActiveMenu("studentsList"); loadStudents(); }}
//           className="px-4 py-2 bg-orange-500 text-white rounded">Student List</button>
//         <button onClick={() => setActiveMenu("addAssignment")}
//           className="px-4 py-2 bg-blue-500 text-white rounded">Add Assignment</button>
//         <button onClick={() => { setActiveMenu("viewAssignment"); loadAssignments(); }}
//           className="px-4 py-2 bg-blue-700 text-white rounded">View Assignments</button>
//         <button onClick={() => { setActiveMenu("markAttendance"); loadStudents(); }}
//           className="px-4 py-2 bg-green-500 text-white rounded">Mark Attendance</button>
//         <button onClick={() => { setActiveMenu("presentStudents"); loadPresentStudents(); }}
//           className="px-4 py-2 bg-green-700 text-white rounded">Present Students</button>
//         <button onClick={() => { setActiveMenu("absentStudents"); loadAbsentStudents(); }}
//           className="px-4 py-2 bg-red-700 text-white rounded">Absent Students</button>
//       </div>

//       {/* Student List */}
//       {activeMenu === "studentsList" &&
//         students.map(s => (
//           <div key={s.id} className="bg-white p-3 mb-2 rounded shadow">
//             <h3 className="font-bold">{s.fullname}</h3>
//             <p>Roll: {s.rollNo}</p>
//             <p>Branch: {s.branch}</p>
//           </div>
//         ))
//       }

//       {/* Add Assignment */}
//       {activeMenu === "addAssignment" &&
//         <div className="bg-white p-4 rounded shadow">
//           <input type="text" placeholder="Assignment Title" value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border mb-3 rounded" />
//           <textarea placeholder="Description" value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border mb-3 rounded" />
//           <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-3" />
//           <button onClick={handleUploadAssignment} className="bg-blue-500 text-white px-4 py-2 rounded">
//             Upload Assignment
//           </button>
//         </div>
//       }

//       {/* Mark Attendance */}
//       {activeMenu === "markAttendance" &&
//         <div>
//           {students.map(s => (
//             <div key={s.id} className="bg-white p-3 mb-2 rounded shadow flex justify-between items-center">
//               <div>
//                 <h3>{s.fullname}</h3>
//                 <p>Roll: {s.rollNo}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button onClick={() => handleAttendanceChange(s.id, "Present")}
//                   style={{
//                     backgroundColor: attendance[s.id] === "Present" ? "#166534" : "#22c55e",
//                     color: "white", padding: "6px 12px", borderRadius: "6px"
//                   }}>Present</button>
//                 <button onClick={() => handleAttendanceChange(s.id, "Absent")}
//                   style={{
//                     backgroundColor: attendance[s.id] === "Absent" ? "#991b1b" : "#ef4444",
//                     color: "white", padding: "6px 12px", borderRadius: "6px"
//                   }}>Absent</button>
//               </div>
//             </div>
//           ))}
//           <button onClick={saveAttendance} className="bg-blue-600 text-white px-5 py-2 rounded mt-4">
//             Save Attendance
//           </button>
//         </div>
//       }

//       {/* Present Students */}
//       {activeMenu === "presentStudents" &&
//         <div>
//           <h2 className="text-xl font-bold mb-4">Present Students</h2>
//           {presentStudents.map(p => (
//             <div key={p.id} className="bg-white p-3 mb-2 rounded shadow">
//               <h3 className="font-bold">{p.student_name}</h3>
//               <p>Date: {p.date}</p>
//             </div>
//           ))}
//         </div>
//       }

//       {/* Absent Students */}
//       {activeMenu === "absentStudents" &&
//         <div>
//           <h2 className="text-xl font-bold mb-4">Absent Students</h2>
//           {absentStudents.map(a => (
//             <div key={a.id} className="bg-white p-3 mb-2 rounded shadow">
//               <h3 className="font-bold">{a.student_name}</h3>
//               <p>Date: {a.date}</p>
//             </div>
//           ))}
//         </div>
//       }

//       {/* View Assignments */}
//       {activeMenu === "viewAssignment" &&
//         assignments.map(a => (
//           <div key={a.id} className="bg-white p-3 mb-2 rounded shadow">
//             <h3 className="font-bold">{a.title}</h3>
//             <p>{a.description}</p>
//           </div>
//         ))
//       }

//     </div>
//   );
// };

// export default TuterSection;