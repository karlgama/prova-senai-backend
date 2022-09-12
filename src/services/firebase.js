var admin = require("firebase-admin");

var serviceAccount = require("../../firebase-key.json");
const BUCKET = "teste-ds3-5ded5.appspot.com/";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  const img = req.file;
  const fileName = Date.now() + "." + img.originalname.split(".").pop();
  console.log(fileName);
  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: img.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();
    req.imgPeq = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}o/${fileName}?alt=media`;
    return next();
  });

  stream.end(img.buffer);
};

module.exports = uploadImage;
