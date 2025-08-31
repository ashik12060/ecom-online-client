import React, { useState } from "react";
import TableHeader from "../TableHeader/TableHeader";
import ProductsLists from "../ProductsLists/ProductsLists";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import { CartProvider } from "../../hooks";
const Home = ({ searchQuery,setSearchQuery }) => {
  // const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="overflow-hidden bg-white">
      {/* <TableHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery}  /> */}
      <ProductsLists searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      
      <Footer />
    </div>
  );
};

export default Home;
