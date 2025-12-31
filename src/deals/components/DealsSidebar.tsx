import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  href?: string;
}

const NavItem = ({ icon, label, active, href = "#" }: NavItemProps) => (
  <a
    href={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
      active
        ? "bg-sidebar-accent text-primary"
        : "text-sidebar-foreground hover:bg-muted"
    )}
  >
    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const DealsSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border h-full flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-primary size-10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-foreground" style={{ fontSize: 20 }}>
              local_offer
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-foreground text-base font-bold leading-normal">DealsHub</h1>
            <p className="text-muted-foreground text-sm font-normal leading-normal">Admin Console</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
        <NavItem icon="dashboard" label="Dashboard" />
        <NavItem icon="local_offer" label="Deals Management" active />
        <NavItem icon="shopping_bag" label="Orders" />
        <NavItem icon="group" label="Customers" />
        <NavItem icon="settings" label="Settings" />
      </nav>
      
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-muted-foreground hover:text-destructive transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>logout</span>
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DealsSidebar;
