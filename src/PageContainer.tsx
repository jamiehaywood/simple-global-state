import React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: "100%", display: "flex", textAlign: "center" }}>
    <div style={{ margin: "auto" }}>
      <>{children}</>
    </div>
  </div>
);
