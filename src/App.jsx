import { useEffect, useState, useCallback } from "react"
import debounce from "lodash/debounce"

function Card({brand , description, name , price , image} ) {
  return(
    <div className="card-container">
      <h2>{name}</h2>
      
      <img src={image}  alt={name} />
      <p><strong>Brand :</strong> {brand}</p>
      <p><strong>Descrizione prodotto:</strong> {description}</p>
      <p><strong>Prezzo :</strong> {price} $</p>
    </div>
  )
}



export default function App () {
  const [query , setQuery] = useState("")
  const [products , setProducts] = useState([])
  const [selectedProduct , setSelectedProduct] = useState(null)


   const handleSearch = (query) => {
    if(query !== ""){
      console.log("Sto facendo la chiamata")
      fetch(`http://localhost:5000/products?search=${query}`)
     .then((res) => res.json())
     .then((data) => setProducts(data))
     .catch((error) => console.error(error))
    
    }else{
      setProducts([])
    }
     
   }

   const debouncedHandleSearch = useCallback(
    debounce(handleSearch , 500),
     []
   )
   
   useEffect(() => {
    debouncedHandleSearch(query)
   },[query])

   const fetchProductDetails = (id) => {
     fetch(`http://localhost:5000/products/${id}`)
     .then((res) => res.json())
     .then((data) => {
      setSelectedProduct(data)
      setQuery("")
      setProducts([])
     })
     .catch((error) => console.error(error))
   }


  return(
    <div className="container">
      <div className="search-container">
        <label htmlFor="text"> Cerca Prodotto</label>
        <input type="text" 
        placeholder="Cerca un prodotto..."
         value={query}
         onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {products.length  > 0 && 
        <div className="result-container">
          
          <ul>
            {products.map((product) => {
              return(
              <li key={product.id} onClick={() => fetchProductDetails(product.id)}>
                <p>{product.name}</p>
              </li>
            )
            })}
          </ul>
        </div>
      }

      {selectedProduct && 
       <Card 
       name={ selectedProduct.name}
       description={selectedProduct.description}
       image={selectedProduct.image}
       price={selectedProduct.price}
       brand={selectedProduct.brand}
       />
      }
    </div>
  )
}