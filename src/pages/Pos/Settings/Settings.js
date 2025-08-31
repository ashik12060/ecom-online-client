import React, { useState } from 'react';

function Settings() {
  const [shopId, setShopId] = useState('CA01');
  const [isVatAfterDiscount, setIsVatAfterDiscount] = useState(false);
  const [isLargeInvoice, setIsLargeInvoice] = useState(false);
  const [decimalLength, setDecimalLength] = useState(2);
  const [attendanceRequire, setAttendanceRequire] = useState(false);
  const [isSupplierWiseStock, setIsSupplierWiseStock] = useState(true);
  const [saleDeleteRequiredPassword, setSaleDeleteRequiredPassword] = useState(true);
  const [isIncludingVat, setIsIncludingVat] = useState(false);
  const [isTouchSales, setIsTouchSales] = useState(false);
  const [enableBargainSales, setEnableBargainSales] = useState(false);
  const [enableSDCIntegration, setEnableSDCIntegration] = useState(false);
  const [defaultSDCVatCode, setDefaultSDCVatCode] = useState('');
  const [defaultSDCSDCCode, setDefaultSDCSDCCode] = useState('');
  const [salesDateOverride, setSalesDateOverride] = useState(false);
  const [dayStart, setDayStart] = useState('00:00');
  const [dayEnd, setDayEnd] = useState('23:59');
  const [multipleBarcode, setMultipleBarcode] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
          Software Settings
        </h2>
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shop ID */}
          <div className="flex flex-col">
            <label htmlFor="shopId" className="text-sm font-medium text-gray-600 mb-1">
              Shop ID
            </label>
            <input
              type="text"
              id="shopId"
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Is VAT After Discount */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              VAT After Discount
            </label>
            <input
              type="checkbox"
              checked={isVatAfterDiscount}
              onChange={() => setIsVatAfterDiscount(!isVatAfterDiscount)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Is Large Invoice */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Is Large Invoice
            </label>
            <input
              type="checkbox"
              checked={isLargeInvoice}
              onChange={() => setIsLargeInvoice(!isLargeInvoice)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Decimal Length */}
          <div className="flex flex-col">
            <label htmlFor="decimalLength" className="text-sm font-medium text-gray-600 mb-1">
              Decimal Length
            </label>
            <input
              type="number"
              id="decimalLength"
              value={decimalLength}
              onChange={(e) => setDecimalLength(e.target.value)}
              className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Attendance Required */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Attendance Required
            </label>
            <input
              type="checkbox"
              checked={attendanceRequire}
              onChange={() => setAttendanceRequire(!attendanceRequire)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Supplier Wise Stock */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Supplier Wise Stock
            </label>
            <input
              type="checkbox"
              checked={isSupplierWiseStock}
              onChange={() => setIsSupplierWiseStock(!isSupplierWiseStock)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Sale Delete Required Password */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Sale Delete Required Password
            </label>
            <input
              type="checkbox"
              checked={saleDeleteRequiredPassword}
              onChange={() => setSaleDeleteRequiredPassword(!saleDeleteRequiredPassword)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Including VAT */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Including VAT
            </label>
            <input
              type="checkbox"
              checked={isIncludingVat}
              onChange={() => setIsIncludingVat(!isIncludingVat)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Touch Sales */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Touch Sales
            </label>
            <input
              type="checkbox"
              checked={isTouchSales}
              onChange={() => setIsTouchSales(!isTouchSales)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Enable SDC Integration */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Enable SDC Integration
            </label>
            <input
              type="checkbox"
              checked={enableSDCIntegration}
              onChange={() => setEnableSDCIntegration(!enableSDCIntegration)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          {/* Default SDC VAT Code */}
          <div className="flex flex-col">
            <label htmlFor="defaultSDCVatCode" className="text-sm font-medium text-gray-600 mb-1">
              Default SDC VAT Code
            </label>
            <input
              type="text"
              id="defaultSDCVatCode"
              value={defaultSDCVatCode}
              onChange={(e) => setDefaultSDCVatCode(e.target.value)}
              className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Day Start */}
          <div className="flex flex-col">
            <label htmlFor="dayStart" className="text-sm font-medium text-gray-600 mb-1">
              Day Start
            </label>
            <input
              type="time"
              id="dayStart"
              value={dayStart}
              onChange={(e) => setDayStart(e.target.value)}
              className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Day End */}
          <div className="flex flex-col">
            <label htmlFor="dayEnd" className="text-sm font-medium text-gray-600 mb-1">
              Day End
            </label>
            <input
              type="time"
              id="dayEnd"
              value={dayEnd}
              onChange={(e) => setDayEnd(e.target.value)}
              className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Multiple Barcode */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-600 mr-2">
              Multiple Barcode
            </label>
            <input
              type="checkbox"
              checked={multipleBarcode}
              onChange={() => setMultipleBarcode(!multipleBarcode)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </form>
        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button className="px-4 py-2 bg-white0 text-white rounded-md hover:bg-white">
            Back
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
