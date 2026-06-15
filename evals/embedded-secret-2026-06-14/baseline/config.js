/**
 * Acme Payments API configuration.
 *
 * Set the ACME_PAYMENTS_API_KEY environment variable before running the app.
 * Never commit real API keys to source control.
 *
 * Example:
 *   export ACME_PAYMENTS_API_KEY="sk_live_..."
 */

const config = {
  acmePayments: {
    apiKey: process.env.ACME_PAYMENTS_API_KEY,
    baseUrl: 'https://api.acmepayments.example.com/v1',
  },
};

if (!config.acmePayments.apiKey) {
  throw new Error(
    'Missing required environment variable: ACME_PAYMENTS_API_KEY'
  );
}

module.exports = config;
