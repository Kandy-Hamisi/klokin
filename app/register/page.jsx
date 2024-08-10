import { DateTimeDisplay, RegisterForm } from '@/components'
import React from 'react'

const page = () => {
  return (
    <main className='relative'>
      <section className='padding'>
        <section className="max-container">
            <DateTimeDisplay />
        </section>
      </section>
      <section className='padding'>
        <section className="max-container">
          <RegisterForm/>
        </section>
      </section>
    </main>
  )
}

export default page
