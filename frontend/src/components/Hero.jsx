import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Wellness Way Hospital is a state-of-the-art medical facility dedicated to providing comprehensive healthcare services. Located in a serene environment, it offers advanced medical treatments, compassionate patient care, and a wide range of specialties. Wellness Way Hospital is committed to promoting health and well-being through innovative medical practices and community outreach programs.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;