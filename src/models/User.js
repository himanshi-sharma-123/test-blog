import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, // Assuming the profile image will be stored as a URL
      default: "", // You can set a default image if needed
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.User || mongoose.model("User", UserSchema);
