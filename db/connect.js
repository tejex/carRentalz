import mongoose from 'mongoose';

const connectDB = (uri) =>{
    mongoose.connect(uri, { useNewUrlParser: true})
}
export default connectDB;
/************************************************************************************************************************/