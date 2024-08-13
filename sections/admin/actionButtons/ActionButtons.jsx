import { ActionButton } from '@/components'
import React from 'react'

const ActionButtons = () => {
  return (
    <section className='max-container'>
      <div className='flex flex-col items-center'>
        <ActionButton textContent="Assign Sites" redirect="/admin/assign-site" />
        <ActionButton textContent="View Realtime Stats" redirect="/admin/stats" />
      </div>
    </section>
  )
}

export default ActionButtons
