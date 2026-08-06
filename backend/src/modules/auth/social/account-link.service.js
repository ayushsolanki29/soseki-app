// src/modules/auth/social/account-link.service.js
const prisma = require("../../../database/prisma");

class AccountLinkService {
  /**
   * Finds an existing auth provider link.
   */
  async findProviderLink(provider, providerUserId) {
    return await prisma.authProvider.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId
        }
      },
      include: { user: true }
    });
  }

  /**
   * Creates a new provider link for a user.
   */
  async createProviderLink(userId, profile) {
    return await prisma.authProvider.create({
      data: {
        userId,
        provider: profile.provider,
        providerUserId: profile.providerUserId,
        email: profile.email,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        linkedAt: new Date(),
        lastLoginAt: new Date()
      }
    });
  }

  /**
   * Updates the last login time for a provider.
   */
  async updateLastLogin(id) {
    await prisma.authProvider.update({
      where: { id },
      data: { lastLoginAt: new Date() }
    });
  }
}

module.exports = new AccountLinkService();
