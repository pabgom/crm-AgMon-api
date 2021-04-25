import bcrypt from 'bcrypt';

/**
 * Centralize all the code about Authentication
 */

export const encryptPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const ComparePasswords = (originalPassword, password): Promise<boolean> => {
    return bcrypt.compare(originalPassword, password);
};
