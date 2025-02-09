import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import DetailScreen from './src/screens/DetailScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigator from './src/navigators/TabNavigator'
import SplashScreen from 'react-native-splash-screen'


const Stack = createNativeStackNavigator();


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="Payment" component={PaymentScreen} options={{animation:'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})