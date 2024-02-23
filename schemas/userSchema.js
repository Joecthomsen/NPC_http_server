const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String
        },
        controleGear:{
            type: [Schema.Types.ObjectId],
            default: []
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('userSchema', userSchema)
module.exports = User