export default async function fetcher(url: string) {
    return await (await fetch(url)).text();
}
