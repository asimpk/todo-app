import Task from '@/models/tasks'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const body = await req.json()
    await Task.findByIdAndUpdate(params?.id, {
      ...body
    })
    return NextResponse.json({ message: 'Task updated' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const { id } = params
    await Task.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Task Deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
