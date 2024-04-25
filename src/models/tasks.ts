import mongoose, { Schema } from 'mongoose'
import { Task } from '@/formSchema/schema'

// Check if MONGODB_URI is defined before connecting
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
  mongoose.Promise = global.Promise
} else {
  console.error('MONGODB_URI environment variable is not defined')
  process.exit(1) // Exit process if MONGODB_URI is not defined
}

const taskSchema = new Schema<Omit<Task, '_id'>>(
  {
    title: String,
    status: String,
    label: String,
    priority: String
  },
  { timestamps: true }
)

const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default TaskModel
