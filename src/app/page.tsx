import { Suspense } from "react";
import { FilterPage } from "./components/FilterPage";
import { Loading } from "./components/Loading";
export default function Home() {

  return (
    <main className="p-24 pb-48">
      <Suspense fallback={<Loading />}>
        <FilterPage />
      </Suspense>
    </main>
  );
}
