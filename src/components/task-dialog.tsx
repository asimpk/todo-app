import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Task, taskSchema } from '@/formSchema/schema'

type TaskDialogProps = {
  task?: Task
  closeDialog: () => void
}

export function TaskDialog({ task, closeDialog }: TaskDialogProps) {
  const form = useForm<Task>({
    defaultValues: task ?? { title: '', status: '', label: '', priority: '' },
    resolver: zodResolver(taskSchema)
  })

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = form

  const processForm: SubmitHandler<Task> = async data => {
    if (task) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${task._id}`,
          {
            method: 'PUT',
            body: JSON.stringify({ ...data }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (!res.ok) {
          throw new Error('Failed to update task')
        }
      } catch (error) {
        console.log('Error updating task: ', error)
      }
    } else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api`, {
          method: 'POST',
          body: JSON.stringify({ data }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          throw new Error('Failed to create task')
        }
      } catch (error) {
        console.log('Error creating task: ', error)
      }
    }
    closeDialog()
    router.refresh()
    reset()
  }
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(processForm)}>
            <div className='space-y-4 py-2 pb-4'>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  {...register('title')}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Task title...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  {...register('priority')}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select task priority' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='low'>
                            <span className='font-medium'>Low</span>
                          </SelectItem>
                          <SelectItem value='medium'>
                            <span className='font-medium'>Medium</span>
                          </SelectItem>
                          <SelectItem value='high'>
                            <span className='font-medium'>High</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  {...register('status')}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select task status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='todo'>
                            <span className='font-medium'>Todo</span>
                          </SelectItem>
                          <SelectItem value='backlog'>
                            <span className='font-medium'>Backlog</span>
                          </SelectItem>
                          <SelectItem value='inprogress'>
                            <span className='font-medium'>In Progress</span>
                          </SelectItem>
                          <SelectItem value='cancelled'>
                            <span className='font-medium'>Cancelled</span>
                          </SelectItem>
                          <SelectItem value='done'>
                            <span className='font-medium'>Done</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  {...register('label')}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select task label' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='feature'>
                            <span className='font-medium'>Feature</span>
                          </SelectItem>
                          <SelectItem value='documentation'>
                            <span className='font-medium'>Documentation</span>
                          </SelectItem>
                          <SelectItem value='bug'>
                            <span className='font-medium'>Bug</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type='button' variant='secondary' onClick={closeDialog}>
                Cancel
              </Button>

              <Button disabled={isSubmitting}>
                {' '}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
