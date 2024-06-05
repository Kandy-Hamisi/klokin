import { ActionButton } from '@/components'
import React from 'react'

const ActionButtons = () => {
  return (
    <section className='max-containr'>
      <div className='flex flex-col items-center'>
        <ActionButton textContent="Assign Sites" redirect="/admin/siteDescription" />
        <ActionButton textContent="View Realtime Stats" redirect="/admin/siteDescription" />
        <ActionButton textContent="Fill In Site Description Form" redirect="/admin/siteDescription" />
      </div>
    </section>
  )
}

export default ActionButtons
