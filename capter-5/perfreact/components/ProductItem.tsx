import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import lodash from 'lodash'


const AddProductToWishList = dynamic<AddProductToWishListProps>(
  ()=>import('./AddProductToWishList'),
  { loading: ()=><span>Carregando...</span>}
)

interface ProductItemProps {
  product: {
    id: number
    price: number
    priceFormatted: number
    title: string
  },
  onAddToWishList: (id: number) => void
}

function ProductItem({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWIshList, setIsAddingToWIshList] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWIshList(true)}>Adiciona aos favoritos</button>

      {isAddingToWIshList &&
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWIshList(false)}
        />}
    </div>
  )
}


export default memo(ProductItem, (prevProps, NextProps) => {
  // return Object.is(prevProps.product, NextProps.product)
  return lodash.isEqual(prevProps.product, NextProps.product)
})