import { DateTimeDisplay } from '@/components'
import LoginForm from '@/components/admin/loginForm/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <main className='relative'>
      <section className='padding'>
        <section className="max-container">
            <DateTimeDisplay />
        </section>
      </section>
      <section className='padding'>
        <section className="max-container">
          <LoginForm />
        </section>
      </section>
    </main>
  )
}

export default LoginPage
