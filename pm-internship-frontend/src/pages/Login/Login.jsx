import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

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
//localStorage.setItem("userId", response.data.id);
localStorage.setItem("id", response.data.id);
localStorage.setItem("role", response.data.role);
localStorage.setItem("email", response.data.email);

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