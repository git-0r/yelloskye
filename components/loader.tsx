import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <Loader2 className="animate-spin" />
      Loading...
    </div>
  );
}
