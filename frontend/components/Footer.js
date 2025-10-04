export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12 text-center text-gray-600">
      <p>© {new Date().getFullYear()} Campus Passport. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mt-2">
        <a href="https://github.com/yourrepo" target="_blank" className="hover:text-blue-600">GitHub</a>
        <a href="https://twitter.com" target="_blank" className="hover:text-blue-600">Twitter</a>
      </div>
    </footer>
  );
}
