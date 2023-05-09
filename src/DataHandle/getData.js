import getRoute from "../router";
import { useEffect, useState } from "react";

const GetRawData = (source) => {
    const [rawData, setRawData] = useState([]);
    const [total, setTotal] = useState("");
    // const [loading, setLoading] = useState("true");


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(getRoute(source));
                const json = await response.json();
                let data = json.list;
                setRawData(data);
                setTotal(json.pagination.total);
            } catch (error) {
                console.log("error", error);
            };
        }
        getData();
    }, []);
    let data = [];
    data.push(rawData);
    data.push(total);
    return { data };
};

export default GetRawData;

