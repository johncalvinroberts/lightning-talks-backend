import mongoose from 'mongoose'
import config from '../config/index'

mongoose.Promise = global.Promise

const connectToDb = async () => {
  try {
    const prod = process.env.NODE_ENV === 'production'
    const mongoUrl = prod ? process.env.MLAB_PRODUCTION_DB : config.mongoUrl
    await mongoose.connect(mongoUrl)
  } catch (err) {
    console.log(err)
  }
}

export default connectToDb
