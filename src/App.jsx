import { useEffect, useState } from "react"

function Card({brand , description, name , price , image} ) {
  return(
    <div className="card-container">
      <h3>{name}</h3>
      <p><strong>Brand :</strong> {brand}</p>
      <p><strong>Descrizione prodotto:</strong> {description}</p>
      <img src={image}  alt={name} />
      <p><strong>Prezzo :</strong> {price}</p>
    </div>
  )
}

export default function App () {
  const [query , setQuery] = useState("")
  const [products , setProducts] = useState([])


   const handleSearch = (query) => {
    if(query !== ""){
      fetch(`http://localhost:5000/products?search=${query}`)
     .then((res) => res.json())
     .then((data) => setProducts(data))
     .catch((error) => console.error(error))
    }else{
      setProducts("")
    }
    
     
   }
   
    console.log(products)
   useEffect(() => {
    handleSearch(query)
   },[query])

   


  console.log(query)
  return(
    <div className="container">
      <div className="search-container">
        <label htmlFor="text"> Cerca Prodotto</label>
        <input type="text" 
         value={query}
         onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {products && 
        <div>
          <h1>Prodotti trovati</h1>
          <ul>
            {products.map((product) => {
              return(
              <li key={product.id}>
                <Card 
                name={product.name}
                brand={product.brand}
                description={product.description}
                price={product.price}
                image={product.image}
                />
              </li>
            )
            })}
          </ul>
        </div>
      }
    </div>
  )
}