import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import heroImage from "../../assets/images/hero.svg";

<div className="hero-right">
    <img src={heroImage} alt="AI Internship Allocation" />
</div>

function Landing(){

return(

<>

<Navbar/>

<Hero/>

<Features/>

<About/>

<Footer/>

</>

)

}

export default Landing;