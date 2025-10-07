import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo.png";
import { ModeToggle } from "./mode-toggle";
import { authApi, useLogOutMutation, useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { UserRole } from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "public" },
  { href: "/tours", label: "Tours", role: "public" },
  { href: "/about", label: "About", role: "public" },
  { href: "/admin", label: "Dashboard", role: UserRole.superAdmin },
  { href: "/user", label: "Dashboard", role: UserRole.user },
];

export default function Navbar() {
  const { data } = useUserInfoQuery({});
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    await logout({});
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label} </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <img src={Logo} alt="Logo" className="h-14 w-14" />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.role === "public" && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.role && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
         { data?.data?.name && <Link to="/profile">
            <h4 className="w-10 h-10 border rounded-full flex items-center justify-center bg-primary">{data?.data?.name.split(" ")[0].charAt(0)}</h4>
          </Link>}

          <ModeToggle />
          {data?.data?.email ? (
            <Button className="cursor-pointer" variant={"outline"} onClick={handleLogOut}>
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm cursor-pointer">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
