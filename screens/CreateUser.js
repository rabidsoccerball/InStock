import { useNavigation } from "@react-navigation/native";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";


function CreateUser(){
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext)

    async function CreateHandler({email, password}){

        try{
            const {token, userId} = await createUser(email, password);
            authCtx.authenticate(token, userId);
        } catch (error) {
            Alert.alert(
                'Authentication failed',
                'Could not create user, please check your input and try again later'
            )
        }
    }

    return(
    <AuthContent onAuthenticate={CreateHandler}/>
    )
}

export default CreateUser