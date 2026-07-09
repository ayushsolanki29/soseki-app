const usersService = require("./users.service");

class UsersController {
  async getProfile(req, res, next) {
    try {
      const user = await usersService.getProfile(req.user.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const updatedUser = await usersService.updateProfile(req.user.id, req.body);
      return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      await usersService.updatePassword(req.user.id, currentPassword, newPassword);
      return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
