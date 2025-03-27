import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Modify the HOC to handle components with any props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export default function withAuth<P extends object = {}>(
  Component: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user && !isLoading) {
        router.push("/signin");
      }
    }, [user, isLoading, router]);

    if (isLoading || (!user && !isLoading)) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="size-8 animate-spin" />
            <p className="text-2xl mt-2">Loading...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
