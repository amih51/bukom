import Header from "./header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header /> {children}
    </div>
  );
}
