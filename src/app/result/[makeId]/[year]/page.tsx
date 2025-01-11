import { fetchVehicles, fetchMakesAndYear } from "@/app/actions/getData";


export async function generateStaticParams() {
    const { makes, years } = await fetchMakesAndYear()

    return makes.flatMap((make) =>
        years.map((year) => ({
            make: make.id.toString(),
            year: year.toString(),
        }))
    );
}

export default async function ResultPage({
    params
}: {
    params: Promise<{ makeId: string; year: string }>
}) {
    const { makeId, year } = await params
    const vehicles = await fetchVehicles(makeId, year)
    const make = vehicles?.[0]?.makeName;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>{`${make} ${" "} ${year}`}</h1>
                <ul className="flex flex-row gap-8 row-start-2 items-center">
                    {vehicles?.map((v) => <li key={v.id}>
                        <h2>{v.name}</h2>
                        <span>{v.makeName}</span>
                        <span>{year}</span>
                    </li>)}
                </ul>
            </main>
        </div>
    );
}
