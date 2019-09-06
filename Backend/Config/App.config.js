const Multer = require('multer');
const path = require('path');

exports.Config = {
    Port: process.env.PORT || 3000,
    Db: process.env.MONGO || 'mongodb://root:DG123456789@ds113815.mlab.com:13815/test-condor-labs',
    Token: 'KJSFHUASIFHWFIHhnfiufghskffjasdfkasdfhakjfhw2w846284284LNDLKFDNSJKLN'
}

function disk(id) {
    return Multer.diskStorage({
        destination: path.join(__dirname, '../Uploads'),
        filename: (req, file, cb) => {
            cb(null, id + path.extname(file.originalname));
        }
    });
}

exports.Storage = (id) => {
    return Multer({
        storage: disk(id),
        limits: { fileSize: 5000000 }
    }).single('image');
}