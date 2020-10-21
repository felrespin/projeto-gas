import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import RegistrationScreen from './RegistrationScreen'
import CepScreen from './CepScreen'

const Routes = () => {
    const { Navigator, Screen } = createStackNavigator();

    return ( <
        NavigationContainer >
        <
        Navigator screenOptions = {
            {
                headerShown: false,
                cardStyle: { backgroundColor: '#f2f3f5' },
            }
        } >
        <
        Screen name = "OrphanagesMap"
        component = { OrphanagesMap }
        /> < /
        Navigator > <
        /NavigationContainer>
    );
};

export default Routes;