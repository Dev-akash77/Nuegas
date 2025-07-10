import mongoose from "mongoose";
import { userModel } from "../Models/user.model.js";
import { messageModel } from "./../Models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { io, userSocketMap } from "../socket.js";

//!=============================================================================================================================================
// !====================================================  Get message User Controller ==========================================================
//* - Retrieves all users for messaging/chat
//* - Returns only essential user fields: name and image
//* - Useful for showing user list in chat sidebar or inbox UI
//* - Currently does not handle online status or last seen
//* - Can be extended later to include isOnline or last activity time
// ?============================================================================================================================================

export const allMessageUser = async (req, res) => {
  try {
    const currentUserId = new mongoose.Types.ObjectId(req.user._id);
    const users = await userModel.aggregate([
      {
        $match: { _id: { $ne: currentUserId } },
      },
      {
        $lookup: {
          from: "messages",
          let: { otherUserId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $and: [
                        { $eq: ["$sender", "$$otherUserId"] },
                        { $eq: ["$receiver", currentUserId] },
                      ],
                    },
                    {
                      $and: [
                        { $eq: ["$sender", currentUserId] },
                        { $eq: ["$receiver", "$$otherUserId"] },
                      ],
                    },
                  ],
                },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            { $project: { createdAt: 1 } },
          ],
          as: "lastMsg",
        },
      },
      {
        $addFields: {
          lastMessageTime: {
            $cond: [
              { $gt: [{ $size: "$lastMsg" }, 0] },
              { $arrayElemAt: ["$lastMsg.createdAt", 0] },
              null,
            ],
          },
        },
      },
      {
        $addFields: {
          lastMessageTimeSortable: "$lastMessageTime",
        },
      },
      {
        $sort: { lastMessageTimeSortable: -1 },
      },
      {
        $project: {
          name: 1,
          image: 1,
          lastMessageTime: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in allMessageUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Send message Controller ==========================================================
//* - Sends a message from sender to receiver
//* - Receiver is identified from the logged-in user (req.user._id)
//* - Accepts message text and optional image (handled via Cloudinary)
//* - Stores message in MongoDB with sender, receiver, text, and image URL
// ?============================================================================================================================================
export const sendMessage = async (req, res) => {
  try {
    const receiver = req.user._id;
    const { sender, message } = req.body;
    const image = req.file;

    let imageData = { url: "", public_id: "" };

    if (!sender) {
      return res
        .status(400)
        .json({ success: false, message: "sender not find" });
    }

    const receiverSocket = userSocketMap.get(receiver.toString());
    const senderSocket = userSocketMap.get(sender.toString());

    if (image && (receiverSocket || senderSocket)) {
      const tempMessage = {
        sender,
        receiver,
        message: "[Uploading Image...]",
        image: { url: "loading", public_id: "" },
        createdAt: new Date().toISOString(),
        tempId: Date.now(),
        isLoading: true,
      };

      if (receiverSocket) {
        io.to(receiverSocket).emit("sending-image", tempMessage);
      }

      if (senderSocket && receiver.toString() !== sender.toString()) {
        io.to(senderSocket).emit("sending-image", tempMessage);
      }
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
        folder: "Nugas_Message",
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const allmessages = new messageModel({
      receiver,
      sender,
      message,
      image: imageData,
    });

    await allmessages.save();

    if (receiverSocket) {
      io.to(receiverSocket).emit("new-message", allmessages);
    }

    if (senderSocket && receiver.toString() !== sender.toString()) {
      io.to(senderSocket).emit("new-message", allmessages);
    }

    res.status(200).json({ success: true, allmessages });
  } catch (error) {
    console.log("Error recent SendMessage controller: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Get Conversation Messages Controller ==================================================
//* - Retrieves all messages between two users (logged-in user and given sender)
//* - Matches both directions (sender → receiver and receiver → sender)
//* - Sorted by creation time in ascending order (oldest to newest)
//* - Used for rendering chat conversation between two users
// ?============================================================================================================================================
export const getConversationMessages = async (req, res) => {
  try {
    const receiver = req.user._id;
    const { sender } = req.params;

    if (!receiver || !sender) {
      return res
        .status(400)
        .json({ success: false, message: "something went wrong" });
    }

    const allMessage = await messageModel
      .find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: allMessage });
  } catch (error) {
    console.log("Error recent getConversationMessages controllre: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// !============================================================================================================================================
// ?============================================================================================================================================
