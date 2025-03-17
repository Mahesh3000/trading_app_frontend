import React, { createContext, useContext, useState } from "react";

const StockContext = createContext();

export const useStock = () => {
  return useContext(StockContext);
};

export const StockProvider = ({ children }) => {
  const [stockDatas, setStockData] = useState(null);

  const setStockDetails = (stock) => {
    setStockData(stock);
  };

  return (
    <StockContext.Provider value={{ stockDatas, setStockDetails }}>
      {children}
    </StockContext.Provider>
  );
};
