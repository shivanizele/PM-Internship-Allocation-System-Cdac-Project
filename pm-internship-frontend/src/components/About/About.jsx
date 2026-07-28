import "./About.css";
import {
  FaRobot,
  FaUserGraduate,
  FaBuilding,
  FaChartLine
} from "react-icons/fa";

function About() {
  return (
    <section id="about" className="about">

      <div className="about-container">

        <h2>About Our System</h2>

        <p className="about-text">
          The <strong>AI Based Internship Allocation System</strong> is a
          smart web application that automates the internship allocation
          process by matching students with suitable internship opportunities
          using Artificial Intelligence. The system analyzes student skills,
          academic performance, preferences, and company requirements to
          ensure a fair, transparent, and efficient allocation process.
        </p>

        <div className="about-cards">

          <div className="about-card">
            <FaRobot className="about-icon" />
            <h3>AI Recommendation</h3>
            <p>
              Intelligent internship recommendations based on skills,
              CGPA, location, and interests.
            </p>
          </div>

          <div className="about-card">
            <FaUserGraduate className="about-icon" />
            <h3>For Students</h3>
            <p>
              Apply for internships, upload resumes,
              and track application status in one place.
            </p>
          </div>

          <div className="about-card">
            <FaBuilding className="about-icon" />
            <h3>For Companies</h3>
            <p>
              Post internships, shortlist suitable
              candidates, and manage applications easily.
            </p>
          </div>

          <div className="about-card">
            <FaChartLine className="about-icon" />
            <h3>For Admin</h3>
            <p>
              Monitor the complete internship allocation
              process with transparency and accuracy.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;