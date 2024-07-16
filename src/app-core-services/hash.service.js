import crypto from 'node:crypto'

// This Function converts the raw data into hexa decimal format
export const encryptHash = (rawData) => {
    try {
        const encrypt = crypto.createHash('sha256', process.env.SECRET_KEY) //use your secret key
            .update(rawData).digest('hex')
        return encrypt
    }
    catch (error) {
        console.log(error)
    }
}

// This Function checks wheather the raw data matches with encrypt data
export const decryptHash = (rawData, encryptData) => {
    try {
        const hash = crypto.createHash('sha256', process.env.SECRET_KEY) //use your secret key
            .update(rawData).digest('hex')
        if (hash === encryptData) {
            return true
        }
        return false
    }
    catch (error) {
        console.log(error)
    }
}