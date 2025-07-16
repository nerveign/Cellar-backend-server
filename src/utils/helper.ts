import { ResponseError } from '../error/response-error';
import { User } from '../models/user-model';

// For zod error
export const requiredMessage = (text: string) => {
    return { required_error: `${text} is required` };
};

// check user exist by username and email
export const checkUserExist = async (username: string, email: string) => {
    const checkUsername = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    if (checkUsername || checkEmail) {
        throw new ResponseError(400, 'Username or Email already exists');
    }
};

// File type for upload image
export const imageExtensions = (extension: string) => {
    const extensions = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/svg',
        'image/webp',
    ];
    return extensions.includes(extension);
};
