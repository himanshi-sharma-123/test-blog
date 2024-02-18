// http://localhost:3000/api/blog

//files inside must be named as route.js
// http://localhost:3000/api/blog/someId

import db from "@/lib/db";
import { verifyJwtToken, verifyToken } from "@/lib/jwt";
import Blog from "@/models/Blog";

export async function GET(req) {
  await db.connect();

  try {
    const blogs = await Blog.find({}).limit(16).populate("authorId"); //.limit(16): This method is limiting the number of documents returned by the query to 16. This means that even if there are more than 16 documents in the Blog collection that match the query criteria, only the first 16 documents will be returned.
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await db.connect();

  //[Bearer toeknjfjdfjhf]

  const accessToken = req.headers.get("authorization"); //in nodejs -> req.headers.authorization
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);

    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
// import db from "@/lib/db";
// import { verifyToken } from "@lib/jwt";
// import Blog from "@/models/Blog";
// import { verifyJwtToken } from "@/lib/jwt";

// export async function GET(req) {
//   await db.connect();
//   try {
//     const blogs = await Blog.find({}).limit(16).populate("authorId"); //.limit(16): This method is limiting the number of documents returned by the query to 16. This means that even if there are more than 16 documents in the Blog collection that match the query criteria, only the first 16 documents will be returned.
//     return new Response(JSON.stringify(blogs), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }

// export async function POST(req) {
//   await db.connect();

//   //[Bearer toeknjfjdfjhf]
//   const accessToken = req.headers.get("authorization"); //in nodejs -> req.headers.authorization
//   const token = accessToken.split(" ")[1];

//   const decodedToken = verifyJwtToken(token);
//   if (!accessToken || !decodedToken) {
//     return new Response(
//       JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
//       { status: 403 }
//     );
//   }
//   try {
//     const body = await req.json();
//     const newBlog = await Blog.create(body);
//     return new Response(JSON.stringify(newBlog), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }
