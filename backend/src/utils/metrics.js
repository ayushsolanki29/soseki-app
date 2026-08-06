const Sentry = require("@sentry/node");

class MetricsService {
  /**
   * Track an event counter
   * @param {string} name - Name of the metric (e.g. 'user_registration')
   * @param {number} value - Value to increment by (default 1)
   * @param {object} tags - Optional tags for filtering (e.g. { provider: 'google' })
   */
  count(name, value = 1, tags = {}) {
    try {
      Sentry.metrics.increment(name, value, { tags });
    } catch (error) {
      // Silently fail if metrics aren't properly initialized yet
      console.warn(`[Metrics] Failed to track count for ${name}:`, error.message);
    }
  }

  /**
   * Track a gauge (a value that goes up and down over time)
   * @param {string} name - Name of the metric (e.g. 'active_users')
   * @param {number} value - The current value
   * @param {object} tags - Optional tags
   */
  gauge(name, value, tags = {}) {
    try {
      Sentry.metrics.gauge(name, value, { tags });
    } catch (error) {
      console.warn(`[Metrics] Failed to track gauge for ${name}:`, error.message);
    }
  }

  /**
   * Track a distribution (e.g. execution time, response size)
   * @param {string} name - Name of the metric (e.g. 'db_query_time')
   * @param {number} value - The value to record (e.g. milliseconds)
   * @param {object} tags - Optional tags
   */
  distribution(name, value, tags = {}) {
    try {
      Sentry.metrics.distribution(name, value, { tags });
    } catch (error) {
      console.warn(`[Metrics] Failed to track distribution for ${name}:`, error.message);
    }
  }
}

module.exports = new MetricsService();
