import ProductItem from "./ProductItem";

interface SearchResultsProps {
  resuts: Array<{
    id: number
    price: number
    title: string
  }>
}

function SearchResults({ resuts }: SearchResultsProps) {
  return (
    <div>
      {resuts.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  );
}

export default SearchResults;