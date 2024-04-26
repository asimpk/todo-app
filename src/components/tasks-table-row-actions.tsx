import { useRouter } from 'next/navigation'
import { Row } from '@tanstack/react-table'
import { taskSchema } from '../formSchema/schema'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { TaskDialog } from './task-dialog'
import { useState } from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const [showTaskDialog, setShowNewTaskDialog] = useState(false)
  const router = useRouter()

  const deleteTask = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${task._id}`,
        {
          method: 'DELETE'
        }
      )
      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.log('Error Deleting task: ', error)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem onClick={() => setShowNewTaskDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteTask()}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showTaskDialog && (
        <TaskDialog
          closeDialog={() => setShowNewTaskDialog(false)}
          task={task}
        />
      )}
    </>
  )
}
