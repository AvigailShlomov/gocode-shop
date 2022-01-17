import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Admin from "./views/Admin";
import MyContext from "./MyContext";
import Admin1 from "./views/Admin/Admin1";
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
                <Link to="/Admin1">Admin</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/Admin1">
              <Admin1 />
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
