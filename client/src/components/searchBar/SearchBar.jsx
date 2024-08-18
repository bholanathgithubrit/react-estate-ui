import "./SearchBar.scss"
import {useState} from "react" 
import {Link} from "react-router-dom"
const type=["buy","rent"]
function SearchBar() {
  const [query,setQuery]=useState({
    type:"buy",
    city:"",
    minPrice:0,
    maxPrice:0
  })
  const switchType=(value)=>{
      setQuery(prev=>({...prev,type:value}))
  }
  const handleChange=(e)=>{
    e.preventDefault()
    setQuery((prev)=>({...prev,[e.target.name]:[e.target.value]}))
  }
  console.log(query)
  return (
    <div className="searchBar">
      <div className="type">
        {type.map((type)=>(
          <button key={type} onClick={()=>switchType(type)} className={query.type===type ?"active":""}>{type}</button>
        ))}
      </div>
      <form action="">
        <input type="text" name="city" placeholder="city" onChange={handleChange}/>
        <input type="number" name="minPrice" min={0} max={10000000} placeholder="min price"  onChange={handleChange}/>
        <input type="number" name="maxPrice" min={0} max={10000000} placeholder="max price"  onChange={handleChange}/>
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
        <button>
          <img src="/search.png" alt="" />
        </button>
        </Link>
        
      </form>
    </div>
  )
}

export default SearchBar
