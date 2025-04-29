import bcrypt from "bcryptjs";

//!=============================================================================================================================================
// !=========================== Login Service =================================================================================================
//* - Handles user login logic
//* - Compares entered password with the hashed password stored in database
//* - Returns true if passwords match, otherwise false
//* - Includes proper error handling
// ?============================================================================================================================================

export const loginService = async (password,matchPassword) => {
  try {

    const isMatch = await bcrypt.compare(password,matchPassword);
    return isMatch

  } catch (error) {
    console.log("Register Services error: ", error);
  }
};

// !============================================================================================================================================
// !============================================================================================================================================
