import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isPasswordValid, validatePassword } from "../../utils/passwordValidation";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "STUDENT"
    });
    const [errors, setErrors] = useState({});
    const passwordChecks = validatePassword(user.password);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setErrors(prev => ({
            ...prev,
            [e.target.name]: ""
        }));

    };

    const validateForm = () => {
        const nextErrors = {};

        if (!user.fullName.trim()) {
            nextErrors.fullName = "Full name is required.";
        }

        if (!user.email.trim()) {
            nextErrors.email = "Email is required.";
        } else {
            const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailPattern.test(user.email)) {
                nextErrors.email = "Please enter a valid email address.";
            }
        }

        if (!isPasswordValid(user.password)) {
            nextErrors.password = "Password must satisfy all listed requirements.";
        }

        if (user.password !== user.confirmPassword) {
            nextErrors.confirmPassword = "Confirm password must match.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const register = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            await api.post("/auth/register", user);

            alert("Registration Successful");

            navigate("/login");

        }
        catch (err) {

            console.log(err);
            setErrors({
                server: err.response?.data || "Registration Failed"
            });

        }

    };

   return (

    <div className="register-page">

        <div className="background-shape shape1"></div>
        <div className="background-shape shape2"></div>

        <div className="register-card">

            <div className="register-left">

                <h1>InternConnect</h1>

                <h3>Create Your Account</h3>

                <p>
                    Join InternConnect to explore internships,
                    manage applications and connect with top companies.
                </p>

                <div className="register-features">

                    <div className="feature">
                        🎓 Student & Company Registration
                    </div>

                    <div className="feature">
                        🤖 AI Based Internship Matching
                    </div>

                    <div className="feature">
                        🚀 Fast & Secure Platform
                    </div>

                </div>

            </div>

            <div className="register-right">

                <form
                    className="register-form"
                    onSubmit={register}
                >

                    <h2>Create Account</h2>

                    <p className="subtitle">
                        Register to continue
                    </p>

                    <div className="input-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={user.fullName}
                            onChange={handleChange}
                        />

                        {errors.fullName &&
                            <p className="field-error">
                                {errors.fullName}
                            </p>
                        }

                    </div>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={user.email}
                            onChange={handleChange}
                        />

                        {errors.email &&
                            <p className="field-error">
                                {errors.email}
                            </p>
                        }

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={user.password}
                            onChange={handleChange}
                        />

                        {errors.password &&
                            <p className="field-error">
                                {errors.password}
                            </p>
                        }

                    </div>

                    <div className="password-hints">

                        <p className={passwordChecks.minLength ? "valid" : ""}>
                            ✔ Minimum 8 characters
                        </p>

                        <p className={passwordChecks.uppercase ? "valid" : ""}>
                            ✔ One Uppercase Letter
                        </p>

                        <p className={passwordChecks.lowercase ? "valid" : ""}>
                            ✔ One Lowercase Letter
                        </p>

                        <p className={passwordChecks.digit ? "valid" : ""}>
                            ✔ One Number
                        </p>

                        <p className={passwordChecks.special ? "valid" : ""}>
                            ✔ One Special Character
                        </p>

                    </div>

                    <div className="input-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />

                        {errors.confirmPassword &&
                            <p className="field-error">
                                {errors.confirmPassword}
                            </p>
                        }

                    </div>

                    <div className="input-group">

                        <label>Register As</label>

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

                    </div>

                    {errors.server &&
                        <p className="field-error">
                            {errors.server}
                        </p>
                    }

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Create Account
                    </button>

                    <p className="login-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    </div>

);

}

export default Register;
