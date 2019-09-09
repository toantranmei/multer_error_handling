let MIME_TYPE_MAP;
const uploadFile = require("multer");
const RAND = require("randomstring");
const storage = (path, type) => {
  return uploadFile.diskStorage({
    destination: (req, file, cb) => {
      let error = {"code": "INVALID_FILE"};
      if (type === undefined) {
        MIME_TYPE_MAP = {
          'image/png': 'png',
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg'
        };
      } else {
        MIME_TYPE_MAP = type;
      }

      if (file) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        if (isValid) {
          error = null
        }
      }
      cb(error, path)
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${Date.now()}-${RAND.generate(16)}` + '.' + ext)
    }
  });
};

module.exports = {
  "single": (path, props, size, type) => {
    return (req, res, next) => {
      uploadFile({ storage: storage(path, type), limits: { fileSize: 1024 * 1024 * size } }).single(props)(req, res, function (err) {
        if (err instanceof uploadFile.MulterError || err) {
          if ( err.code === "LIMIT_FILE_SIZE" ) {
            return res.status(403).json({"status": "error", "message": "Xảy ra lỗi! File tải lên vượt quá giới hạn cho phép."});
          } else if ( err.code === "INVALID_FILE" ) {
            return res.status(403).json({"status": "error", "message": "Xảy ra lỗi! File tải lên không đúng định dạng cho phép."});
          }
          return res.status(403).json({"status": "error", "message": err});
        }
        next();
      });
    };
  },
  "array": (path, props, size, type) => {
    return (req, res, next) => {
      uploadFile({ storage: storage(path, type), limits: { fileSize: 1024 * 1024 * size } }).array(props)(req, res, function (err) {
        if (err instanceof uploadFile.MulterError || err) {
          if ( err.code === "LIMIT_FILE_SIZE" ) {
            return res.status(403).json({"status": "error", "message": "Xảy ra lỗi! File tải lên vượt quá giới hạn cho phép."});
          } else if ( err.code === "INVALID_FILE" ) {
            return res.status(403).json({"status": "error", "message": "Xảy ra lỗi! File tải lên không đúng định dạng cho phép."});
          }
          return res.status(403).json({"status": "error", "message": err});
        }
        next();
      });
    };
  }
};
