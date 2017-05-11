const s3 = require('./s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid');

//for S3 storage remove 'image/' from front of image, then hash the image name.
//whitelist onle png, jpeg and gif file types.
module.exports = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'wdildnproject2',
    key(req, file, next) {
      const ext = file.mimetype.replace('image/', '');
      next(null, `${uuid.v4()}.${ext}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
  fileFilter(req, file, next) {
    const whitelist = ['image/png', 'image/jpeg', 'image/gif'];
    next(null, whitelist.includes(file.mimetype));
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});
