import { welcomeEmailTemplate } from "../Email/welcome.template.js";
import { userModel } from "../Models/user.model.js";
import { generate_jwt_token } from "../Services/jwt.service.js";
import { loginService } from "../Services/login.service.js";
import { registerService } from "../Services/register.service.js";
import { sendEmail } from "../Services/sendEmail.service.js";

//!=============================================================================================================================================
// !====================================================  Register Controller =====================================================================
//* - Handles the user registration logic
//* - Receives user data from the request body
//* - Ensures proper validation and handles OTP verification
//* - Responds with success or error messages based on the outcome
// ?============================================================================================================================================

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //? find existing user
    const userData = await userModel.findOne({ email });
    if (userData) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    } 

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Add a strong password" });
    }

    const user = await registerService({ name, email, password });

    const token = generate_jwt_token(user?.id);

    // ! sending token into cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //! 30 days expire date
    });

    // ! sending email wlcome
    await sendEmail(
      email,
      "Welcome to Nuegas",
      "Your ultimate task management app",
      welcomeEmailTemplate
    );

    res
      .status(200)
      .json({ success: true, message: "Registration Successfully" });
  } catch (error) {
    console.log("Register controller error: ", error);

    //? Send a response with status 400 in case of error
    res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Login Controller =====================================================================
//* - Handles user login logic
//* - Receives user data (email and password) from the request body
//* - Validates user existence and checks password match
//* - Responds with a JWT token on successful login, or error message on failure
// ?============================================================================================================================================

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userEmailMatch = await userModel.findOne({ email });

    if (!userEmailMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await loginService(password, userEmailMatch?.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = generate_jwt_token(userEmailMatch?.id);

    // ! sending token into cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //! 30 days expire date
    });

    res.status(200).json({ success: true, message: "Login Successfully" });
  } catch (error) {
    //? Send a response with status 500 in case of error
    res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Logout Controller =====================================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    //? Send a response with status 500 in case of error
    res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

