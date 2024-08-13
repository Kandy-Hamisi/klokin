
import SiteAssignment from '@/components/admin/siteAssignments/SiteAssignment'
import React from 'react'

const page = () => {
  return (
    <main className='relative'>
      <section className='padding'>
        <section className='max-container'>
            <h1>View today's Data Collectors clockin Info</h1>
            <div>
                <SiteAssignment />
            </div>
        </section>
      </section>
    </main>
  )
}

export default page
