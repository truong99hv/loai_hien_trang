const endpoint = "https://loainguycap.ceid.gov.vn/api/"
const routerObject = {
    domain:"https://loainguycap.ceid.gov.vn"
}


function getRoute(param) {
    if(param === "domain"){
        return routerObject["domain"];
    }
    if(typeof(param) === "number"){
        return endpoint + "loaicongbo?paginate=true&page="+param+"&perpage=18";
        // return "https://loainguycap.ceid.gov.vn/api/loaicongbo?paginate=true&page="+param+"&perpage=18&loaihientrang_ids[]=3";
    }

    return endpoint + routerObject[param];
}
export default getRoute;