import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {

        if (role === "ADMIN")
            navigate("/admin");

        else if (role === "STUDENT")
            navigate("/student");

        else if (role === "COMPANY")
            navigate("/company");
    }

}, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post("/auth/login", {
            email,
            password
        });

localStorage.setItem("token", response.data.token);
localStorage.setItem("id", response.data.id);               // User ID
localStorage.setItem("companyId", response.data.companyId); // Company ID
localStorage.setItem("role", response.data.role);
localStorage.setItem("email", response.data.email);
localStorage.setItem("studentId", response.data.studentId);
localStorage.setItem("role", response.data.role);
localStorage.setItem("token", response.data.token);
localStorage.setItem("fullName", response.data.fullName);

if (response.data.role === "ADMIN") {
    navigate("/admin");
}
else if (response.data.role === "STUDENT") {
    navigate("/student");
}
else {
    navigate("/company");
}

    }
    catch (error) {

        alert("Invalid Email or Password");

        console.log(error);

    }

};

    return (

    <div className="login-page">

        <div className="background-shape shape1"></div>
        <div className="background-shape shape2"></div>

        <div className="login-card">

            <div className="login-left">

                <h1>InternConnect</h1>

                <h3>Internship Allocation System</h3>

                <p>
                    Discover internships, apply with one click,
                    and let AI recommend opportunities based on
                    your profile and skills.
                </p>

                <div className="login-features">

                    <div className="feature">
                        🎯 AI Internship Recommendations
                    </div>

                    <div className="feature">
                        📄 Resume Management
                    </div>

                    <div className="feature">
                        💼 Company & Student Dashboard
                    </div>

                </div>

            </div>

            <div className="login-right">

                <form className="login-form" onSubmit={login}>

                    <h2>Welcome Back 👋</h2>

                    <p className="subtitle">
                        Login to continue
                    </p>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    </div>

);

}

export default Login;