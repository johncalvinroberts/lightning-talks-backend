import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

export default User
