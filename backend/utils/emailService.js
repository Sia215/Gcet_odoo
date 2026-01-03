// Stubbed email service — replace with nodemailer or transactional API in production
export const sendCredentials = async ({ to, employeeId, tempPassword }) => {
  console.log(`Email to ${to}: EmployeeID=${employeeId}, TempPassword=${tempPassword}`);
  return true;
};
