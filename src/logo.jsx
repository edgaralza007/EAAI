import React from "react";

export default function Logo({ size = 32 }) {
  return (
    <img
      src="/logo.png"     // served from public/
      alt="EA AI Logo"
      style={{ height: size, width: "auto" }}
    />
  );
}