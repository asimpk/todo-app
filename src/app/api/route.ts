import Task from '@/models/tasks'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await Task.find()
    return NextResponse.json({ tasks }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const taskData = body.data
    await Task.create(taskData)
    return NextResponse.json({ message: 'Task Created' }, { status: 201 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}
