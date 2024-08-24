import mongoose from "mongoose"

//File schema
const fileSchema = new mongoose.Schema({
    media: {
        type: String,
        trim: true,
        required: true
    },
    service: {
        type: String,
        trim: true,
        required: true
    },
    file_type: {
        type: String,
        trim: true,
        required: true
    },
    file_format: {
        type: String,
        trim: true,
        required: true
    },
    url: {
        type: String,
        trim: true,
        required: true
    }
}, {
    versionKey: false,
    timeStamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

export default mongoose.model('files', fileSchema);