import { DateTimeDisplay, Navbar } from '@/components'
import { ActionButtons } from '@/sections'
import React from 'react'

const AdminPage = () => {
  return (
    <main className='relative'>
      <Navbar />
      <section className="padding">
        <section className="max-container">
          <DateTimeDisplay />
        </section>
      </section>
      <section className='padding'>
        <ActionButtons />
      </section>
    </main>
  )
}

export default AdminPage
