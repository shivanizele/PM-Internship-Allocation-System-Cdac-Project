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

            <div className="edit-profile-container">

                <h2>Edit Company Profile</h2>

                <form className="edit-profile-form" onSubmit={handleSubmit}>

                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={company.companyName}
                        onChange={handleChange}
                    />

                    <label>Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={company.industry}
                        onChange={handleChange}
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={company.address}
                        onChange={handleChange}
                    />

                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={company.website}
                        onChange={handleChange}
                    />

                    <div className="button-group">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/company/profile")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="update-btn"
                        >
                            Update Profile
                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default EditCompanyProfile;