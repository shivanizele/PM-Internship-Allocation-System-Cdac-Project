import { useState } from "react";
import api from "../../services/api";

function StudentResume(){

    const studentId = localStorage.getItem("studentId");

    const [file,setFile]=useState();

    const upload=()=>{

        const data=new FormData();

        data.append("file",file);

        api.post(
            `/student/uploadResume/${studentId}`,
            data
        )
        .then(()=>{
            alert("Resume Uploaded");
        });

    }

    return(

        <div>

            <h2>Upload Resume</h2>

            <input
                type="file"
                onChange={(e)=>setFile(e.target.files[0])}
            />

            <button onClick={upload}>
                Upload
            </button>

        </div>

    )

}

export default StudentResume;