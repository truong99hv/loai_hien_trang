import getRoute from "../const/api"
async function getDataFromApi(param, filter) {
  const response = await fetch(getRoute(param, filter));
  const jsonData = await response.json();
  return jsonData;
}
export default getDataFromApi;