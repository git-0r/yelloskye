import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { signOut } from "@/lib/firebase/auth";
import Link from "next/link";
import { Bird } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { user } = useAuth();
  const path = usePathname();

  if (!user || path === "/signin" || path === "/signup") return null;

  return (
    <nav className="border-b py-4 mb-8 flex items-center">
      <Link
        href="/"
        className="font-bold text-lg font-[cursive] flex flex-row gap-1 text-primary"
      >
        <Bird />
        Yello Skye
      </Link>
      <ul className="flex items-center ml-auto gap-4">
        <li>
          <Link href="/analytics">Analytics</Link>
        </li>
        <li>
          <Link href="/project-map">Map</Link>
        </li>
        <li>
          <Button onClick={signOut} variant="ghost" className="ml-auto block">
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}
