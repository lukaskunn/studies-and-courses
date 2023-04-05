import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lucassioliveira098:fUM898VOVXPpo7rL@cluster0.x3i7ygb.mongodb.net/nodejs-course")

let db = mongoose.connection

export default db