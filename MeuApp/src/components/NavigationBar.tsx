import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonVariant, loginStyles } from '../styles';

import screenHome from '../../app/screenHome';

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='screenHome' component={screenHome}/>
            <Tab.Screen name='screenHome' component={screenHome}/>
            <Tab.Screen name='screenHome' component={screenHome}/>
        </Tab.Navigator>
    )
}