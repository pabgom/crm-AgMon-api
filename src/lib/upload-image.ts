import multer from 'multer';

const uploadImage = fieldInput => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './src/uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        // TODO: Add in config
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    return multer({
        storage: storage,
        limits: {
            // 5 Mb
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    }).single(fieldInput);
};

export default uploadImage;
