const authService = require("./auth.service");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      // Set cookies
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      };

      res.cookie("accessToken", result.accessToken, cookieOptions);
      res.cookie("refreshToken", result.refreshToken, cookieOptions);

      return res.status(200).json({
        success: true,
        user: result.user,
      });
    } catch (error) {
      if (error.status === 401) {
        return res.status(401).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      // req.user is populated by authMiddleware
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkEmail(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.checkEmail(email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
