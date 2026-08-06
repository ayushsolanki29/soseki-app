// src/modules/auth/providers/google.provider.js
const { OAuth2Client } = require("google-auth-library");
const BaseProvider = require("./base.provider");

class GoogleProvider extends BaseProvider {
  constructor() {
    super();
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  getProvider() {
    return "GOOGLE";
  }

  async verify(token) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      console.error("[GoogleProvider] Token verification failed:", error);
      throw Object.assign(new Error("Invalid Google token"), { status: 401 });
    }
  }

  normalizeProfile(rawProfile) {
    const { email, name, email_verified, picture, sub } = rawProfile;
    
    if (!email_verified) {
      throw Object.assign(new Error("Google email is not verified"), { status: 400 });
    }

    return {
      provider: this.getProvider(),
      providerUserId: sub,
      email: email.trim().toLowerCase(),
      emailVerified: email_verified,
      displayName: name || null,
      avatarUrl: picture || null,
    };
  }
}

module.exports = GoogleProvider;
