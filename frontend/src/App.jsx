import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("https://invoice-app-rust-five.vercel.app/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Invoices</h1>

      {invoices.length === 0 ? (
        <p>Loading...</p>
      ) : (
        invoices.map((inv) => (
          <div key={inv._id} className="invoice">
            <h3>{inv.title}</h3>

            {/* Format date */}
            <p>
              Created:{" "}
              {new Date(inv.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))
      )}
    </>
  );
}

export default App;
