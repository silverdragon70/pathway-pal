import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Library, Search, User } from "lucide-react";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/books", icon: BookOpen, label: "Books" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/library", icon: Library, label: "Library" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith("/mcq")) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-md">
      <nav className="bg-card rounded-3xl nav-shadow px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.path === "/books" && location.pathname.startsWith("/books"));
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl min-w-[56px] transition-all duration-150 ease-in-out active:scale-[0.96]
                ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium leading-none mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
