import Task from '@/models/tasks'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await Task.find()
    return NextResponse.json({ tasks }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}
