export const adminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    // ! check user is employee then dont dont have any access
    if (user.role === "employee") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Forbidden: You do not have access to this resource",
        });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
