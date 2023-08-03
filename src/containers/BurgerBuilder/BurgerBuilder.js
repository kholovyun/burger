import React from 'react';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import {INGREDIENT_PRICES} from "../../constants/ingredients_prices";

const BurgerBuilder = () => {
  const navigate = useNavigate()
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  })
  const [totalPrice, setTotalPrice] = useState(200)
  const [purchasable, setPurchasable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)



  const addIngredientHandler = (type) => {
    const oldCount = ingredients[type]
    const updateCount = oldCount + 1
    const updatedIngredients = {...ingredients}
    updatedIngredients[type] = updateCount

    const priceAddition = INGREDIENT_PRICES[type]
    const newPrice = totalPrice + priceAddition

    setIngredients(updatedIngredients)
    setTotalPrice(newPrice)
    updatePurchaseState(updatedIngredients)
  }

  const removeIngredientHandler = (type) => {
    const oldCount = ingredients[type]
    if (oldCount <= 0) return

    const updateCount = oldCount - 1
    const updatedIngredients = {...ingredients}
    updatedIngredients[type] = updateCount

    const priceAddition = INGREDIENT_PRICES[type]
    const newPrice = totalPrice - priceAddition

    setIngredients(updatedIngredients)
    setTotalPrice(newPrice)
    updatePurchaseState(updatedIngredients)
  }

  const disabledInfo = {...ingredients}

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0)

      setPurchasable(sum > 0)
  }

  const purchaseHandler = () => {
    setPurchasing(true)
  }
  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    const params = new createSearchParams(ingredients)
    //salad=0&meat=0&cheese=0&bacon=0
    navigate({pathname: '/checkout' , search: params.toString()})
  }

  return (
    <>
      <Modal
        show={purchasing}
        closed={purchaseCancelHandler}
      >
        <OrderSummary 
            ingredients={ingredients}
            price={totalPrice} 
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls 
        ingredients={ingredients}
        price={totalPrice}
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabledInfo={disabledInfo}
        purchasable={purchasable}
        ordered={purchaseHandler}
      />
    </>
  )
}

export default BurgerBuilder;
