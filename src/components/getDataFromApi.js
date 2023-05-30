import getRoute from "../const/api";
async function getDataFromApi(param, filter) {
  console.log("aa");
  const response = await fetch(getRoute(param, filter));
  const jsonData = await response.json();
  return jsonData;
}
export default getDataFromApi;
