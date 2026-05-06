export default function Footer() {
  return (
    <footer className="bg-white text-center py-4 text-sm text-gray-400 border-t">
      &copy; {new Date().getFullYear()} Technical Test - Developed by <a href="https://github.com/Rmdsketch" target="_blank" rel="noopener noreferrer" className="underline">Rmdsketch</a>
    </footer>
  );
}