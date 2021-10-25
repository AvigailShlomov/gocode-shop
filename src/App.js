import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyContext from "./MyContext";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";

function App() {
  const [productCart, setProductCart] = useState([]); //Global
  const happy = true;
  return (
    <Router>
      <MyContext.Provider value={[productCart, setProductCart]}>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Products">Products</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/Products/:id">
              <ProductDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
