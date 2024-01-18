const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(email, password) {
    //validation of email + password
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // salt adds a random number of characters to a password, i.e. has for identical passowrds is different

    //larger num means more salt and also harder to hack but to longer to also singup/signin
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create( { email, password: hash } )
    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)