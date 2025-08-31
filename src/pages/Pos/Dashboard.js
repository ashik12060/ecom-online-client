// import React from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const sections = [
//     {
//       title: 'General',
//       items: [
//         { name: 'Counter', path: '/counter' },
//         // { name: 'Shop In/Out', path: '/shop-in-out' },
//         { name: 'User Permission', path: '/user-permission' },
//         { name: 'User Management', path: '/user-management' },
//         { name: 'Emp. Attendance ', path: '/attendance' },
//         { name: 'Settings', path: '/settings' },
//         { name: 'Group Setup', path: '/group-setup' },
//         { name: 'Brand Setup', path: '/brand-setup' },
//         // { name: 'Product Setup from Admin panel', path: '/product-information' },
//         { name: 'Supplier Setup ', path: '/supplier-setup' },
//         { name: 'Style Size', path: '/style-size' },
//         { name: 'Weighing Items', path: '/weighing-items' },
//         { name: 'Credit Cards', path: '/credit-cards' },
//       ],
//     },
//     {
//       title: 'Purchasing',
//       items: [
//         { name: 'Purchase Order ', path: '/purchase-order' },
//         { name: 'Purchase Receive ', path: '/purchase-receive' },
//         { name: 'Price Change', path: '/price-change' },
//         { name: 'Damage/Loss', path: '/damage-loss' },
//         { name: 'Supplier Return ', path: '/supplier-return' },
//         { name: 'Promotion', path: '/promotion' },
//         { name: 'Package', path: '/package' },
//         { name: 'Inventory', path: '/inventory' },
//         { name: 'Booking', path: '/booking' },
//       ],
//     },
//     {
//       title: 'Sales and Reports',
//       items: [
//         { name: 'Sales ', path: '/sales' },
//         { name: 'Warehouse Sales ', path: '/warehouse-sale' },
//         { name: 'Barcode Print  ', path: '/barcode-print' },
//         { name: 'Sub Barcode Print  ', path: '/sub-barcode-print' },
//         { name: 'Sales Cancel', path: '/sales-cancel' },
//         { name: 'Sales Report', path: '/sales-report' },
//         { name: 'Customer Report  ', path: '/customer-report' },
//         { name: 'C. Discount Rpt', path: '/c-discount-rpt' },
//         { name: 'P.O. Report', path: '/po-report' },
//         { name: 'Promotion', path: '/promotion-report' },
//         { name: 'Stock Report ', path: '/stock-report' },
//         { name: 'Vat Report', path: '/vat-report' },
//         { name: 'Package Report', path: '/package-report' },
//         { name: 'Receive Report', path: '/receive-report' },
//         { name: 'Invoice Report', path: '/invoice-report' },
//         { name: 'Invoice Reprint', path: '/invoice-reprint' },
//       ],
//     },
//     {
//       title: 'Employee Management',
//       items: [
//         { name: 'Employee Setup  ', path: '/employee-setup' },
//         { name: 'Customers Setup ', path: '/customer-setup' },
//         { name: 'Cust. Category ', path: '/cust-category' },
//         { name: 'Credit Collections', path: '/credit-collection' },
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen  bg-white p-4">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-4">
//         <Link to='/' className="text-lg font-bold">Home</Link>
//         <div className="flex items-center gap-4">
//           <span className="text-gray-700">Welcome Mehedi</span>
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//             <i className="fas fa-user"></i>
//           </div>
//           <button className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
//             <i className="fas fa-power-off"></i>
//           </button>
//         </div>
//       </header>

//       {/* Content */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 mx-auto  text-center justify-center ">
//         {sections.map((section, index) => (
//           <div key={index} className="bg-white shadow-lg rounded-lg p-2">
//             <h2 className="text-xs font-semibold mb-2">{section.title}</h2>
//             <ul className="grid grid-cols-2 gap-1">
//               {section.items.map((item, i) => (
//                 <li
//                   key={i}
//                   className="bg-sky-500 text-white text-center font-medium py-2 rounded-lg "
//                   style={{ height: '80px' }}
//                 >
//                   <Link to={item.path} className="flex items-center justify-center h-full">
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Dashboard = () => {
//   const location = useLocation();

//   const sections = [
//     {
//       title: 'General',
//       items: [
//          { name: 'Sales', path: '/sales' },
//         { name: 'Counter', path: '/counter' },
//         { name: 'User Permission', path: '/user-permission' },
//         { name: 'User Management', path: '/user-management' },
//         { name: 'Attendance', path: '/attendance' },
//         { name: 'Settings', path: '/settings' },
//         { name: 'Group Setup', path: '/group-setup' },
//         { name: 'Brand Setup', path: '/brand-setup' },
//         { name: 'Supplier Setup', path: '/supplier-setup' },
//         { name: 'Style Size', path: '/style-size' },
//         { name: 'Weighing Items', path: '/weighing-items' },
//         { name: 'Credit Cards', path: '/credit-cards' },
//       ],
//     },
//     {
//       title: 'Purchasing',
//       items: [
//         { name: 'Purchase Order', path: '/purchase-order' },
//         { name: 'Purchase Receive', path: '/purchase-receive' },
//         { name: 'Price Change', path: '/price-change' },
//         { name: 'Damage/Loss', path: '/damage-loss' },
//         { name: 'Supplier Return', path: '/supplier-return' },
//         { name: 'Promotion', path: '/promotion' },
//         { name: 'Package', path: '/package' },
//         { name: 'Inventory', path: '/inventory' },
//         { name: 'Booking', path: '/booking' },
//       ],
//     },
//     {
//       title: 'Sales & Reports',
//       items: [
//         { name: 'Sales', path: '/sales' },
//         { name: 'Warehouse Sales', path: '/warehouse-sale' },
//         { name: 'Barcode Print', path: '/barcode-print' },
//         { name: 'Sub Barcode Print', path: '/sub-barcode-print' },
//         { name: 'Sales Cancel', path: '/sales-cancel' },
//         { name: 'Sales Report', path: '/sales-report' },
//         { name: 'Customer Report', path: '/customer-report' },
//         { name: 'C. Discount Rpt', path: '/c-discount-rpt' },
//         { name: 'P.O. Report', path: '/po-report' },
//         { name: 'Promotion Rpt', path: '/promotion-report' },
//         { name: 'Stock Report', path: '/stock-report' },
//         { name: 'Vat Report', path: '/vat-report' },
//         { name: 'Package Report', path: '/package-report' },
//         { name: 'Receive Report', path: '/receive-report' },
//         { name: 'Invoice Report', path: '/invoice-report' },
//         { name: 'Invoice Reprint', path: '/invoice-reprint' },
//       ],
//     },
//     {
//       title: 'Employee Management',
//       items: [
//         { name: 'Employee Setup', path: '/employee-setup' },
//         { name: 'Customer Setup', path: '/customer-setup' },
//         { name: 'Cust. Category', path: '/cust-category' },
//         { name: 'Credit Collections', path: '/credit-collection' },
//       ],
//     },
//   ];

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-4 overflow-y-auto fixed h-full">
//         <div className="text-xl font-bold text-sky-600 mb-4">Dashboard</div>
//         {sections.map((section, idx) => (
//           <div key={idx} className="mb-4">
//             <h2 className="text-sm font-semibold text-gray-600 mb-2 border-b pb-1">{section.title}</h2>
//             <ul className="space-y-1">
//               {section.items.map((item, i) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <li key={i}>
//                     <Link
//                       to={item.path}
//                       className={`block px-3 py-2 rounded text-sm transition ${
//                         isActive
//                           ? 'bg-sky-500 text-white'
//                           : 'hover:bg-sky-100 hover:text-sky-700 text-gray-700'
//                       }`}
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         ))}
//       </aside>

//       {/* Main Content */}
//       <main className="ml-64 flex-1 p-6 overflow-y-auto">
//         <div className="text-2xl font-semibold text-sky-700 mb-4">Welcome, Mehedi</div>
//         <div className="text-gray-600">
//           Please select an option from the sidebar to begin managing your system.
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react'; // You can use heroicons or replace with text ▼/▶ if you prefer

const Dashboard = () => {
  const location = useLocation();

  const sections = [
    {
      title: 'General',
      items: [
        { name: 'Sales', path: '/sales' },
        { name: 'Counter', path: '/counter' },
        { name: 'User Permission', path: '/user-permission' },
        { name: 'User Management', path: '/user-management' },
        { name: 'Attendance', path: '/attendance' },
        { name: 'Settings', path: '/settings' },
        { name: 'Group Setup', path: '/group-setup' },
        { name: 'Brand Setup', path: '/brand-setup' },
        { name: 'Supplier Setup', path: '/supplier-setup' },
        { name: 'Style Size', path: '/style-size' },
        { name: 'Weighing Items', path: '/weighing-items' },
        { name: 'Credit Cards', path: '/credit-cards' },
      ],
    },
    {
      title: 'Purchasing',
      items: [
        { name: 'Purchase Order', path: '/purchase-order' },
        { name: 'Purchase Receive', path: '/purchase-receive' },
        { name: 'Price Change', path: '/price-change' },
        { name: 'Damage/Loss', path: '/damage-loss' },
        { name: 'Supplier Return', path: '/supplier-return' },
        { name: 'Promotion', path: '/promotion' },
        { name: 'Package', path: '/package' },
        { name: 'Inventory', path: '/inventory' },
        { name: 'Booking', path: '/booking' },
      ],
    },
    {
      title: 'Sales & Reports',
      items: [
        { name: 'Sales', path: '/sales' },
        { name: 'Warehouse Sales', path: '/warehouse-sale' },
        { name: 'Bashundhara Sales', path: '/badhundhara-sales' },
        { name: 'Barcode Print', path: '/barcode-print' },
        { name: 'Sub Barcode Print', path: '/sub-barcode-print' },
        { name: 'Sales Cancel', path: '/sales-cancel' },
        { name: 'Sales Report', path: '/sales-report' },
        { name: 'Customer Report', path: '/customer-report' },
        { name: 'C. Discount Rpt', path: '/c-discount-rpt' },
        { name: 'P.O. Report', path: '/po-report' },
        { name: 'Promotion Rpt', path: '/promotion-report' },
        { name: 'Stock Report', path: '/stock-report' },
        { name: 'Vat Report', path: '/vat-report' },
        { name: 'Package Report', path: '/package-report' },
        { name: 'Receive Report', path: '/receive-report' },
        { name: 'Invoice Report', path: '/invoice-report' },
        { name: 'Invoice Reprint', path: '/invoice-reprint' },
      ],
    },
    {
      title: 'Employee Management',
      items: [
        { name: 'Employee Setup', path: '/employee-setup' },
        { name: 'Customer Setup', path: '/customer-setup' },
        { name: 'Cust. Category', path: '/cust-category' },
        { name: 'Credit Collections', path: '/credit-collection' },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState(
    sections.reduce((acc, section) => {
      acc[section.title] = false;
      return acc;
    }, {})
  );

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 overflow-y-auto fixed h-full">
        <div className="text-xl font-bold text-sky-600 mb-4">Dashboard</div>
        {sections.map((section, idx) => (
          <div key={idx} className="mb-2">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-700 hover:text-sky-600 focus:outline-none"
            >
              {section.title}
              {openSections[section.title] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {openSections[section.title] && (
              <ul className="mt-1 pl-2 border-l border-gray-200">
                {section.items.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={i}>
                      <Link
                        to={item.path}
                        className={`block px-3 py-1 rounded text-sm transition ${
                          isActive
                            ? 'bg-sky-500 text-white'
                            : 'hover:bg-sky-100 hover:text-sky-700 text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 overflow-y-auto">
        <div className="text-2xl font-semibold text-sky-700 mb-4">Welcome,</div>
        <div className="text-gray-600">
          Please select an option from the sidebar to begin managing your system.
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
