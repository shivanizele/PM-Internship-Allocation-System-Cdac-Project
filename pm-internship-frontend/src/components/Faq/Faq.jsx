import "./Faq.css";

function Faq() {

    return (

        <section id="faq" className="faq">

            <h2>Frequently Asked Questions</h2>

            <div className="faq-item">
                <h4>Who can apply for internships?</h4>
                <p>Any registered student with a completed profile can apply.</p>
            </div>

            <div className="faq-item">
                <h4>How are internships recommended?</h4>
                <p>The AI compares student skills, CGPA and location with internship requirements.</p>
            </div>

            <div className="faq-item">
                <h4>Can I update my resume?</h4>
                <p>Yes. Students can upload a new resume anytime.</p>
            </div>

        </section>

    );

}

export default Faq;