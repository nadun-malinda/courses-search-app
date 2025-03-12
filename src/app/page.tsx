import { Search } from "@/components/search/search";
import { type QueryParams } from "@/types/filters";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const urlSearchParams = await searchParams;

  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <Search urlSearchParams={urlSearchParams} />
    </div>
  );
}
