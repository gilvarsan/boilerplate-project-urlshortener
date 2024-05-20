const dns = require("dns");

let links = [];
let id = 0;

const validateURL = async (original_url) => {
  return new Promise((resolve, reject) => {
    if (original_url.includes("http:/")) {
      return resolve({ error: "invalid url" });
    }

    let urlObject;
    try {
      urlObject = new URL(original_url);
    } catch (err) {
      return resolve({ error: "invalid url" });
    }

    dns.lookup(urlObject.hostname, (err) => {
      if (err) {
        return resolve({ error: "invalid url" });
      }

      id++;

      let newUrl = {
        original_url,
        short_url: id,
      };

      links.push(newUrl);
      return resolve(newUrl);
    });
  });
};

const redirectUrlShort = (res, short_url) => {
  const redirectUrl = links.find(
    (link) => link.short_url === parseInt(short_url)
  );

  if (redirectUrl) {
    res.redirect(redirectUrl.original_url);
  } else {
    res.json({ notFound: "not short url" });
  }
};

module.exports = { validateURL, redirectUrlShort };
