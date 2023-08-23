import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { useEffect } from "react";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/items')
    .then(res=>res.json())
    .then((data)=>setItems(data))
  },[]);

  function handleAddItem(newdata){
    setItems([...items, newdata])
    console.log('In ShoppingList:', newdata)
  }

  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=>item.id !== deletedItem.id);
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
