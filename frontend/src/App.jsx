import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Landingpage from "./Component/Landingpage";
import StudentForm from "./Component/StudentForm";
import Layout from "./Component/Layout/Layout";
import TeacherInfoForm from "./Component/TeacherInfoForm";
import StudentInfo from "./Component/StudentInfo";
import TeacherInfo from "./Component/teacherInfo";
import StudentProfile from "./Component/StudentProfile";
import Parent from "./Component/Parent";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Timetable from "./Component/Timetable";
import ViewExtraction from "./Component/ViewExtraction";
import TuterSection from "./Component/TuterSection";
import Studentsection from "./Component/Studentsection";
import Editstudent from "./Component/Editstudent";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,   // 👈 Added error handler
    children: [
      {
        index: true,
        element: <Landingpage />,
      },
      {
        path: "studentform",
        element: <StudentForm />,
      },
      {
        path: "studentinfo",
        element: <StudentInfo />,
      },
      {
        path: "teacherinfoform",
        element: <TeacherInfoForm />,
      },
      {
        path: "teacherinfo",
        element: <TeacherInfo />,
      },
      {
        path: "studentprofile/:id",
        element: <StudentProfile />,
      },

      {
        path: "parent",
        element: <Parent />,
      },

      {
        path: "TeacherInfoForm",
        element: <TeacherInfoForm />,
      },

      {
        path: "Login/:role",
        element: <Login />,
      },

      {
        path: "SignUp/:role",
        element: <SignUp />,
      },
      {
        path: "Timetable",
        element: <Timetable />,
      },
      {
        path: "ViewExtraction",
        element: <ViewExtraction />,
      },
      {
        path: "TuterSection",
        element: <TuterSection />,
      },
      {
        path: "Studentsection",
        element: <Studentsection />,
      },
      {
        path: "Editstudent/:role",
        element: <Editstudent />,
      },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;