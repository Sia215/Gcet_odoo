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
            <div className="pay-header">
              <div>
                <div className="pay-company">Your Company Pvt. Ltd.</div>
                <div className="pay-subtitle">Salary slip</div>
              </div>
              <div className="pay-emp">
                <div className="pay-emp-label">Employee</div>
                <div className="pay-emp-value">{user?.email}</div>
              </div>
            </div>

            {payroll ? (
              <>
                <div className="pay-section">
                  <div className="pay-row">
                    <span className="pay-label">Month</span>
                    <span className="pay-value">{payroll.month}</span>
                  </div>
                </div>

                <div className="pay-section">
                  <div className="pay-row">
                    <span className="pay-label">Basic salary</span>
                    <span className="pay-value">₹{payroll.basic}</span>
                  </div>
                  <div className="pay-row">
                    <span className="pay-label">Allowances</span>
                    <span className="pay-value">₹0</span>
                  </div>
                </div>

                <div className="pay-section pay-total">
                  <div className="pay-row">
                    <span className="pay-label">Net pay</span>
                    <span className="pay-value">₹{payroll.net}</span>
                  </div>
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
