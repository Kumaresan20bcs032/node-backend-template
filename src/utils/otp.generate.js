import crypto from 'node:crypto';

//This function is generating random crypto based otp which is secure-based
export const generateOtp = () => {
    const randomBytes = crypto.randomBytes(3); // According to your otp length adjust your bytes
    const randonNumber = randomBytes.readUint16BE(0);
    const sixDigitOTPNumber = 100000 + (randonNumber % 900000); //According to otp you can divide and add the number
    return sixDigitOTPNumber;
}