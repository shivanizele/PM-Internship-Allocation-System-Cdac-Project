import "./Features.css";
import { FaRobot, FaUserGraduate, FaBuilding } from "react-icons/fa";

function Features(){

return(

<section id="features" className="features">

<h2>Why Choose Us?</h2>

<div className="feature-container">

<div className="card">

<FaRobot size={45}/>

<h3>AI Recommendation</h3>

<p>Smart internship matching using skills, CGPA and location.</p>

</div>

<div className="card">

<FaUserGraduate size={45}/>

<h3>Student Portal</h3>

<p>Easy internship search and application.</p>

</div>

<div className="card">

<FaBuilding size={45}/>

<h3>Company Portal</h3>

<p>Create and manage internships efficiently.</p>

</div>

</div>

</section>

)

}

export default Features;