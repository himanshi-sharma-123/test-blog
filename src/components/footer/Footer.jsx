import React from "react";
import classes from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the Web</h2>
          <p>
            Designed and Improved a website specifically tailored for showcasing
            creative blogs from various users. The functionalities encompasses
            2-4 features such as update and delete blog, like and comment the
            blog.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <Link href="https://github.com/himanshi-sharma-123">Github</Link>
          <Link href="https://www.linkedin.com/in/himanshi-sharma-564548202/">
            Linkedin
          </Link>
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
