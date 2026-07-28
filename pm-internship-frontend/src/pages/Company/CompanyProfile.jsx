import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./CompanyProfile.css";

function CompanyProfile() {

    const companyId = localStorage.getItem("companyId");
    const navigate = useNavigate();

    const [company, setCompany] = useState({});

    useEffect(() => {

        api.get(`/company/profile/${companyId}`)
            .then((res) => {
                console.log(res.data);
                setCompany(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [companyId]);

   return (

    <DashboardLayout>

        <div className="company-profile-page">

            {/* Header */}

            <div className="company-header">

                <div>

                    <h1>🏢 Company Profile</h1>

                    <p>
                        View and manage your company information.
                    </p>

                </div>

                <button
                    className="edit-profile-btn"
                    onClick={() => navigate("/company/profile/edit")}
                >
                    ✏ Edit Profile
                </button>

            </div>

            {/* Company Information */}

            <div className="company-card">

                <h2>Company Information</h2>

                <div className="company-grid">

                    <div className="company-item">
                        <label>Company Name</label>
                        <span>{company.companyName || "Not Added"}</span>
                    </div>

                    <div className="company-item">
                        <label>Email</label>
                        <span>{company.email || "Not Added"}</span>
                    </div>

                    <div className="company-item">
                        <label>Industry</label>
                        <span>{company.industry || "Not Added"}</span>
                    </div>

                    <div className="company-item">
                        <label>Website</label>

                        {company.website ? (

                            <a
                                href={company.website}
                                target="_blank"
                                rel="noreferrer"
                                className="website-link"
                            >
                                {company.website}
                            </a>

                        ) : (

                            <span>Not Added</span>

                        )}

                    </div>

                    <div className="company-item full-width">
                        <label>Company Address</label>
                        <span>{company.address || "Not Added"}</span>
                    </div>

                </div>

            </div>

        </div>

    </DashboardLayout>

);
}

export default CompanyProfile;