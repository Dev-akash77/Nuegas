import { userModel } from "../Models/user.model.js";
import bcrypt from "bcryptjs";


//!=============================================================================================================================================
// !==============  Register Services ========================================================================================================
//* - Handles user registration logic
//* - Hashes the user's password securely
//* - Saves the new user to the database
//* - Includes proper error handling
// ?============================================================================================================================================

export const registerService = async ({ name, email, password }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return createdUser;


  } catch (error) {
    console.log("Register Services error: ", error);
  }
};

// !============================================================================================================================================
// !============================================================================================================================================
