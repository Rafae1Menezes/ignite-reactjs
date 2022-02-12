export interface AddProductToWishListProps {
  onAddToWishList: () => void
  onRequestClose: () => void
}

function AddProductToWishList({
  onAddToWishList,
  onRequestClose
}: AddProductToWishListProps) {
  return ( 
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
   );
}

export default AddProductToWishList;