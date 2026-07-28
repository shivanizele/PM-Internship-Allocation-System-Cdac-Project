import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/images/mainlogo.jpeg";

function Hero() {

    return (

        <section className="hero" id="home">

            <div className="hero-left">

                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    AI Based Internship Allocation System
                </motion.h1>

                <p>
                    Find the best internship opportunities using Artificial Intelligence.
                </p>

                <Link to="/login" className="hero-btn">
                    Get Started
                </Link>

            </div>

            <div className="hero-right">

                <div className="logo-circle">

                    <img
                        src={logo}
                        alt="InterConnect Logo"
                        className="hero-logo"
                    />

                </div>

            </div>

        </section>

    );

}

export default Hero;