import mongoose from 'mongoose';

const uri = "mongodb+srv://ankurshashwat29:ankur123456789@cli.hsmbti3.mongodb.net/?retryWrites=true&w=majority&appName=CLI";

const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

const connectDB = async () => {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
