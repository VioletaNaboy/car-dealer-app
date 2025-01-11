import Link from 'next/link';
import { fetchVehicles, fetchMakesAndYear } from '@/app/actions/getData';

export async function generateStaticParams() {
  const { makes, years } = await fetchMakesAndYear();

  return makes.flatMap((make) =>
    years.map((year) => ({
      make: make.id.toString(),
      year: year.toString(),
    }))
  );
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = await params;
  const vehicles = await fetchVehicles(makeId, year);
  const make = vehicles?.[0]?.makeName;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600/80 text-center sm:text-left">
        {make ? `${make} ${year}` : 'No vehicles found'}
      </h1>
      <Link
        href="/"
        className={`w-2/3 max-w-md text-center inline-flex items-center justify-center rounded-md px-4 py-2 text-m font-medium text-blue-600 bg-blue-50 ring-blue-500 ring-1 ring-inset`}
      >
        {'<'} Return to search
      </Link>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {vehicles?.map((v) => (
          <li
            key={v.id}
            className="p-6 border rounded-lg shadow-md bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800/90">
              {v.name}
            </h2>
            <span className="block text-gray-600/70 text-sm">{v.makeName}</span>
            <span className="block text-gray-500/50 text-xs">{year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
