async function getDataFromApi() {
  const response = await fetch(
    "https://loainguycap.ceid.gov.vn/api/loaicongbo?paginate=true&page=1&perpage=18"
  );
  const jsonData = await response.json();
  
  return jsonData;
}
export default getDataFromApi;