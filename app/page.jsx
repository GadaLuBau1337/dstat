"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("NORMAL");

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/traffic");
      const json = await res.json();

      setData((prev) => [...prev.slice(-30), json]);

      if (json.rps >= 50) setStatus("SPIKE");
      else if (json.rps >= 15) setStatus("HIGH");
      else setStatus("NORMAL");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>DSTAT Network</h1>
      <p style={{ color: "#aaa" }}>Public Website Traffic Monitor (per second)</p>

      <h2
        style={{
          marginTop: 20,
          color:
            status === "SPIKE"
              ? "red"
              : status === "HIGH"
              ? "orange"
              : "lime",
        }}
      >
        STATUS: {status}
      </h2>

      <div style={{ marginTop: 20 }}>
        {data.map((d, i) => (
          <div key={i}>
            {d.time} — {d.rps} req/s
          </div>
        ))}
      </div>

      <p style={{ marginTop: 30, fontSize: 12, color: "#666" }}>
        * Data hanya traffic ke website ini
      </p>
    </main>
  );
}
