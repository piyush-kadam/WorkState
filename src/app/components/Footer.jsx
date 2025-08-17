// app/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 text-center">
      <p className="text-sm">© {new Date().getFullYear()} WorkState. All rights reserved.</p>
    </footer>
  );
}
