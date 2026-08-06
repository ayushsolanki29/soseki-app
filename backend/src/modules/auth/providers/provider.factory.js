// src/modules/auth/providers/provider.factory.js
class ProviderFactory {
  constructor() {
    this.providers = new Map();
  }

  register(providerName, ProviderClass) {
    this.providers.set(providerName.toUpperCase(), new ProviderClass());
  }

  get(providerName) {
    const provider = this.providers.get(providerName.toUpperCase());
    if (!provider) {
      throw Object.assign(new Error(`Authentication provider '${providerName}' is not supported.`), { status: 400 });
    }
    return provider;
  }
}

module.exports = new ProviderFactory();
