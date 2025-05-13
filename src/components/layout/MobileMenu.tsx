
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
};

type MobileMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  navItems: NavItem[];
};

export default function MobileMenu({ open, setOpen, navItems }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle>
              <div className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                BeautyCrossAsia
              </div>
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <nav className="flex flex-col p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-border pt-6">
            <Link 
              to="/account"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full p-3 border border-input rounded-md hover:bg-accent transition-colors"
            >
              Account
            </Link>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Link 
                to="/account/orders"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-3 border border-input rounded-md text-sm hover:bg-accent transition-colors"
              >
                My Orders
              </Link>
              <Link 
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-3 border border-input rounded-md text-sm hover:bg-accent transition-colors"
              >
                Cart
              </Link>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
