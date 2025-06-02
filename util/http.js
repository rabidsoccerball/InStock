import axios from 'axios'

const BACKEND_URL = 'https://instock-a028c-default-rtdb.firebaseio.com'


export function storeSite(site, user) {
    axios.post(
        BACKEND_URL + `/${user}/sites.json`,
        site
    )
}

export async function fetchSites(user) {
    const response = await axios.get(
        BACKEND_URL + `/${user}/sites.json`
    );
    const sites = [];
    for(const key in response.data){

        const siteObj = {
            id: key,
            url: response.data[key].url,
            title: response.data[key].title,
            name: key,

        }
        sites.push(siteObj)
    }
    return sites
}


export async function deleteSite(id, user) {
    return axios.delete(BACKEND_URL + `/${user}/sites/${id}.json`);
}



