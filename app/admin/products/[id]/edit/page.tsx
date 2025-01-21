import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { fetchAdminProductDetails, updateProductAction } from "@/utils/actions";
import TextAreaInput from "@/components/form/TextAreaInput";
import PriceInput from "@/components/form/PriceInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import { SubmitBtn } from "@/components/form/Buttons";
import ImageInputContainer from "@/components/form/ImageInputContainer";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { name, company, price, description, image, featured } =
    await fetchAdminProductDetails(id);

  return (
    <section>
      <h2 className='head-3 mb-4'>create product</h2>
      <div className='border p-8 rounded-md '>
        <ImageInputContainer name={name} image={image}>
          <input type='hidden' name='id' value={id} />
          <input type='hidden' name='url' value={image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <input type='hidden' name='id' value={id} />
          <div className='grid md:grid-cols-2 gap-x-4'>
            <FormInput
              type='text'
              name='name'
              defaultValue={name}
              label='product name'
            />
            <FormInput
              type='text'
              name='company'
              defaultValue={company}
              label='company name'
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput name='description' defaultValue={description} />
          <div className='mt-4'>
            <CheckboxInput
              name='featured'
              label='featured'
              defaultChecked={featured}
            />
          </div>
          <div className='mt-6'>
            <SubmitBtn />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default EditProductPage;
