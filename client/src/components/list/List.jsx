import "./list.scss"
import {listData} from "../../lib/dummydata.js"
import Card from "../card/Card.jsx"
function List() {
  return (
    <div className="list">
      {listData.map(item=>(
        <Card item={item} key={item.id}/>
      ))}
    </div>
  )
}

export default List
