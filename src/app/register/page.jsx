"use client";
import React, { useState } from "react";
import classes from "./register.module.css";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //add this line
import Link from "next/link";

const Register = () => {
  const CLOUD_NAME = "daext86rr";
  const UPLOAD_PRESET = "blog_app";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Add state for profile image

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      toast.error("Fill all the fields");
    }

    if (password.length < 6) {
      toast.error("Password must be at least of 6 characters");
      return;
    }

    try {
      const profileImage = await uploadImage();

      const res = await fetch("http://localhost:3000/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password, profileImage }),
      });

      console.log(await res.json());

      if (res.ok) {
        toast.success("Successfully registered the user");
        setTimeout(() => {
          signIn();
        }, 1500);
        return;
      } else {
        toast.error("Error occured while registering");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!profileImage) return;

    const formData = new FormData();

    formData.append("file", profileImage);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const profileImage = data["secure_url"];

      return profileImage;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="file" // Add input field for selecting profile image
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <button className={classes.submitButton}>Register</button>
          {/* <button className={classes.registerNow} onClick={() => signIn}>
            Don't have an account <br /> Register Now.
          </button> */}
          <Link className={classes.registerNow} href="/login">
            Already have an account? <br />
            Login now.
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
