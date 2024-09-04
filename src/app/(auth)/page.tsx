export default function Page() {
  return (
    <div className="h-screen">
      <main className="flex flex-col  md:flex-row h-full">
        <div className="flex flex-auto justify-center items-center border-2 h-full">
          logo
        </div>
        <div className="flex flex-auto justify-center items-center border-2 h-full">
          login
        </div>
      </main>
      <footer className="flex-auto border-2">footer</footer>
    </div>
  );
}
