import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import Cart from "./Cart";
import Confirmation from "./Confirmation";
import Home from "./Home";
import Product from "./Product";
import Products from "./Products";
import Shipping from "./Shipping";
import NotFound from "./NotFound";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/product/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });

    return () => {
      setLoading();
      setProducts();
    };
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/checkout", "/products", "/:url"]}>
          <Layout1>
            <Switch>
              <Route exact path="/">
                <Home products={products} loading={loading} />
              </Route>
              <Route exact path="/products">
                <Products products={products} loading={loading} />
              </Route>
              <Route exact path="/checkout" component={Cart} />
              <Route exact path="/:url" component={Product} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Layout1>
        </Route>
        <Route path={["/checkout/shipping", "/checkout/confirmation"]}>
          <Layout2>
            <Switch>
              <Route exact path="/checkout/shipping" component={Shipping} />
              <Route
                exact
                path="/checkout/confirmation"
                component={Confirmation}
              />
            </Switch>
          </Layout2>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
