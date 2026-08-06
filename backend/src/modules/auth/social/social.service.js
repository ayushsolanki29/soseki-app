// src/modules/auth/social/social.service.js
const prisma = require("../../../database/prisma");
const sessionService = require("../session.service");
const accountLinkService = require("./account-link.service");
const providerFactory = require("../providers"); 
const metrics = require("../../../utils/metrics");

class SocialService {
  /**
   * Handles the complete social login flow.
   * @param {string} providerName - e.g., 'google'
   * @param {string} token - The token/code from the client
   * @param {Object} metadata - Optional request metadata (ipAddress, userAgent)
   */
  async login(providerName, token, metadata = {}) {
    // 1. Verify and normalize token via provider
    const provider = providerFactory.get(providerName);
    const rawProfile = await provider.verify(token);
    const profile = provider.normalizeProfile(rawProfile);

    metadata.provider = profile.provider;

    // 2. Check if this exact provider link exists (Priority 1)
    const existingLink = await accountLinkService.findProviderLink(profile.provider, profile.providerUserId);
    
    if (existingLink) {
      await accountLinkService.updateLastLogin(existingLink.id);
      metrics.count("user_login", 1, { method: "social", provider: profile.provider });
      return await sessionService.createSession(existingLink.user, metadata);
    }

    // 3. Fallback: Find user by email (Priority 2)
    let user = await prisma.user.findUnique({
      where: { email: profile.email }
    });

    if (user) {
      // Create link for existing user
      await accountLinkService.createProviderLink(user.id, profile);
      // We do not overwrite user's existing avatarUrl if they already have one
      metrics.count("user_login", 1, { method: "social", provider: profile.provider });
      return await sessionService.createSession(user, metadata);
    }

    // 4. Create new user (Priority 3)
    user = await prisma.user.create({
      data: {
        email: profile.email,
        name: profile.displayName,
        avatarUrl: profile.avatarUrl,
        emailVerified: profile.emailVerified,
        termsAcceptedAt: new Date(),
        country: metadata.country || null,
        timezone: metadata.timezone || null,
      }
    });

    await accountLinkService.createProviderLink(user.id, profile);
    
    metrics.count("user_registration", 1, { method: "social", provider: profile.provider });
    metrics.count("user_login", 1, { method: "social", provider: profile.provider });
    
    return await sessionService.createSession(user, metadata);
  }
}

module.exports = new SocialService();
