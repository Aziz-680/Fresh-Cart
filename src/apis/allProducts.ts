export default async function getAllProducts() {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error(`Unable to load products (${response.status}).`);
    }

    const { data } = await response.json();
    return data;
}
