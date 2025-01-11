'use server'

interface Make {
    "MakeId": number,
    "MakeName": string,
    "VehicleTypeId": number,
    "VehicleTypeName": string
}

interface HandledMake {
    "id": number,
    "name": string
}

interface Vehicles {
    "Make_ID": number,
    "Make_Name": string,
    "Model_ID": number,
    "Model_Name": string
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
        const makes: HandledMake[] = results.map(({ MakeId, MakeName }) => ({
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

export const fetchVehicles = async (makeId: string, year: string) => {
    try {
        const url = process.env.URL;
        if (!url) {
            throw new Error('URL is not defined');
        }

        const response = await fetch(`${url}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const vehiclesData = await response.json();
        const results: Vehicles[] = vehiclesData.Results;
        const vehicles = results.map(({ Model_ID, Model_Name, Make_Name }) => ({
            id: Model_ID,
            name: Model_Name,
            makeName: Make_Name,

        }));

        return vehicles;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
}