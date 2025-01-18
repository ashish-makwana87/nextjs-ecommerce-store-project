import React from "react";
import { faker } from "@faker-js/faker";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import { SubmitBtn } from "@/components/form/Buttons";
import { createProductAction } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";

function CreateProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 7, max: 8 });

  return (
    <section>
      <h2 className='head-3 mb-4'>create product</h2>
      <div className='border p-8 rounded-md '>
        <FormContainer action={createProductAction}>
          <div className='grid md:grid-cols-2 gap-x-4'>
            <FormInput
              name='name'
              label='product name'
              defaultValue={name}
              type='text'
            />
            <FormInput
              name='company'
              label='company'
              defaultValue={company}
              type='text'
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput name='description' defaultValue={description} />
          <div className='mt-4'>
            <CheckboxInput name='featured' label='featured' />
          </div>
          <div className='mt-6'>
            <SubmitBtn />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProductPage;
