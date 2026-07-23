import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./components/ProtectedRoute";

// ================= STUDENT =================
import StudentDashboard from "./pages/Student/Dashboard";
import StudentInternships from "./pages/Student/Internships";
import MyApplications from "./pages/Student/MyApplications";
import StudentProfile from "./pages/Student/StudentProfile";
import EditStudentProfile from "./pages/Student/EditStudentProfile";
import StudentResume from "./pages/Student/StudentResume";

// ================= COMPANY =================
import CompanyDashboard from "./pages/Company/Dashboard";
import CompanyProfile from "./pages/Company/CompanyProfile";
import EditCompanyProfile from "./pages/Company/EditCompanyProfile";
import MyInternships from "./pages/Company/MyInternships";
import AddInternship from "./pages/Company/AddInternship";
import EditInternship from "./pages/Company/EditInternship";
import CompanyApplications from "./pages/Company/CompanyApplications";

// ================= ADMIN =================
import AdminDashboard from "./pages/Admin/Dashboard";
import Students from "./pages/Admin/Students";
import Companies from "./pages/Admin/Companies";
import AdminInternships from "./pages/Admin/Internships";
import Allocations from "./pages/Admin/Allocations";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* ================= STUDENT ================= */}

                <Route
                    path="/student"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/internships"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentInternships />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/applications"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/profile/edit"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <EditStudentProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/resume"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentResume />
                        </ProtectedRoute>
                    }
                />

                {/* ================= COMPANY ================= */}

                <Route
                    path="/company"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <CompanyDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/profile"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <CompanyProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/profile/edit"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <EditCompanyProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/internships"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <MyInternships />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/add-internship"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <AddInternship />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/edit-internship/:id"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <EditInternship />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/applications/:id"
                    element={
                        <ProtectedRoute allowedRole="COMPANY">
                            <CompanyApplications />
                        </ProtectedRoute>
                    }
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/students"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/companies"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Companies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/internships"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <AdminInternships />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/allocations"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Allocations />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;