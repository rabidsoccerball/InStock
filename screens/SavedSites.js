import { useEffect, useState } from "react"
import SiteList from "../components/Sites/SiteList"
import { useIsFocused } from "@react-navigation/native"
import { fetchSites } from "../util/http"
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

function SavedSites({route}) {
    const [loadedSites, setLoadedSites] = useState([])
    
    const authCtx = useContext(AuthContext)

    const userId = authCtx.userId

    const isFocused = useIsFocused()
    useEffect(() => {
        async function loadSites() {
            const sites = await fetchSites(userId);
            setLoadedSites(sites);
        }
        if (isFocused){
            loadSites();
        }
    }, [isFocused, userId])

    return <SiteList Sites={loadedSites}/>
}

export default SavedSites