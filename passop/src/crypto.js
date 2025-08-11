import CryptoJS from 'crypto-js';

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, 'secret-key').toString();
};

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secret-key');
  return bytes.toString(CryptoJS.enc.Utf8);
};