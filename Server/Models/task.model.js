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
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    heading: { type: String, required: true },
    deadline: { type: Date, default: Date.now },
    priority: { type: String, enum: ["low", "normal", "high"], required: true },
    members: [
      {
        name: { type: String }, 
        professions: { type: String },
        email: { type: String },
        image: { type: String },
        role: { type: String },
        id: { type: String },
      },
    ],
    attachments: [
      {
        link: { type: String },
      },
    ],
    progress: {
      type: String,
      enum: ["pending", "progress", "complete"],
      default: "pending",
    },
    assesment: [
      {
        name: { type: String, required: true },
        compleatedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        checked: { type: Boolean, default: false },
      },
    ],
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const taskModel = model("Task", TaskSchema);
