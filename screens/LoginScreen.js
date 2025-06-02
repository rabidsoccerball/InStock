import AuthContent from "../components/Auth/AuthContent"
import { useNavigation } from "@react-navigation/native";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

function LoginScreen(){
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);

    async function loginHandler({email, password}){
        try{
            const {token, userId} = await login(email, password);
            console.log(token, userId)
            authCtx.authenticate(token, userId)

        } catch {
            Alert.alert('failed to login')
        }

    }

    return(
    <AuthContent isLogin onAuthenticate={loginHandler} />
    )

}

export default LoginScreen