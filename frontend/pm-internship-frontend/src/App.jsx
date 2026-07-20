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
                

            </Routes>

        </BrowserRouter>

    );

}

export default App;