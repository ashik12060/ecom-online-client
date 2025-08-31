import React, { useState, useEffect } from 'react';
import axiosInstance from '../pages/axiosInstance';

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/attendance/report`);
        setAttendanceData(response.data);
      } catch (err) {
        setError('Failed to fetch attendance data.');
      }
    };

    fetchAttendance();
  }, []);

  // Function to calculate total time in hours, minutes, and seconds (without decimals)
  const calculateTotalTime = (checkInTime, checkOutTime) => {
    if (!checkInTime || !checkOutTime) return 'N/A';

    const checkIn = new Date(checkInTime);
    const checkOut = new Date(checkOutTime);
    
    // Calculate the difference in seconds
    const totalSeconds = (checkOut - checkIn) / 1000; // Difference in seconds

    const hours = Math.floor(totalSeconds / 3600); // Extract hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Extract minutes
    const seconds = Math.floor(totalSeconds % 60); // Extract seconds

    // Return formatted time (no decimal places for minutes)
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="attendance-report py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">All Employees Attendance Report</h2>
      {attendanceData.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-4 text-left">Employee Name</th>
              <th className="px-6 py-4 text-left">Check-In Time</th>
              <th className="px-6 py-4 text-left">Check-Out Time</th>
              <th className="px-6 py-4 text-left">Total Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index} className="hover:bg-white">
                <td className="px-6 py-4">{record.employeeId.name}</td>
                <td className="px-6 py-4">{new Date(record.checkInTime).toLocaleString()}</td>
                <td className="px-6 py-4">
                  {record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : 'Not yet checked out'}
                </td>
                <td className="px-6 py-4">
                  {calculateTotalTime(record.checkInTime, record.checkOutTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceReport;
