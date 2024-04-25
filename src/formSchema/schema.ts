import { z } from 'zod'

export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  status: z.string().min(2, {
    message: 'Status must be at least 2 characters.'
  }),
  label: z.string().min(2, {
    message: 'Status must be at least 2 characters.'
  }),
  priority: z.string().min(2, {
    message: 'priority must be at least 2 characters.'
  })
})

export type Task = z.infer<typeof taskSchema>
