import mongoose from "mongoose";

const projectsSchema = mongoose.Schema({
  id: { type: String },
  id_client: { type: String, required: true },
  project_name: { type: String, required: true, unique: true },
  project_description: { type: String, required: true },
});

export default mongoose.model("Projects", projectsSchema);
