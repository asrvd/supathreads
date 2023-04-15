"use client";

import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#e4e4e7",
          color: "#18181b",
        },
      }}
    />
  );
}
