import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Internships.css";

function Internships() {

    const [internships, setInternships] = useState([]);

    useEffect(() => {

        api.get("/internships")
            .then(res => setInternships(res.data))
            .catch(err => console.log(err));

    }, []);
    const applyInternship = (internshipId) => {

    api.post("/applications", {
        studentId: localStorage.getItem("studentId"),
        internshipId: internshipId
    })
    .then(() => {
        alert("Application submitted successfully");
    })
    .catch(err => {
        console.log(err);
        alert("Already applied or error occurred");
    });

};

    return (

        <DashboardLayout>

            <h1>Available Internships</h1>

            <div className="internship-container">

                {
                    internships.map(i => (

    <div className="internship-card" key={i.id}>

        <h2>{i.title}</h2>

        <h4>{i.companyName}</h4>

        <p>{i.description}</p>

        <p><b>Location :</b> {i.location}</p>

        <p><b>Stipend :</b> ₹{i.stipend}</p>

        <p><b>CGPA :</b> {i.minimumCgpa}</p>

        <p><b>Duration :</b> {i.durationMonths} Months</p>

        <button
            className="apply-btn"
            onClick={() => applyInternship(i.id)}
        >
            Apply
        </button>

    </div>

))                }

            </div>

        </DashboardLayout>

    );

}

export default Internships;