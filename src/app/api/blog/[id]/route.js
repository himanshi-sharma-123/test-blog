import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const blog = await Blog.findById(id)
      .populate("authorId")
      .select("-password"); //.select("-password"): This part of the code specifies that the password field should be excluded from the returned document. The -password argument to the select() method indicates that the password field should be excluded. This is a common practice for security reasons, as passwords should not be exposed in API responses.

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req, ctx) {
  await db.connect();

  const id = ctx.params.id;
  const accessToken = req.headers.get("authorization");
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
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      // blog?.authorId?._id.toString(): This part accesses the _id field of the authorId object within the blog object. The ?. and ? syntax are optional chaining operators, ensuring that if either blog or authorId is null or undefined, the code won't throw an error. The toString() method converts the _id value to a string.

      //       // decodedToken._id.toString(): This part accesses the _id field of the decodedToken object. The _id is assumed to be stored as a string. This is typically the user ID extracted from a JWT (JSON Web Token) after it has been decoded. It's used to identify the currently logged-in user.
      return new Response(
        JSON.stringify({ msg: "Only author can update his blog" }),
        { status: 403 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      //       //const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: { ...body } }, { new: true }): This line performs the update operation. It finds a document in the Blog collection with the given _id (id) and updates it with the data specified in the body object. The body object likely contains the updated fields and their new values. The $set operator is used to specify the fields to update and their new values.

      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const blog = await Blog.findById(id).populate("authorId");
    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ msg: "Only author can delete his blog" }),
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Successfully deleted blog" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

// import db from "@/lib/db";
// import { verifyJwtToken } from "@/lib/jwt";
// import Blog from "@/models/Blog";
// import User from "@/models/User";

// export async function GET(req, ctx) {
//   await db.connect();
//   const id = ctx.params.id;
//   try {
//     const blog = await Blog.findById(id)
//       .populate("authorId")
//       .select("-password"); //.select("-password"): This part of the code specifies that the password field should be excluded from the returned document. The -password argument to the select() method indicates that the password field should be excluded. This is a common practice for security reasons, as passwords should not be exposed in API responses.
//     return new Response(JSON.stringify(blog), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }

// export async function PUT(req, ctx) {
//   const id = ctx.params.id;

//   await db.connect();
//   const accessToken = req.headers.get("authorization");
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
//     const blog = await Blog.findById(id).populate("authorId");

//     if (blog?.authorId?._id.toString() != decodedToken._id.toString()) {
//       // blog?.authorId?._id.toString(): This part accesses the _id field of the authorId object within the blog object. The ?. and ? syntax are optional chaining operators, ensuring that if either blog or authorId is null or undefined, the code won't throw an error. The toString() method converts the _id value to a string.

//       // decodedToken._id.toString(): This part accesses the _id field of the decodedToken object. The _id is assumed to be stored as a string. This is typically the user ID extracted from a JWT (JSON Web Token) after it has been decoded. It's used to identify the currently logged-in user.
//       return new Response(
//         JSON.stringify({ msg: "Only author can update his/her blog" }),
//         { status: 500 }
//       );
//     }
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       //const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: { ...body } }, { new: true }): This line performs the update operation. It finds a document in the Blog collection with the given _id (id) and updates it with the data specified in the body object. The body object likely contains the updated fields and their new values. The $set operator is used to specify the fields to update and their new values.
//       id,
//       { $set: { ...body } },
//       { new: true }
//     );
//     return new Response(JSON.stringify(updatedBlog), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }

// export async function DELETE(req, ctx) {
//   await db.connect();
//   const id = ctx.params.id;
//   const accessToken = req.headers.get("authorization");
//   const token = accessToken.split(" ")[1];

//   const decodedToken = verifyJwtToken(token);

//   if (!accessToken || !decodedToken) {
//     return new Response(
//       JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
//       { status: 403 }
//     );
//   }

//   try {
//     const blog = await Blog.findById(id).populate("authorId");
//     if (blog?.authorId?._id.toString() != decodedToken._id.toString()) {
//       return new Response(
//         JSON.stringify({ msg: "Only author can deleted his/her blog" }),
//         { status: 500 }
//       );
//     }
//     await Blog.findByIdAndDelete(id);
//     return new Response(JSON.stringify({ msg: "Successfully deleted blog" }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }
