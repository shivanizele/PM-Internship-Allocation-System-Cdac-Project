import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
// import api from "../../services/api";
import "./Students.css";
import api, { openResume } from "../../services/api";

function Students() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        api.get("/admin/students")
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    };

    const deleteStudent = (id) => {

        if (!window.confirm("Delete this student?"))
            return;

        api.delete(`/admin/students/${id}`)
            .then(() => loadStudents());
    };

    return (

        <DashboardLayout>

            <h1>Students</h1>

            <input
                className="search-box"
                placeholder="Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="student-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>College</th>
                        <th>Branch</th>
                        <th>CGPA</th>
                        <th>Location</th>
                        <th>Resume</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        students
                            .filter(s =>
                                s.fullName.toLowerCase().includes(search.toLowerCase())
                            )
                            .map(student => (

                                <tr key={student.id}>

                                    <td>{student.fullName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.collegeName}</td>
                                    <td>{student.branch}</td>
                                    <td>{student.cgpa}</td>
                                    <td>{student.location}</td>

                                    <td>

                                  {student.resume ? (

                                //   <a
                                //    href={`http://localhost:8080/api/resume/${student.resume}`}
                                //    target="_blank"
                                //    rel="noreferrer"
                                //    className="resume-btn" onClick={() => openResume(student.resume).catch(() => console.log("Unable to open resume."))}>
                                //    View Resume
                                //   </a>
                                <button className="resume-btn" onClick={() => openResume(student.resume).catch(() => console.log("Unable to open resume."))}>View Resume</button>
                                ) : (

                               <span>No Resume</span>

                               )}

                            </td>

<td>

    <button
        className="delete-btn"
        onClick={() => deleteStudent(student.id)}
    >
        Delete
    </button>

</td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </DashboardLayout>

    );
}

export default Students;