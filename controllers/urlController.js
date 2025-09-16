const path = require('path');
const ShortURL = require('../models/urlSchema');
const { getHashedBase64Value, findNextSmallestPrime } = require('../utils/helper')

// To avoid creating new short code for a URL infinitely.
const MAX_CAP = 10

// To show home page
const getHomePage = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../views/index.html');
    res.status(200).sendFile(filePath);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// To generate short code for URL
const generateNewShortenUrl = async (req, res) => {
  try {
    const { url } = req.body;

    // If shorturl code exist and maps to same url return that code
    const isPresent = await ShortURL.findOne({ longUrl: url });
    if (isPresent) {
      return res.status(200).json({ shortCode: isPresent.shortCode, message: "this url with the code already exist" });
    }

    const totalDocs = await ShortURL.countDocuments();

    let smallestPrime = await findNextSmallestPrime(totalDocs);
    let shortUrlCode = await getHashedBase64Value(url, smallestPrime);

    // To check if there is no docs inside db so we don't want to aware about duplication else calculate it.
    let shortCode;
    if (totalDocs < 1) {
      const data = await ShortURL.create({
        longUrl: url,
        shortCode: shortUrlCode,
        createdAt: Date.now()
      })
      shortCode = data.shortCode;
    } else {
      const doc = await ShortURL.find({ shortCode: shortUrlCode });
      if (doc) {
        let isDuplicate = true;
        for (let j = 0; j <= MAX_CAP; j++) {
          smallestPrime = await findNextSmallestPrime(smallestPrime);
          shortUrlCode = await getHashedBase64Value(url, smallestPrime);
          const isExist = await ShortURL.findOne({ shortCode: shortUrlCode });
          if (isExist) {
            continue;
          } else {
            isDuplicate = false;
            break;
          }
        }
        // Return if the max cap limit exeeded to find a unique short code for the URL
        if (isDuplicate) {
          return res.status(429).json({ message: "Cannot find short code for this URL. Please try with another one" });
        }
      }
      const data = await ShortURL.create({
        longUrl: url,
        shortCode: shortUrlCode,
        createdAt: Date.now()
      });
      shortCode = data.shortCode;
    }
    res.status(201).json({ shortCode, message: "New url shortcode created successfully for you" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// To redirect the user with short code of the URL
const redirectToUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const doc = await ShortURL.findOne({ shortCode });
    if (doc) {
      return res.redirect(doc.longUrl);
    } else {
      return res.status(404).json({ message: "Can't redirect to URL based on on your short code", url: 'localhost://5001' });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getHomePage,
  generateNewShortenUrl,
  redirectToUrl
};

