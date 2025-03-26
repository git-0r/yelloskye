"use client";

import { Button } from "@/components/ui/button";
import WithAuth from "@/components/with-auth";
import { signOut } from "@/lib/firebase/auth";

function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Button onClick={signOut}>Logout</Button>
    </main>
  );
}

export default WithAuth(Home);
