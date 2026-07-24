import Header from "../../components/Header/Header";
//import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import Faq from "../../components/Faq/Faq";

function Landing() {

    return (
        <>
            <Header />
            
            <Hero />
            <Features />
            <About />
            <Faq />
            <Footer />
        </>
    );
}

export default Landing;