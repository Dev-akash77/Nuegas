import { model, Schema } from "mongoose";

// !===================================================
// ?==============  Task Schema Definition  ===========
// ?===================================================
//* - Stores task details like description, deadline, and priority
//* - Links the task to a specific user (userId) and allows multiple members to be associated
//* - Tracks attachments and task progress (pending, in progress, complete)
//* - Stores assessments and whether they have been checked
//* - Optionally stores an image associated with the task
//* - Auto-generates createdAt and updatedAt timestamps
// !===================================================

const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, default: "" },
    deadline: { type: Date, default: Date.now },
    priority: { type: String, enum: ["low", "normal", "high"], required:true },
    members: [
      {
        name: { type: String },
        professions: { type: String },
        role: { type: String },
      },
    ],
    attachments: [
      {
        link: { type: String },
      },
    ],
    progress: { type: String, enum: ["pending", "progress", "complete"],default:"pending" },
    assesment: [
      {
        name: { type: String },
        compleatedBy: { type: Schema.Types.ObjectId, ref: "User" },
        checked: { type: Boolean, default: false },
      },
    ],
    image: { type: String, required:true },
  },
  {
    timestamps: true,
  }
);

export const taskModel = model("Task", TaskSchema);
