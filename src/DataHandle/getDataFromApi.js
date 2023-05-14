import getRoute from "../router"
async function getDataFromApi() {
  
  const response = await fetch(getRoute("all"));
  const jsonData = await response.json();
  return jsonData;
}
export default getDataFromApi;