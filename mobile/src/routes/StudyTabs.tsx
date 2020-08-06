import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
const { Navigator, Screen } = createBottomTabNavigator()
import { Platform } from 'react-native';

import Favorites from '../pages/Favorites'
import TeacherList from '../pages/TeacherList';

function StudyTabs() {
  return (
      <Navigator 
        tabBarOptions={{
            style: {
              elevation: 0,
              shadowOpacity: 0,
              height: Platform.OS === 'ios' ? 84 : 64,
            }, 
            tabStyle: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            },
            iconStyle: {
              flex: 0,
              width: 20,
              height: Platform.OS === 'ios' ? 24 : 20,
            },
            labelStyle: {
              fontFamily: 'Archivo_700Bold',
              fontSize: 13,
              marginLeft: 16
            },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1bccc',
            activeTintColor: '#32264d'
          }}
      >
        <Screen 
          name="TeacherList" 
          component={TeacherList} 
          options={{
            tabBarLabel: 'Proffys',
            tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-easel" color={focused ? '#8257e5' : color} size={size} />
          }}/>
        <Screen 
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-heart" color={focused ? '#8257e5' : color} size={size}/>
          }} />
      </Navigator>
  )
}

export default StudyTabs;