const endpoint = "https://loainguycap.ceid.gov.vn/api/"
const routerObject = {
    all: "loaicongbo?paginate=true&page=1&perpage=18",
    domain:"https://loainguycap.ceid.gov.vn"
}


function getRoute(param) {
    if(param === "domain"){
        return routerObject["domain"];
    }
    return endpoint + routerObject[param];
}
export default getRoute;