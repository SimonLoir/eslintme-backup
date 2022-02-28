export default async function fetcher(url: string) {
    const result = await fetch(url);
    if (result.status != 200) throw 'http error';
    return await result.text();
}
