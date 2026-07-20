import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";

function Landing() {

    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <About />
            <Footer />
        </>
    );
}

export default Landing;