var admin = require("firebase-admin");

var serviceAccount = require("../../firebase-key.json");
const BUCKET = "teste-ds3-5ded5.appspot.com/";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  const imgPeq = req.files.imgPeq[0];
  const imgGrd = req.files.imgGrd[0];

  const peqFileName =
    "peq" + Date.now() + "." + imgPeq.originalname.split(".").pop();
  const grdFileName =
    "grd" + Date.now() + "." + imgGrd.originalname.split(".").pop();

  const filePeq = bucket.file(peqFileName);
  const fileGrd = bucket.file(grdFileName);

  const streamPeq = filePeq.createWriteStream({
    metadata: {
      contentType: filePeq.mimetype,
    },
  });

  const streamGrd = fileGrd.createWriteStream({
    metadata: {
      contentType: fileGrd.mimetype,
    },
  });
  streamPeq.on("error", (e) => {
    console.error(e);
  });
  streamGrd.on("error", (e) => {
    console.error(e);
  });

  streamPeq.on("finish", async () => {
    await filePeq.makePublic();
    req.imgPeq = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}o/${peqFileName}?alt=media`;
    // console.log(req.imgPeq);
    if (req.imgPeq && req.imgGrd != null) next();
  });
  streamGrd.on("finish", async () => {
    await fileGrd.makePublic();
    req.imgGrd = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}o/${grdFileName}?alt=media`;
    // console.log(req.imgGrd);
    if (req.imgPeq && req.imgGrd != null) next();
  });

  streamGrd.end(imgGrd.buffer);
  streamPeq.end(imgPeq.buffer);
};

module.exports = uploadImage;
