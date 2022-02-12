import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import SearchResults from '../components/SearchResults'

type Products = {
  id: number,
  price: number,
  priceFormatted: number,
  title: string
}

type Results = {
  totalPrice: number,
  products: Products[]
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({totalPrice: 0, products: []})

   async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) return

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products: Products[] = data.map((product: any)=>({
      ...product,
      priceFormatted: formatter.format(product.price)
    }))

    const totalPrice = products.reduce((total, product) => total + product.price, 0)

    setResults({ totalPrice, products})
  }

  const onAddToWishList = useCallback((id: number) => {
    console.log(id)
  }, [])

  return (
    <>
      <h1>Search</h1>
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>

      <SearchResults
        totalPrice={results.totalPrice} 
        results={results.products} 
        onAddToWishList={onAddToWishList} 
      />
    </>
  )
}

export default Home
