import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/navigation";

const navItems = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create",
    route: "/create",
  },
  {
    label: "Dashboard",
    route: "/dashboard",
  },
];

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const router = useRouter();

  return (
    <div className="h-[5vh] w-full flex flex-col justify-center items-center">
      <h2>supathread</h2>
    </div>
  );
}
