import { Metadata } from 'next'
import { z } from 'zod'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/tasks-table'
import { taskSchema } from '@/data/schema'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

async function getTasks() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch topics')
    }
    const data = await res.json()
    return z.array(taskSchema).parse(data?.tasks)
  } catch (error) {
    console.log('Error loading topics: ', error)
  }
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <div className='container flex-1 flex-col space-y-8 overflow-y-auto p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <p className='text-muted-foreground'>
          Here&apos;s a list of tasks for this month!
        </p>
      </div>
      <DataTable data={tasks || []} columns={columns} />
    </div>
  )
}
