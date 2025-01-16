import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import {faker} from '@faker-js/faker'

const createProductAction = async (formData: FormData) => {
  'use server'

  const name = formData.get('name') as string;
  console.log(name);
  
}



function CreateProductPage() {
 
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({min: 10, max: 15})

  return (
    <section>
<h2 className='head-2'>create product</h2>
<div className='border p-8 rounded-md'>
  <form action={createProductAction}>
  <div className='mb-2'>
  <Label htmlFor='name'>name</Label>
  <Input id='name' name='name' type='text' defaultValue={name} />
  </div>
  <Button type='submit'>Submit</Button>
  </form> 
</div>
    </section>
  )
}

export default CreateProductPage