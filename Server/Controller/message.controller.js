import { userModel } from "../Models/user.model.js";
import { messageModel } from "./../Models/message.model.js";
import { v2 as cloudinary } from "cloudinary";

//!=============================================================================================================================================
// !====================================================  Get message User Controller ==========================================================
//* - Retrieves all users for messaging/chat
//* - Returns only essential user fields: name and image
//* - Useful for showing user list in chat sidebar or inbox UI
//* - Currently does not handle online status or last seen
//* - Can be extended later to include isOnline or last activity time
// ?============================================================================================================================================
export const allMessageUser = async ( req, res) => {
  try {
    const allMessageUser = await userModel.find({}).select("name image");

    res.status(200).json({ success: true, allMessageUser });
  } catch (error) {
    console.log("Error recent GetAllMessageUser: " + error);
  }
};
// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Send message Controller ==========================================================
//* - Retrieves all users for messaging/chat
//* - Returns only essential user fields: name and image
//* - Useful for showing user list in chat sidebar or inbox UI
//* - Currently does not handle online status or last seen
//* - Can be extended later to include isOnline or last activity time
// ?============================================================================================================================================
export const sendMessage = async ( req, res ) => {
  try {
    const receiver = req.user._id;
    const { sender, message } = req.body;
    const image = req.file;

    let imageData = { url: "", public_id: "" };
     
    if (!sender) {
        return res.status(400).json({success:false,message:"sender not find"});
    }

    // ! if image is available then get a url of image via cloudenary
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
      receiver: receiver,
      sender: sender,
      message: message,
      image: imageData,
    });

    await allmessages.save();

    res.status(200).json({ success: true, allmessages });
  } catch (error) {
    console.log("Error recent SendMessage controllre: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Send message Controller ==========================================================
//* - Retrieves all users for messaging/chat
//* - Returns only essential user fields: name and image
//* - Useful for showing user list in chat sidebar or inbox UI
//* - Currently does not handle online status or last seen
//* - Can be extended later to include isOnline or last activity time
// ?============================================================================================================================================
export const getConversationMessages  = async ( req, res ) => {
  try {
    const receiver = req.user._id;
    const {sender} = req.params;
     
    if (!receiver || !sender) {
      return res.status(400).json({success:false,message:"something went wrong"});
    }

    const allMessage = await messageModel.find({
      $or:[
        {sender:sender,receiver:receiver},
        {sender:receiver,receiver:sender},
      ]
    }).sort({ createdAt: 1 });;

    res.status(200).json({ success: true,data:allMessage});
  } catch (error) {
    console.log("Error recent getConversationMessages controllre: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// !============================================================================================================================================
// ?============================================================================================================================================
