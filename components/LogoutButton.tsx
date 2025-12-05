'use client'
import { LoaderIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        await authClient.signOut();
        setIsLoading(false);
        toast("User logout successfully.");
        router.push("/");
    }

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
        {!isLoading ? <LogOutIcon /> : <LoaderIcon className="animate-spin" /> }
        {!isLoading && "Logout"}
    </Button>
  )
}

export default LogoutButton