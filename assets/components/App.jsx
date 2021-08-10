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
  const [loadingCart, setLoadingCart] = useState(true);
  const [cart, setCart] = useState();
  const [update, setUpdate] = useState(false);

  function callback(_update) {
    setUpdate(_update);
  }

  useEffect(() => {
    axios.get("/api/product/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });

    return () => {
      setLoading();
      setProducts();
      setCart();
    };
  }, []);

  useEffect(() => {
    axios.get("/api/cart/get").then((response) => {
      setCart(response.data);
      setLoadingCart(false);

      if (response.data.items.length > 0) {
        $(".shopping-cart-summary").removeClass("invisible");

        $(".shopping-cart-items-count").text(response.data.items.length);

        $(".shopping-cart-total").html(
          response.data.total.toFixed(2) + "&nbsp;&euro;"
        );
      } else {
        $(".shopping-cart-summary").addClass("invisible");
      }
    });

    return (
      () => {
        setLoading();
        setLoadingCart();
        setUpdate();
        setCart();
      },
      [update]
    );
  });

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/checkout", "/products", "/:url"]}>
          <Layout1 cart={cart}>
            <Switch>
              <Route exact path="/">
                <Home products={products} loading={loading} />
              </Route>
              <Route exact path="/products">
                <Products products={products} loading={loading} />
              </Route>
              <Route exact path="/checkout">
                <Cart cart={cart} loading={loadingCart} callback={callback} />
              </Route>
              <Route exact path="/:url">
                <Product callback={callback} />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
          </Layout1>
        </Route>
        <Route path={["/checkout/shipping", "/checkout/confirmation"]}>
          <Layout2>
            <Switch>
              <Route exact path="/checkout/shipping">
                <Shipping cart={cart} loading={loadingCart} />
              </Route>
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
