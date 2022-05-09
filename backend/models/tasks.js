import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
  id: { type: String },
  id_project: { type: String, required: true },
  id_user: { type: String, required: true },
  task_name: { type: String, required: true },
  task_description: { type: String, required: true },
  task_comments: { type: [String], default: [] },
  deadline: { type: Date, required: true },
  estimated_hours: { type: Number, required: true },
  hours_worked: { type: Number, default: 0 },
  implementation_status: {
    type: String,
    enum: ["new", "in progress", "done", "archived"],
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", tasksSchema);

export default Tasks;
