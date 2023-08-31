import { JSEncrypt } from 'jsencrypt';
import * as Yup from 'yup';
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGAEVswemYf+hmWPvHRdX5qxs1kWnBeZ4YRmKq5PutYem0knW9gIZtfyXEHMkECmbvbjhRUSnXPiPiA8TDs/gblwaBolSRDw7VIHTw8Zb/ontErwj/6py6+ZrTl5vk9sxUZlQ4Gj+qu6dOmfd8A0TGr4lRkTsYF5H2uRjrdguuewIDAQAB';
export const encryptPassword = (password: string): string => {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encryptedPassword = encrypt.encrypt(password).toString();

  return encryptedPassword;
};
export const formatDate = (dateString: string | number): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
export const formatPrice = (price: string): string => {
  if (price === '0' || price === '0.0') {
    return 'Free';
  }
  return `$${price}`;
};
export const validateFileExtension = (file: File): boolean => {
  const allowedExtensions = ['svg', 'png', 'jpg', 'gif'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return allowedExtensions.includes(fileExtension || '');
};

export const validateFileSize = (file: File): boolean => {
  const fileSizeInMB = file.size / (1024 * 1024);
  const maxFileSize = 3;
  return fileSizeInMB <= maxFileSize;
};
export const profileValidationSchema = Yup.object().shape({
  fname: Yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'Invalid first name'),
  lname: Yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Invalid last name'),
  userName: Yup.string().required('Username is required'),
  mNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
  description: Yup.string()
    .max(1000, 'Description should not exceed 1000 characters')
    .nullable()
    .default(''),
});
export const getEmailMasked = (email: string, isSelfView: boolean): string => {
  if (!isSelfView)
    return email.replace(
      /^(.{2,3}).*@(.{1,}).com$/,
      (match: string, p1: string, p2: string) =>
        p1 + '*'.repeat(p2.length) + '@' + '*'.repeat(p2.length) + '.com'
    );
  return email;
};
export const getNumberMasked = (
  phoneNumber: string,
  isSelfView: boolean
): string => {
  if (!isSelfView)
    return phoneNumber.replace(
      /(\d+)(\d{4})$/,
      (match: string, p1: string, p2: string) => '*'.repeat(p1.length) + p2
    );
  return phoneNumber;
};
