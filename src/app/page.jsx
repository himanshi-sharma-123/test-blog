import Image from "next/image";
import classes from "./page.module.css";
import BlogCard from "@/components/blogCard/BlogCard";
import { blogs } from "@/lib/data";

export async function fetchBlogs() {
  const res = await fetch("https://blogs-app-web.vercel.app/api/blog", {
    cache: "no-store",
  });
  return res.json();
}
export default async function Home() {
  const blogs = await fetchBlogs();
  return (
    <div className={classes.container}>
      <div>
        <Image
          className={classes.hero}
          src="https://images.unsplash.com/photo-1444065707204-12decac917e8?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width="2000"
          height="800"
        />
      </div>
      {blogs?.length > 0 && <h2>Our Blogs</h2>}
      <div className={classes.wrapper}>
        {blogs?.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h3 className={classes.noBlogs}>No blogs are currently</h3>
        )}
      </div>
    </div>
  );
}
