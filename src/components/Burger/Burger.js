import React from 'react';
import './Burger.css';
import Ingredient from './Ingredient/Ingredient'
// const Burger = (props) => {
//const ingredientKeys = Object.keys(props.ingredients) // ['salad', 'bacon'...]
// props = {ingredients}  {ingredients}
const Burger = ({ingredients}) => {
  const ingredientKeys = Object.keys(ingredients) // ['salad', 'bacon'...]
  let ingList = []
  ingredientKeys.forEach(igKey => {
    let amount = ingredients[igKey]
    for (let i = 0; i < amount; i++) {
      ingList.push(<Ingredient key={igKey + i} type={igKey} />)
    }
  })

  if (ingList.length === 0) {
    ingList = <p>Please start adding ingredients!</p>
  }

  return (
    <div className='Burger'>
      <Ingredient type={'bread-top'}/>
      {ingList}
      <Ingredient type={'bread-bottom'}/>
    </div>
  )
}

export default Burger;
