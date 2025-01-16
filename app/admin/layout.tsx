import React from 'react'
import Sidebar from './Sidebar'
import { Separator } from '@/components/ui/separator'

function DashboardLayout({children}:{children: React.ReactNode}) {

  return (
    <section className='alignment mt-8 md:mt-16'>
    <h1 className='head-2 mb-4'>Dashboard</h1>
    <Separator />
    <div className='mt-6 grid md:grid-cols-12 gap-y-8 gap-x-12 '>
    <div className='md:col-span-3 lg:col-span-2'>
     <Sidebar /> 
    </div>
    <div className='md:col-span-9 lg:col-span-10 md:px-4'>
     {children} 
    </div>
    </div>
    </section>
  )
}

export default DashboardLayout