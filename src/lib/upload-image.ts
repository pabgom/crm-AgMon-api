import multer from 'multer';
import mv from 'mv';
import path from 'path';
import fs from 'fs/promises';
import Logger from './logger';

const uploadImage = fieldInput => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../temp/'));
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

export class ImageService {
    static moveFile(file, pathAddress: string): void {
        const currentPath = path.join(__dirname, '../temp', file.filename);
        const destinationPath = path.join(__dirname, `..${pathAddress}`, file.filename);

        mv(currentPath, destinationPath, err => {
            if (err) {
                Logger.error(
                    `Issue when move image from temporal folder to assign folder: original ${currentPath}  new: ${destinationPath}`
                );
                throw err;
            }
        });
    }

    static replaceImage(oldFilename: string, newFilename: string, pathAddress): void {
        const currentPath = path.join(__dirname, '../temp', newFilename);
        const destinationPath = path.join(__dirname, `..${pathAddress}`, newFilename);
        mv(currentPath, destinationPath, err => {
            if (err) {
                Logger.error(
                    `Issue when move image from temporal folder to assign folder: original ${currentPath}  new: ${destinationPath}`
                );
                throw err;
            } else {
                this.dropFile(path.join(__dirname, `../${pathAddress}`, oldFilename));
            }
        });
    }

    static removeFile(filename: string, pathAddress: string): void {
        const removePath = path.join(__dirname, `../${pathAddress}`, filename);
        this.dropFile(removePath);
    }

    private static dropFile(filePath: string): void {
        fs.unlink(filePath).catch(e => {
            Logger.error(`Error when try to remove ${filePath}`);
        });
    }
}

export default uploadImage;
