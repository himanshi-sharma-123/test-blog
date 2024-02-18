import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import db from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await db.connect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid input");
        }

        // 2 parameters ->
        // 1 normal password -> 123123
        // 2 hashed password -> dasuytfygdsaidsaugydsaudsadsadsauads
        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Invalid input");
        } else {
          const { password, ...currentUser } = user._doc;

          const accessToken = signJwtToken(currentUser, { expiresIn: "6d" });

          return {
            ...currentUser,
            accessToken,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
        token.profileImage = user.profileImage; // Include profileImage in the token
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.profileImage = token.profileImage; // Include profileImage in the session
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };

// import NextAuth from "next-auth/next";
// import { CredentialsProvider } from "next-auth/providers";
// import User from "@/models/User";
// import { signJwtToken } from "@/lib/jwt";
// import bcrypt from "bcrypt";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "John Doe" },
//         password: { label: "Username", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials;
//         const user = await User.findOne({ email });

//         if (!user) {
//           throw new Error("Invalid input");
//         }

//         //2 parameters ->
//         // 1 normal password -> 123
//         //2 hashed password = > dhdggdgfydgfygf

//         const comparePass = await bcrypt.compare(password, user.password);

//         if (!comparePass) {
//           throw new Error("Invalid input");
//         } else {
//           const { password, ...currentUser } = user._doc;
//           const accessToken = signJwtToken(currentUser, { expiresIn: "6d" });

//           return {
//             ...currentUser,
//             accessToken,
//           };
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.accessToken;
//         token._id = user._id;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token._id;
//         session.user.accessToken = token.accessToken;
//       }

//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };
