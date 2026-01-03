import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api";
import "./PayrollPage.css";

function PayrollPage({ user, onLogout }) {
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    api.get("/payroll/me").then((res) => setPayroll(res.data));
  }, []);

  return (
    <Layout user={user} onLogout={onLogout} title="Payroll">
      <div className="pay-root">
        <div className="pay-container">
          <div className="pay-card">
            {payroll ? (
              <>
                <div className="pay-row">
                  <span className="pay-label">Month</span>
                  <span className="pay-value">{payroll.month}</span>
                </div>
                <div className="pay-row">
                  <span className="pay-label">Basic</span>
                  <span className="pay-value">₹{payroll.basic}</span>
                </div>
                <div className="pay-row">
                  <span className="pay-label">Net</span>
                  <span className="pay-value">₹{payroll.net}</span>
                </div>
              </>
            ) : (
              <p>Loading payroll info...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PayrollPage;
