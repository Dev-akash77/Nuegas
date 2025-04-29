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
    image: { type: String, default: "" },
    role: { type: String, default: "employee" },
    professions: { type: String, default: "" },
    totalStar: { type: Number, default: 0 },
    tasks: [{ taskId: { type: Schema.Types.ObjectId, ref: "Task" } }],
  },
  { timestamps: true }
);

export const userModel = model("User", UserSchema);
