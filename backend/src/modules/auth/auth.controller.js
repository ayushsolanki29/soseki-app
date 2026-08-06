const authService = require("./auth.service");
const socialService = require("./social/social.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, termsAccepted, country, timezone } = req.body;
      const result = await authService.register(name, email, password, termsAccepted, country, timezone);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("accessToken", result.accessToken, cookieOptions);
      res.cookie("refreshToken", result.refreshToken, cookieOptions);

      return res.status(201).json({
        success: true,
        user: result.user,
      });
    } catch (error) {
      if (error.status === 400) {
        return res.status(400).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, termsAccepted } = req.body;
      const result = await authService.login(email, password, termsAccepted);

      // Set cookies
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
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

  async socialLogin(req, res, next) {
    try {
      const { provider } = req.params;
      const { idToken, country, timezone } = req.body;
      
      const metadata = {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        country: country || null,
        timezone: timezone || null,
      };

      const result = await socialService.login(provider, idToken, metadata);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("accessToken", result.accessToken, cookieOptions);
      res.cookie("refreshToken", result.refreshToken, cookieOptions);

      return res.status(200).json({
        success: true,
        user: result.user,
      });
    } catch (error) {
      if (error.status === 400 || error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ success: false, message: "Email is required" });
      await authService.forgotPassword(email);
      res.status(200).json({ success: true, message: "If that email exists, we have sent a reset code." });
    } catch (error) {
      next(error);
    }
  }

  async verifyResetOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });
      await authService.verifyResetOtp(email, otp);
      res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
      if (error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: "Email, OTP, and new password are required" });
      await authService.resetPassword(email, otp, newPassword);
      res.status(200).json({ success: true, message: "Password reset successfully. You can now log in." });
    } catch (error) {
      if (error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      await authService.logout(refreshToken);
      
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
      };

      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const result = await authService.refresh(refreshToken);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("accessToken", result.accessToken, cookieOptions);
      return res.status(200).json({ success: true, accessToken: result.accessToken });
    } catch (error) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      if (error.status === 401) {
        return res.status(401).json({ success: false, message: error.message });
      }
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

  async verifyEmail(req, res, next) {
    try {
      const { otp } = req.body;
      const userId = req.user.id;
      
      if (!otp) {
        return res.status(400).json({ success: false, message: "OTP is required" });
      }

      await authService.verifyEmail(userId, otp);
      
      // Update JWT payload with new emailVerified status
      // Generate new token to reflect updated status
      const payload = {
        userId: req.user.id,
        email: req.user.email,
        name: req.user.name,
        hasOrg: !!req.user.organizationId,
        organizationId: req.user.organizationId || null,
        emailVerified: true,
      };
      const { auth: authConfig } = require("../../config/app.config");
      const jwt = require("jsonwebtoken");
      const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });
      
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("accessToken", accessToken, cookieOptions);

      return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      if (error.status === 400 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async resendVerification(req, res, next) {
    try {
      const userId = req.user.id;
      await authService.resendVerification(userId);
      return res.status(200).json({ success: true, message: "Verification code sent" });
    } catch (error) {
      if (error.status === 400 || error.status === 404 || error.status === 429) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new AuthController();
