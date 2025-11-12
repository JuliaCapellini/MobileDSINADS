import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonVariant, loginStyles } from '../styles';

import parking from '../../app/parking';

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='parking' component={parking}/>
            <Tab.Screen name='parking' component={parking}/>
            <Tab.Screen name='parking' component={parking}/>
        </Tab.Navigator>
    )
}