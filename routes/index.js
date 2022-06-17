import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../src/containers/home"
import Form from '../src/containers/form';
import List from '../src/containers/list';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#64acbe',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="Form" component={Form} options={{ title: 'Form' }} />
            <Stack.Screen name="List" component={List} options={{ title: `Saved Data's` }} />
        </Stack.Navigator>
    )
}

export default MainNavigator;