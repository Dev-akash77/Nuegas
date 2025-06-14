import { model, Schema } from "mongoose";

// !===================================================
// ?==============  User Schema Definition  ===========
// ?===================================================
//* - Stores user personal and authentication details
//* - Handles OTP verification and expiry
//* - Links users to multiple tasks
//* - Auto-generates createdAt and updatedAt timestamps
// !===================================================

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, default: "0000000000" },
    otp: { type: String, default: "" },
    otpEXP: { type: Date, default: null },
    image: { type: String, default: "https://res.cloudinary.com/dekfjauox/image/upload/v1749918435/Nuegas_Profile/a7jflsgm1htx635d9yek.png" },
    role: { type: String, default: "employee" },
    professions: { type: String, default: "" },
    totalStar: { type: Number, default: 0 },
    tasks: [],
  },
  { timestamps: true }
);

export const userModel = model("User", UserSchema);
