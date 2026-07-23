import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";
import { useEffect } from "react";

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

        <div className="login-container">

            <form className="login-form" onSubmit={login}>

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;