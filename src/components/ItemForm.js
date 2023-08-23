import React, { useState } from "react";

function ItemForm({onAddItem}) {
  const [name, setName] = useState("victor");
  const [category, setCategory] = useState("Produce");

  //function to handle submission
  function handleSubmit(e){
    e.preventDefault();
    const itemData = {
      name: name,
      category:category,
      isInCart: false
    }
    fetch('http://localhost:4000/items',{
      method: "POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify(itemData)
    })
    .then((r)=>r.json())
    .then((newdata)=> onAddItem(newdata))
    
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
