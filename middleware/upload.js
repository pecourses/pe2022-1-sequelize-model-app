const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

// gif, jpeg, png
function fileFilter (req, file, cb) {
  // if (file.mimetype === 'image/gif' ||file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png')
  const MIMETYPE_REGEXP = /^image\/(gif|jpeg|png)$/;
  cb(null, MIMETYPE_REGEXP.test(file.mimetype));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadUserPhoto = upload.single('userPhoto');
