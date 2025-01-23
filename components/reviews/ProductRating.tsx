import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function ProductRating({ratings}:{ratings: number}) {

  const booleanArr = Array.from({length: 5}, (_, index) => index + 1 <= ratings );
  
  return (
    <div className='flex flex-row items-center'>
    {booleanArr.map((item, index) => {
     

     return <div key={index}>{item ? <FaStar className='text-yellow-500' /> : <FaRegStar className='text-gray-500' />}</div>
    })}
    </div> 
  )
}

export default ProductRating