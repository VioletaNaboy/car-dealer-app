'use server'
interface Make {
    "MakeId": number,
    "MakeName": string,
    "VehicleTypeId": number,
    "VehicleTypeName": string
}

export const fetchMakesAndYear = async () => {
    try {
        const url = process.env.URL;
        if (!url) {
            throw new Error('URL is not defined');
        }

        const startYear = 2015;
        const response = await fetch(`${url}GetMakesForVehicleType/car?format=json`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const makesArray = await response.json();
        const results: Make[] = makesArray.Results;
        const makes = results.map(({ MakeId, MakeName }) => ({
            id: MakeId,
            name: MakeName,
        }));

        const years = Array.from({ length: new Date().getFullYear() - startYear + 1 }, (_, i) => startYear + i);

        return { makes, years };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { makes: [], years: [] };
    }
}