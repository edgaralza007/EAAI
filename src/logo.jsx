import React from "react";

export default function Logo({ size = 32 }) {
  return (
    <img
      src="/logo.png"     // served from public/
      alt="EAA Cap Logo"
      style={{ height: size, width: "auto" }}
    />
  );
}