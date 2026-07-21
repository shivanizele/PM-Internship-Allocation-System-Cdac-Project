import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./CompanyProfile.css";

function CompanyProfile() {
   // alert("CompanyProfile Loaded");

    // const companyId = localStorage.getItem("id");
    const companyId = localStorage.getItem("companyId");

    const [company, setCompany] = useState({});

//     useEffect(() => {
//     api.get(`/company/profile/${companyId}`)
//         .then((res) => {
//             console.log(res.data);
//             setCompany(res.data);
//         })
//         .catch((err) => console.log(err));
// }, [companyId]);
useEffect(() => {

    console.log("Company ID:", companyId);
    console.log("Calling:", `/company/profile/${companyId}`);

    api.get(`/company/profile/${companyId}`)
        .then((res) => {
            console.log("SUCCESS:", res.data);
            setCompany(res.data);
        })
        .catch((err) => {
            console.log("ERROR:", err.response);
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
                            value={company.companyName || ""}
                            readOnly
                        />
                    </div>

                    <div className="profile-row">
                        <label>Email</label>
                        <input
                            type="text"
                            value={company.email || ""}
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
                            value={company.address || ""}
                            readOnly
                        />
                    </div>

                    <div className="profile-row">
                        <label>Website</label>
                        <input
                            type="text"
                            value={company.website || ""}
                            readOnly
                        />
                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default CompanyProfile;