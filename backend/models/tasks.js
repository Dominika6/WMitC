import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
    id: { type: String },
    id_project: { type: String },
    id_user: { type: String },
    task_name: { type: String, required: true },
    task_description: { type: String, required: true },
    task_comments: { type: [String], default: [] },
    deadline: { type: Date, required: true },
    implementation_status: { type: String, enum: [ 'new', 'in progress', 'done' ]}

})

const Tasks = mongoose.model("Tasks", tasksSchema);

export default Tasks;