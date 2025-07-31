// lambda_proxy_paapi5.js
// This AWS Lambda function acts as a proxy to sign and call the Amazon PA-API 5.0.
// Credentials are loaded from environment variables for security.
const https = require('https');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { Sha256 } = require('@aws-crypto/sha256-js');

const ACCESS_KEY = process.env.AMAZON_PAAPI_ACCESS_KEY;
const SECRET_KEY = process.env.AMAZON_PAAPI_SECRET_KEY;

exports.handler = async (event) => {
  // Expected event format: { operation: 'SearchItems'|'GetItems', payload: {...} }
  const { operation, payload } = event;

  const signer = new SignatureV4({
    credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
    region: 'us-east-1',
    service: 'ProductAdvertisingAPI',
    sha256: Sha256,
  });

  const apiPath = `/paapi5/${operation.toLowerCase()}`;
  const amzTarget = `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`;

  const request = new HttpRequest({
    hostname: 'webservices.amazon.com.br',
    path: apiPath,
    method: 'POST',
    headers: {
      host: 'webservices.amazon.com.br',
      'content-type': 'application/json; charset=utf-8',
      'content-encoding': 'amz-1.0',
      'x-amz-target': amzTarget,
    },
    body: JSON.stringify(payload),
  });

  const signed = await signer.sign(request);

  return new Promise((resolve, reject) => {
    const req = https.request(signed, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          reject({ statusCode: 500, body: e.message });
        }
      });
    });

    req.on('error', (err) => {
      reject({ statusCode: 500, body: err.message });
    });

    req.write(signed.body);
    req.end();
  });
};
