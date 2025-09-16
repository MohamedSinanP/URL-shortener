const crypto = require('crypto');


async function findNextSmallestPrime(n) {
  const l = n + 1;
  if (l <= 2) return 2;
  let isPrime;
  for (let i = l; i < Infinity; i++) {
    isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      return i;
    }
  }
}

async function getHashedBase64Value(url, length) {
  const urlHash = crypto.createHash('sha256').update(url).digest('hex');
  const base64HashValue = btoa(urlHash);
  const shortUrlCode = base64HashValue.slice(0, length);
  return shortUrlCode;
}

module.exports = {
  findNextSmallestPrime,
  getHashedBase64Value
}