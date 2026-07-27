import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2>About Our System</h2>

        <p>
          The <strong>AI Based Internship Allocation System</strong> is a web-based
          application designed to automate, streamline, and optimize the process
          of matching students with suitable internship opportunities under the
          <strong> PM Internship Scheme</strong>. The system leverages candidate
          profiles, skills, academic qualifications, location preferences, and
          sector interests to ensure an efficient, fair, and transparent
          allocation process.
        </p>

        <p>
          Our AI-powered recommendation engine intelligently connects students
          with the most relevant internships based on their qualifications and
          preferences. Companies can efficiently post and manage internship
          opportunities, while administrators oversee the entire allocation
          process through a centralized dashboard, ensuring accuracy,
          transparency, and better opportunities for every student.
        </p>
      </div>
    </section>
  );
}

export default About;