import Employee from '../models/Employee.js';

export const generateEmployeeId = async (companyCode, firstName, lastName, year) => {
  const fn = (firstName || '').toUpperCase();
  const ln = (lastName || '').toUpperCase();
  const nameCode = fn.slice(0, 2) + ln.slice(0, 2); // First 2 letters of first + last
  const yearNum = Number(year);

  // Find max serial for given year
  const latest = await Employee.find({ yearOfJoining: yearNum })
    .sort({ serialNo: -1 })
    .limit(1);

  const nextSerial = latest.length ? latest[0].serialNo + 1 : 1;
  const serialStr = String(nextSerial).padStart(4, '0');

  const employeeId = `${companyCode}${nameCode}${yearNum}${serialStr}`;
  return { employeeId, serialNo: nextSerial };
};
