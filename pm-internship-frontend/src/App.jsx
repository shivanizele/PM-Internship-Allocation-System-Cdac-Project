import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";

// Student
import StudentDashboard from "./pages/Student/Dashboard";
import StudentInternships from "./pages/Student/Internships";
import MyApplications from "./pages/Student/MyApplications";
import StudentProfile from "./pages/Student/StudentProfile";
import EditStudentProfile from "./pages/Student/EditStudentProfile";
import StudentResume from "./pages/Student/StudentResume";

// Company
import CompanyDashboard from "./pages/Company/Dashboard";
import CompanyProfile from "./pages/Company/CompanyProfile";
import EditCompanyProfile from "./pages/Company/EditCompanyProfile";
import MyInternships from "./pages/Company/MyInternships";
import AddInternship from "./pages/Company/AddInternship";
import EditInternship from "./pages/Company/EditInternship";
import CompanyApplications from "./pages/Company/CompanyApplications";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import Students from "./pages/Admin/Students";
import Companies from "./pages/Admin/Companies";
import AdminInternships from "./pages/Admin/Internships";
import Allocations from "./pages/Admin/Allocations";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Landing */}
                <Route path="/" element={<Landing />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* ================= STUDENT ================= */}

                <Route path="/student" element={<StudentDashboard />} />

                <Route
                    path="/student/internships"
                    element={<StudentInternships />}
                />

                <Route
                    path="/student/applications"
                    element={<MyApplications />}
                />

                <Route
                    path="/student/profile"
                    element={<StudentProfile />}
                />

                <Route
                    path="/student/profile/edit"
                    element={<EditStudentProfile />}
                />

                <Route
                    path="/student/resume"
                    element={<StudentResume />}
                />

                {/* ================= COMPANY ================= */}

                <Route
                    path="/company"
                    element={<CompanyDashboard />}
                />

                <Route
                    path="/company/profile"
                    element={<CompanyProfile />}
                />

                <Route
                    path="/company/profile/edit"
                    element={<EditCompanyProfile />}
                />

                <Route
                    path="/company/internships"
                    element={<MyInternships />}
                />

                <Route
                    path="/company/add-internship"
                    element={<AddInternship />}
                />

                <Route
                    path="/company/edit-internship/:id"
                    element={<EditInternship />}
                />

                <Route
                    path="/company/applications/:id"
                    element={<CompanyApplications />}
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/students"
                    element={<Students />}
                />

                <Route
                    path="/admin/companies"
                    element={<Companies />}
                />

                <Route
                    path="/admin/internships"
                    element={<AdminInternships />}
                />

                <Route
                    path="/admin/allocations"
                    element={<Allocations />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;