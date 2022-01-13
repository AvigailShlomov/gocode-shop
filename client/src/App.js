import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "./Admin/Admin";
import MyContext from "./MyContext";
import Home from "./views/Home";
import ProductCard from "./views/ProductCard";

function App() {
  const [productCart, setProductCart] = useState([]); //Global
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
                <Link to="/Admin">Admin</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/Admin">
              <Admin />
            </Route>
            <Route path="/Products/:id">
              <ProductCard />
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
