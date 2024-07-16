import crypto from 'node:crypto'

// CONSTANTS
const secretKey = process.env.CRYPTO_SECRET || 'acdefgerhtuwdtuvnnewhkmnbvewierr'  // the key should be 32 bytes
const format = process.env.CRYPTO_FORMAT  // replace your string encoding format in .env
const algorithm = process.env.CRYPTO_ALGORITHM  // replace your crypto algorithm in any one (GCM, CCM, OCB, and chacha20-poly1305)

// This function is converting palin text to hexa decimal ecryption format
export const encryptText = (rawData) => {
    try {
        const iv = crypto.randomBytes(12).toString('hex')
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
        let encrypted = cipher.update(rawData, format, 'hex')
        encrypted += cipher.final('hex')
        const authTag = cipher.getAuthTag().toString('hex')
        return iv + ':' + encrypted + ':' + authTag
    }
    catch (error) {
        console.log(error.message)
    }
}

// This function is converting cipher text to plain text
export const decryptText = (encryptData) => {
    try {
        const iv = encryptData.split(':')[0]
        const encrypt = encryptData.split(':')[1]
        const authTag = encryptData.split(':')[2]
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
        decipher.setAuthTag(Buffer.from(authTag, 'hex'))
        let decrypted = decipher.update(encrypt, 'hex', format)
        decrypted += decipher.final(format)
        return decrypted
    }
    catch (error) {     
        console.log(error.message)
    }
}