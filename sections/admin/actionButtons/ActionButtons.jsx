import { ActionButton } from '@/components'
import React from 'react'

const ActionButtons = () => {
  return (
    <section className='max-container'>
      <div className='flex flex-col items-center'>
        <ActionButton textContent="Assign Sites" redirect="/admin/stats" />
        <ActionButton textContent="View Realtime Stats" redirect="/admin/siteDescription" />
      </div>
    </section>
  )
}

export default ActionButtons
