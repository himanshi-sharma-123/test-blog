import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the app</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            sapiente minima in, aperiam ratione laboriosam quasi perferendis
            harum, voluptas, voluptate pariatur illum accusantium. Maiores
            perspiciatis distinctio quos, impedit eveniet repudiandae.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contants</h2>
          <span>Phone +123456</span>
          <span>Github</span>
          <span>Linkedin</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: New Delhi</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
