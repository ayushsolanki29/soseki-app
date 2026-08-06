// src/modules/auth/providers/base.provider.js
class BaseProvider {
  /**
   * Returns the provider type string (e.g., 'GOOGLE', 'GITHUB')
   * @returns {string}
   */
  getProvider() {
    throw new Error("Method 'getProvider()' must be implemented.");
  }

  /**
   * Verifies the token/code with the provider.
   * @param {string} token 
   * @returns {Promise<any>} Raw provider profile
   */
  async verify(token) {
    throw new Error("Method 'verify()' must be implemented.");
  }

  /**
   * Normalizes the raw provider profile into a standard format.
   * @param {any} rawProfile 
   * @returns {{ provider: string, providerUserId: string, email: string, emailVerified: boolean, displayName: string, avatarUrl: string }}
   */
  normalizeProfile(rawProfile) {
    throw new Error("Method 'normalizeProfile()' must be implemented.");
  }
}

module.exports = BaseProvider;
