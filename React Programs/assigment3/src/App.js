import React from "react";

const PriceContext = React.createContext();
const DiscountContext = React.createContext();

function PriceComp({ children }) {
  return (
    <PriceContext.Provider value={4000}>
      {children}
    </PriceContext.Provider>
  );
}

function DiscountComp({ children }) {
  return (
    <DiscountContext.Provider value={30}>
      {children}
    </DiscountContext.Provider>
  );
}

function AppComp() {
  return (
    <PriceContext.Consumer>
      {(price) => (
        <DiscountContext.Consumer>
          {(discount) => {
            const discountAmount = (price * discount) / 100;
            const finalPrice = price - discountAmount;

            return (
              <div>
                <p>Actual Price: {price}</p>
                <p>Discount Given: {discountAmount}</p>
                <p>Discounted Price: {finalPrice}</p>
              </div>
            );
          }}
        </DiscountContext.Consumer>
      )}
    </PriceContext.Consumer>
  );
}

export default function Main() {
  return (
    <PriceComp>
      <DiscountComp>
        <AppComp />
      </DiscountComp>
    </PriceComp>
  );
}
