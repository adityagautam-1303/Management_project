import React from "react";

const Aboutus = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>About Us</p>
          <h3>Who We Are</h3>
          <p>
          At Wellness Way Hospital, compassionate patient care is at the core of our mission. Our team of experienced healthcare professionals is committed to addressing the unique needs of each patient, fostering a supportive and caring environment. We believe in promoting health and well-being through innovative medical practices, continuous learning, and community outreach programs.
          </p>
          <p>Our hospital is equipped with the latest medical technology and resources to support our dedicated staff in providing exceptional care. Whether you are seeking routine medical services or specialized treatments, Wellness Way Hospital is here to serve you with excellence and compassion. Join us in our journey to better health and well-being for all.</p>
        </div>
      </div>
    </>
  );
};

export default Aboutus;