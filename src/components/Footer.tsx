export default function Footer() {
  return (
    <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} CTF System — All rights reserved.</p>
    </footer>
  );
}