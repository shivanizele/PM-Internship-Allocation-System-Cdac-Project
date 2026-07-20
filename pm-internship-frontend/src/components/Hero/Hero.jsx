import "./Hero.css";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero.svg";
function Hero(){

return(

<section className="hero">

<div className="hero-left">

<motion.h1

initial={{opacity:0,y:-40}}

animate={{opacity:1,y:0}}

transition={{duration:.8}}

>

AI Based Internship Allocation System

</motion.h1>

<p>

Find the best internship using Artificial Intelligence.

</p>

<button>

Get Started

</button>

</div>

<div className="hero-right">

<img
src={heroImage}
alt="AI Internship"
/>

</div>

</section>

)

}

export default Hero;