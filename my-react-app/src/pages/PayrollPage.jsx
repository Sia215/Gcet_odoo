import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";

function PayrollPage({ user, onLogout }) {
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    api.get("/payroll/me").then((res) => setPayroll(res.data));
  }, []);

  return (
    <Layout user={user} onLogout={onLogout} title="Payroll">
      <div className="card max-w-md">
        {payroll ? (
          <>
            <p className="mb-2 text-sm">Month: {payroll.month}</p>
            <p className="mb-2 text-sm">Basic: ₹{payroll.basic}</p>
            <p className="mb-2 text-sm">Net: ₹{payroll.net}</p>
          </>
        ) : (
          <p className="text-sm">Loading payroll info...</p>
        )}
      </div>
    </Layout>
  );
}

export default PayrollPage;
