import Image from "next/image";
import classes from "./page.module.css";
import BlogCard from "@/components/blogCard/BlogCard";
import { blogs } from "@/lib/data";

export async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });
  return res.json();
}
export default async function Home() {
  const blogs = await fetchBlogs();
  return (
    <div className={classes.container}>
      <div className={classes.hero}>
        <h1 className={classes.title}>
          Photography is the beauty of life captured!!{" "}
        </h1>
        {/* <h1 className={classes.title}>
          Blogging is hard because of the grind required to stay interesting and
          relevant!!{" "}
        </h1> */}
      </div>
      <h2>Our Users Blogs</h2>
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
//   {blogs?.length > 0 && <h2>Our Users Blogs</h2>}
//   <div className={classes.wrapper}>
//     {blogs?.length > 0 ? (
//       blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
//     ) : (
//       <h3 className={classes.noBlogs}>No blogs are currently</h3>
//     )}
//   </div>
// </div>
