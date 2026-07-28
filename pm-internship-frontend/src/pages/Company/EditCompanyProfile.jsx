import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./EditCompanyProfile.css";

function EditCompanyProfile() {

    const companyId = localStorage.getItem("companyId");

    const navigate = useNavigate();

    const [company, setCompany] = useState({
        companyName: "",
        industry: "",
        address: "",
        website: ""
    });
    const isFirstTime =
    !company.companyName &&
    !company.industry &&
    !company.address &&
    !company.website;

    useEffect(() => {

        api.get(`/company/profile/${companyId}`)
            .then(res => setCompany(res.data))
            .catch(err => console.log(err));

    }, [companyId]);

    const handleChange = (e) => {

        setCompany({
            ...company,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        api.put(`/company/profile/${companyId}`, company)
            .then(() => {

                alert("Company Profile Updated Successfully");

                navigate("/company/profile");

            })
            .catch(err => {
                console.log(err);
                alert("Unable to update profile");
            });

    };

   return (

    <DashboardLayout>

        <div className="company-edit-page">

            <div className="page-header">

                <div>

                    <h1>
                        {isFirstTime
                            ? "🏢 Complete Company Profile"
                            : "🏢 Edit Company Profile"}
                    </h1>

                    <p>
                        Keep your company details updated so students can
                        discover and apply for your internship opportunities.
                    </p>

                </div>

            </div>

            {isFirstTime && (

                <div className="welcome-card">

                    <h3>✨ Welcome to InternConnect</h3>

                    <p>
                        Please complete your company profile before posting
                        internships. A complete profile helps students know
                        more about your organization.
                    </p>

                </div>

            )}

            <div className="profile-card">

                <form
                    className="company-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Company Name</label>

                            <input
                                type="text"
                                name="companyName"
                                placeholder="Google Pvt Ltd"
                                value={company.companyName || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Industry</label>

                            <input
                                type="text"
                                name="industry"
                                placeholder="Software Development"
                                value={company.industry || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Company Address</label>

                            <input
                                type="text"
                                name="address"
                                placeholder="Pune, Maharashtra"
                                value={company.address || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Website</label>

                            <input
                                type="text"
                                name="website"
                                placeholder="https://company.com"
                                value={company.website || ""}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="button-group">

                        {!isFirstTime && (

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/company/profile")}
                            >
                                Cancel
                            </button>

                        )}

                        <button
                            type="submit"
                            className="update-btn"
                        >

                            {isFirstTime
                                ? "Complete Profile"
                                : "Update Profile"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    </DashboardLayout>

);
}

export default EditCompanyProfile;