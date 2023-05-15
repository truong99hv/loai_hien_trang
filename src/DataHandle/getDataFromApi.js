import getRoute from "../router"
async function getDataFromApi(param) {
  const response = await fetch(getRoute(param));
  const jsonData = await response.json();
  return jsonData;
}
export default getDataFromApi;