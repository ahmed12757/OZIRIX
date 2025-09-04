import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary-950 block text-gray-200 py-4  shadow-primary-800">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}
