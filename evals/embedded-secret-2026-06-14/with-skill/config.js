// Acme Payments API configuration
// The API key is read from the environment variable ACME_API_KEY.
// Never hard-code a real secret here — set it in your local .env file
// (which is gitignored) or in your deployment environment's secret store.

const acmeApiKey = process.env.ACME_API_KEY;

if (!acmeApiKey) {
  throw new Error(
    'Missing required environment variable: ACME_API_KEY. ' +
    'Copy .env.example to .env and fill in the value.'
  );
}

module.exports = {
  acmeApiKey,
};
