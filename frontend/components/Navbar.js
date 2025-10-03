// frontend/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/events">Events</Link> |{" "}
      <Link href="/profile">Profile</Link> |{" "}
      <Link href="/organizer">Organizer</Link>
    </nav>
  );
}
