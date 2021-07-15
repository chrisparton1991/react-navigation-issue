import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {createContext, useContext, useState} from 'react';
import {Button, Text} from 'react-native';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StateContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: (b: boolean) => void;
}>({loggedIn: false, setLoggedIn: () => {}});

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <StateContext.Provider value={{loggedIn, setLoggedIn}}>
      <NavigationContainer>
        {!loggedIn ? (
          <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogInScreen} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </StateContext.Provider>
  );
}

function LogInScreen() {
  const {setLoggedIn} = useContext(StateContext);
  return <Button title="Log in" onPress={() => setLoggedIn(true)} />;
}

function HomeScreen() {
  return <Text>Home Screen</Text>;
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function ProfileScreen({navigation}: any) {
  const {setLoggedIn} = useContext(StateContext);

  return (
    <>
      <Text>Profile Screen</Text>
      <Button title="Log out (Profile)" onPress={() => setLoggedIn(false)} />
      <Button
        title="To Settings"
        onPress={() => navigation.navigate('Settings', {})}
      />
    </>
  );
}

function SettingsScreen() {
  const {setLoggedIn} = useContext(StateContext);
  return (
    <Button title="Log out (Settings)" onPress={() => setLoggedIn(false)} />
  );
}
