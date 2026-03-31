"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-6 hidden md:flex md:flex-col bg-[#FFFFFF] w-[280px] shrink-0 border-r border-slate-100 shadow-[4px_0_24px_rgba(65,119,188,0.03)]",
        className
      )}
      animate={{
        width: animate ? (open ? "280px" : "85px") : "280px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        "h-16 px-6 flex flex-row md:hidden items-center justify-between bg-[#FFFFFF] border-b border-slate-100 w-full"
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <IconMenu2
          className="text-[#4177BC] cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className={cn(
              "fixed h-full w-full inset-0 bg-[#FFFFFF] p-8 z-[100] flex flex-col",
              className
            )}
          >
            <div
              className="absolute right-8 top-8 z-50 text-slate-400 cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-all"
              onClick={() => setOpen(!open)}
            >
              <IconX size={24} />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-3 px-4 rounded-xl transition-all duration-300 relative mb-1",
        isActive 
          ? "bg-[#4177BC]/10 text-[#4177BC]" 
          : "text-slate-500 hover:bg-slate-50 hover:text-[#4177BC]",
        className
      )}
      {...props}
    >
      {/* Active Indicator Dot */}
      {isActive && (
        <motion.div 
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6  rounded-r-full"
        />
      )}

      <div className={cn(
        "transition-colors duration-300",
        isActive ? "text-[#4177BC]" : "group-hover/sidebar:text-[#4177BC]"
      )}>
        {link.icon}
      </div>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "text-sm font-bold tracking-tight whitespace-pre transition-colors duration-300",
          isActive ? "text-black" : "text-slate-600 group-hover/sidebar:text-black"
        )}
      >
        {link.label}
      </motion.span>

      {/* Special Highlight for specific items if needed */}
      {isActive && open && (
        <div className="absolute right-4 w-1.5 h-1.5 rounded-full" />
      )}
    </Link>
  );
};