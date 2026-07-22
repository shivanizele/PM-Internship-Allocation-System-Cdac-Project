import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";

// Student
import StudentDashboard from "./pages/Student/Dashboard";

// Company
import CompanyDashboard from "./pages/Company/Dashboard";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import Internships from "./pages/Student/Internships";
import Students from "./pages/Admin/Students";
import Companies from "./pages/Admin/Companies";
import Allocations from "./pages/Admin/Allocations";
import MyInternships from "./pages/Company/MyInternships";
import AddInternship from "./pages/Company/AddInternship";
import EditInternship from "./pages/Company/EditInternship";
import CompanyProfile from "./pages/Company/CompanyProfile";
import CompanyApplications from "./pages/Company/CompanyApplications";
import MyApplications from "./pages/Student/MyApplications";
import StudentProfile from "./pages/Student/StudentProfile";
import EditStudentProfile from "./pages/Student/EditStudentProfile";
import StudentResume from "./pages/Student/StudentResume";
import EditCompanyProfile from "./pages/Company/EditCompanyProfile";



function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Landing Page */}
                <Route path="/" element={<Landing />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Student */}
                <Route path="/student" element={<StudentDashboard />} />

                {/* Company */}
                <Route path="/company" element={<CompanyDashboard />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student/internships"element={<Internships/>}/>
                <Route path="/admin/students" element={<Students />} />
                <Route path="/admin/companies" element={<Companies />}/>
                <Route path="/admin/internships" element={<Internships />}/>
                <Route path="/admin/allocations" element={<Allocations />} />
                <Route path="/company" element={<CompanyDashboard />}/>
                <Route path="/company/internships" element={<MyInternships />}/>
                <Route path="/company/add-internship" element={<AddInternship />}/>
                <Route path="/company/edit-internship/:id" element={<EditInternship />}/>
                <Route path="/company/profile" element={<CompanyProfile />} />
                <Route path="/company/applications/:id" element={<CompanyApplications />}/>
                <Route path="/student/applications" element={<MyApplications />}/>
                <Route path="/student/profile" element={<StudentProfile />}/>
                <Route path="/student/profile/edit" element={<EditStudentProfile />}/>
                <Route path="/student/resume" element={<StudentResume/>}/>
                <Route path="/company/profile/edit" element={<EditCompanyProfile />}/>
                


            </Routes>

        </BrowserRouter>

    );

}

export default App;