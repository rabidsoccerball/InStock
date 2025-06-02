import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SavedSites from './screens/SavedSites';
import AddSites from './screens/AddSites'
import SpecialButton from './components/ui/SpecialButton';
import CreateUser from './screens/CreateUser';
import LoginScreen from './screens/LoginScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

function UserAuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#B99770' },
      headerTintColor: '#670000',
      contentStyle: { backgroundColor: '#efe1c2' }
    }}>

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={CreateUser} />

    </Stack.Navigator>
  )
}


function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#B99770' },
      headerTintColor: '#670000',
      contentStyle: { backgroundColor: '#efe1c2' }
    }}>

      <Stack.Screen name="SavedSites" component={SavedSites} options={({ navigation }) => ({
        title: 'Your saved Sites',
        headerLeft: ({ tintColor }) => <SpecialButton icon="exit" size={24} color={tintColor} onPress={() => authCtx.logout()} />,
        headerRight: ({ tintColor }) => <SpecialButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddSites")} />,
        headerTitleAlign: 'center'
      })} />
      <Stack.Screen name="AddSites" component={AddSites} options={{ title: 'Add a new Site' }} />

    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <UserAuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

