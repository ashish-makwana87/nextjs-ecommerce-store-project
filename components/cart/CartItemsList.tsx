'use client'
import { CartItemWithProduct } from "@/utils/types";
import { Card } from "../ui/card";
import { FirstColumn, FourthColumn, SecondColumn } from "./CartItemsColumns";
import ThirdColumn from "./ThirdColumn";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {


  return (
    <div>
      {cartItems.map((cartItem) => {
        const { image, name, company, id:productId, price } = cartItem.product;
        const {id, amount} = cartItem;

        return (
          <Card key={cartItem.id} className="p-4 mb-4 flex flex-col md:flex-row gap-y-4 gap-x-8">
            <FirstColumn image={image} name={name} />
            <SecondColumn title={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;
