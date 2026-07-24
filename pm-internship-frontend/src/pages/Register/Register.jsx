import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const register = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", user);

            alert("Registration Successful");

            navigate("/login");

        }
        catch (err) {

            console.log(err);

            alert(
                err.response?.data ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="register-container">

            <form
                className="register-form"
                onSubmit={register}
            >

                <h2>Create Account</h2>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={user.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                >

                    <option value="STUDENT">
                        Student
                    </option>

                    <option value="COMPANY">
                        Company
                    </option>

                </select>

                <button type="submit">
                    Register
                </button>

                <p>

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;