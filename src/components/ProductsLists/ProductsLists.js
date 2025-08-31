import React from "react";
import SideNav from "../SideNav/SideNav";
import Products from "../Products/Products";
import HomeCarousel from "../SideNav/HomeCarousel/HomeCarousel";
import BlogPro from "../../pages/BlogPro";
import TopCarousel from "../Carousel/TopCarousel";
import ProductsShow from "../../pages/ProductsShow";
import ProductByCategory from "../../pages/ProductsByCategory";
import InfoSection from "../InfoSection/InfoSection";

const ProductsLists = ({ searchQuery,setSearchQuery }) => {
  return (
    <div>
      <div className="bg-white">
        <TopCarousel />
        
        <BlogPro searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <InfoSection />
      </div>
    </div>
  );
};

export default ProductsLists;
