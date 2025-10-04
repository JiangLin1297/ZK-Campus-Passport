import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    Campus Passport
                </Link>
                <div className="flex space-x-6 items-center">
                    <Link href="/events" className="hover:text-blue-600">赛事</Link>
                    <Link href="/profile" className="hover:text-blue-600">我的</Link>
                    <Link href="/about" className="hover:text-blue-600">关于</Link>
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
}
