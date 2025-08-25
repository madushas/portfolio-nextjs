import Navbar from "@/components/shared/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
  <Navbar />
      <div className="flex min-h-screen flex-col">
        {children}
      </div>
    </>
  );
}
