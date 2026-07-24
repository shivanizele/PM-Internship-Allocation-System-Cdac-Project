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

            <div className="profile-container">

                <h1>Company Profile</h1>

                <div className="profile-card">

                    <div className="profile-row">
                        <label>Company Name</label>
                        <input
                            type="text"
                            value={company.companyName || "Not Added"}
                            readOnly
                        />
                    </div>

                    <div className="profile-row">
                        <label>Email</label>
                        <input
                            type="text"
                            value={company.industry || "Not Added"}
                            readOnly
                        />
                    </div>

                    <div className="profile-row">
                        <label>Industry</label>
                        <input
                            type="text"
                            value={company.industry || ""}
                            readOnly
                        />
                    </div>

                    <div className="profile-row">
                        <label>Address</label>
                        <input
                            type="text"
                            value={company.address || "Not Added"}
                            readOnly
                        />
                    </div>

                    <div className="profile-row">
                        <label>Website</label>
                        <input
                            type="text"
                           value={company.website || "Not Added"}
                            readOnly
                        />
                    </div>

                </div>

                <button
                    className="btn-primary"
                    onClick={() => navigate("/company/profile/edit")}
                >
                    Edit Profile
                </button>

            </div>

        </DashboardLayout>

    );
}

export default CompanyProfile;