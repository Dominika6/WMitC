import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    id: { type: String },
    id_supervisor: { type: String, required:true },
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, enum: [ 'admin', 'manager', 'user' ], required:true },
})

export default mongoose.model("Users", usersSchema);