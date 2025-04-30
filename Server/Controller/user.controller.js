//!=============================================================================================================================================
// !====================================================  Logout Controller =====================================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const userProfileController = async (req, res) => {
    try {
      const profile = req.user;  
      res.status(200).json({ success: true, profile});
    } catch (error) {
      //? Send a response with status 500 in case of error
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // !============================================================================================================================================
  // ?============================================================================================================================================