export interface Brand {
    _id: string;
    name: string;
    image: string;
}

export default async function getAllBrands(): Promise<Brand[]> {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error(`Unable to load brands (${response.status}).`);
    }

    const { data } = await response.json();
    return data;
}
