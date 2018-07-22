import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

export default User
