import multer from 'multer';
import { imageExtensions } from '../utils/helper';
import { ResponseError } from '../error/response-error';
import { NextFunction, Request, Response } from 'express';

const upload = multer({
    storage: multer.diskStorage({
        filename: (req: Request, file, cb) => {
            const randomString = crypto.randomUUID().toString();
            cb(null, `${randomString}.${file.mimetype.split('/')[1]}`);
        },
    }),
    fileFilter: (req: Request, file, cb) => {
        if (!imageExtensions(file.mimetype)) {
            return cb(
                new ResponseError(
                    400,
                    'File type is not supported, only support png, jpeg, gif, svg, webp'
                )
            );
        } else {
            cb(null, true);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
});

const photo = upload.single('profileImg');

export const uploadPhoto = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    photo(req, res, (error) => {
        if (error) {
            throw new ResponseError(422, 'The given data was invalid');
        }
        next();
    });
};
