import SiteForm from "../components/Sites/SiteForm"
import { storeSite } from "../util/http";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";


function AddSite({navigation}) {
    const authCtx = useContext(AuthContext)

    const userId = authCtx.userId

    async function createSiteHandler(Site) {
        await storeSite(Site, userId)
        navigation.goBack();
    }

    return(
        <SiteForm onCreateSite={createSiteHandler} />
    )
}

export default AddSite