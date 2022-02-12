import ProductItem from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized'

type Products = {
  id: number,
  price: number,
  priceFormatted: number,
  title: string
}

interface SearchResultsProps {
  totalPrice: number
  results: Products[]
  onAddToWishList: (id: number) => void
}

function SearchResults({ totalPrice, results, onAddToWishList }: SearchResultsProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return(
      <div key={key} style={style}>
        <ProductItem        
        product={results[index]}
        onAddToWishList={onAddToWishList}
      />
      </div>
    )
      
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

    </div>
  );
}

export default SearchResults;