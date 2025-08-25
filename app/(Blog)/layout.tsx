import { BlogNavBar } from "@/components/shared/Navbar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <BlogNavBar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
