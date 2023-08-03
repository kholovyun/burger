import { BrowserRouter, Route, Routes } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import ContactData from "./containers/Checkout/ContactData/ContactData";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<BurgerBuilder/>} />
          <Route path='/checkout' element={<Checkout />}>
            <Route path='contact-data' element={<ContactData />} />
          </Route>
          <Route path='*' element={<div>NOT FOUND</div>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
