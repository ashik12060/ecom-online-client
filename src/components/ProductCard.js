

// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProductCard = ({
//   id,
//   title,
//   price,
//   variants,
//   onImageLoad
// }) => {
//   const history = useNavigate();
//   const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

//   // Get first variant image if exists
//   const firstVariantImageUrl =
//     variants && variants.length > 0 ? variants[0].imageUrl : "";

//   // Optimize Cloudinary URL for thumbnail size
//   const optimizedImageUrl = firstVariantImageUrl
//     ? firstVariantImageUrl.replace(
//         "/upload/",
//         "/upload/w_300,h_300,q_auto,f_auto/"
//       )
//     : "/default-image.jpg";

//   const addToCart = () => {
//     if (isAuthenticated) {
//       history("/singlepro");
//     } else {
//       history("/login");
//     }
//   };

//   return (
//     <div className="w-full p-2 shadow-md rounded-lg bg-white flex flex-col">
//       <Link to={`/product/${id}`}>
//         <img
//           loading="lazy"
//           className="w-full h-72 object-cover rounded-md"
//           src={optimizedImageUrl}
//           alt={title}
//           onLoad={onImageLoad} 
          
//         />
//       </Link>

//       <p className="pt-2 text-lg font-serif text-gray-800 truncate">{title}</p>
//       <p className="text-lg font-mono">৳ {price}</p>
//     </div>
//   );
// };

// export default ProductCard;



import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductCard = ({
  id,
  title,
  price,
  variants,
  onImageLoad
}) => {
  const history = useNavigate();
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

  // Get first variant image if exists
  const firstVariantImageUrl =
    variants && variants.length > 0 ? variants[0].imageUrl : "";

  // Optimize Cloudinary URL for thumbnail size
  const optimizedImageUrl = firstVariantImageUrl
    ? firstVariantImageUrl.replace(
        "/upload/",
        "/upload/w_300,h_300,q_auto,f_auto/"
      )
    : "/default-image.jpg";

  const addToCart = () => {
    if (isAuthenticated) {
      history("/singlepro");
    } else {
      history("/login");
    }
  };

  return (
    <div className="w-full p-2 shadow-md rounded-lg bg-white flex flex-col hover:shadow-lg transition border border-purple-200">
      <Link to={`/product/${id}`}>
        <img
          loading="lazy"
          className="w-full h-72 object-cover rounded-md"
          src={optimizedImageUrl}
          alt={title}
          onLoad={onImageLoad}
        />
      </Link>

      <p className="pt-2 text-lg font-serif text-gray-800 truncate">{title}</p>
      <p className="text-lg font-mono text-purple-600">${price}</p>
      <Link  to={`/product/${id}`} className="bg-purple-600 text-white p-2 rounded">Buy Now</Link>
    </div>
  );
};

export default ProductCard;
