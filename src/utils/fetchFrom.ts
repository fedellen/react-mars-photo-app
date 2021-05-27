/** Get json from REST API */
export default async function fetchFrom(url: string) {
  return (await fetch(url)).json();
}
