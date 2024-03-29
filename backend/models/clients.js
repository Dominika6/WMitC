import mongoose from "mongoose";

const clientsSchema = mongoose.Schema({
  id: { type: String },
  id_supervisor: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model("Clients", clientsSchema);
