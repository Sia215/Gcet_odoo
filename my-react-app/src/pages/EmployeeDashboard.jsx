import NavBar from '../components/NavBar';

export default function EmployeeDashboard() {
  const employeeId = localStorage.getItem('employeeId');
  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Dashboard</h2>
        <p><b>Employee ID:</b> {employeeId}</p>
        <ul>
          <li><b>Profile:</b> view basic info</li>
          <li><b>Attendance:</b> mark and view day-wise</li>
          <li><b>Payslips:</b> coming soon (based on attendance)</li>
          <li><b>Announcements:</b> static demo</li>
        </ul>
      </div>
    </div>
  );
}
