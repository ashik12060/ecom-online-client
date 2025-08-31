import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import axiosInstance from "../../pages/axiosInstance";

const TopCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopBanners = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/topBanners/show`
        );

        if (response.data.success) {
          setBanners(response.data.topBanners || []);
        } else {
          setError("Failed to load banners.");
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("An error occurred while fetching banners.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopBanners();
  }, []);

  if (loading) {
    return <div>Loading banners...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {banners && banners.length > 0 ? (
        <Swiper
          modules={[Autoplay]} // Removed Navigation here
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="bg-white rounded-lg shadow-md border lg:w-[800px] mx-auto border-gray-200">
                <img
                  src={banner.image && banner.image.url ? banner.image.url : ""}
                  alt={banner.title || "Banner"}
                  className="mx-auto w-full h-[300px] sm:h-[400px] object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No banners available.</p>
      )}
    </div>
  );
};

export default TopCarousel;
