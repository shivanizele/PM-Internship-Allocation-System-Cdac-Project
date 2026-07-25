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
                {errors.fullName && <p className="field-error">{errors.fullName}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="field-error">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p className="field-error">{errors.password}</p>}

                <div className="password-hints">
                    <p className={passwordChecks.minLength ? "valid" : ""}>Minimum 8 characters</p>
                    <p className={passwordChecks.uppercase ? "valid" : ""}>At least one uppercase letter</p>
                    <p className={passwordChecks.lowercase ? "valid" : ""}>At least one lowercase letter</p>
                    <p className={passwordChecks.digit ? "valid" : ""}>At least one digit</p>
                    <p className={passwordChecks.special ? "valid" : ""}>At least one special character</p>
                </div>

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}

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

                {errors.server && <p className="field-error">{errors.server}</p>}

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
