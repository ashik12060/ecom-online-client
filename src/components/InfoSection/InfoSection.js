import React from "react";

const InfoSection = () => {
  const infoItems = [
    {
      icon: "🚚",
      title: "Shipping",
      description: "worldwide shipping available",
    },
    {
      icon: "🔒",
      title: "Safe Payment",
      description: "100% secure payment",
    },
    {
      icon: "💬",
      title: "Customer Support",
      description: "11:30 - 9:30\nMon - Sat",
    },
    {
      icon: "💵",
      title: "Return Policy",
      description: "2 weeks return and exchange",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center sm:justify-between bg-white px-4 sm:px-8 py-6 text- ">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="w-1/2 sm:w-1/4 mb-6 sm:mb-0 gap-2 flex flex-row justify-center items-center text-black font-serif px-4 border-e border-black"
        >
          <div className="text-3xl text-black">{item.icon}</div>
          <div className="text-justify">
            <h5 className="font-semibold mt-2">{item.title}</h5>
            <p className="text-sm whitespace-pre-line">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
