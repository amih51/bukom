import SearchField from "@/components/search-field";
import CategorySelect from "./category-select";

export default function Header() {
  return (
    <header className="mt-6">
      <div className="mb-3 text-3xl">Home</div>
      <div className="mb-3 rounded-xl bg-secondary">
        <SearchField />
      </div>
      <div className="mb-1">
        <CategorySelect />
      </div>
    </header>
  );
}