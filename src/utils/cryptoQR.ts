import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('cryptoQR'); 
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // replace '1234567890123456' with your initialization vector

/**
 * Encrypts the given text using a cipher algorithm.
 * @param text The text to be encrypted.
 * @returns The encrypted text.
 */
export const encryptQR = (text: string): string | null => {
    try {
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return encrypted.toString();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Decrypts an encrypted string using the specified algorithm, key, and initialization vector (IV).
 * @param encrypted The encrypted string to decrypt.
 * @returns The decrypted string.
 */
export const decryptQR = (encrypted: string): string | null => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error(error);
        return null;
    }
};