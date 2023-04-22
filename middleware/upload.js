const multer = require('multer');
const { STATIC_PATH } = require('../constants');

const upload = multer({ dest: STATIC_PATH });

module.exports.uploadUserPhoto = upload.single('userPhoto');
