import { ModeToggle } from './theme-toggle'

export default function NavHeader() {
  return (
    <section className='container mx-auto flex items-center justify-between py-4'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold'>Todo App</h1>
      </div>
      <ModeToggle />
    </section>
  )
}
