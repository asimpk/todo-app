import { Table } from '@tanstack/react-table'
import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { DataTableViewOptions } from './tasks-table-view-options'
import { TaskDialog } from './task-dialog'
import { useState } from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [showTaskDialog, setShowNewTaskDialog] = useState(false)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
          onClick={() => {
            setShowNewTaskDialog(true)
          }}
        >
          <PlusCircledIcon className='mr-2 h-5 w-5' />
          Create Task
        </Button>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      {showTaskDialog && (
        <TaskDialog closeDialog={() => setShowNewTaskDialog(false)} />
      )}
    </div>
  )
}
