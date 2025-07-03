import { model, Schema } from "mongoose";

const MessageScheema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver : { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, trim: true },
    image: {},
  },
  { timeseries: true }
);

export const messageModel = model("Message", MessageScheema);
