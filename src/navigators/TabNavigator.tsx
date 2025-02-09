import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CartScreen from '../screens/CartScreen';
import customIcon from '../components/customIcon';
import CustomIcon from '../components/customIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBarStyle,
      tabBarBackground: () => (
      <BlurView overlayColor='' blurAmount={5} style={styles.blurViewStyle} />
      )
      }}>
      <Tab.Screen name="Home" component={HomeScreen}
      options={{
      tabBarIcon: ({focused,color,size}) => (
        <View style={{ marginTop: 5 }}>
        <CustomIcon 
        name='home'
        size={20}
        color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
        </View>
      )
      }}
      />
      <Tab.Screen name="Cart" component={CartScreen}
      options={{
      tabBarIcon: ({focused,color,size}) => (
        <View style={{ marginTop: 5 }}>
        <CustomIcon 
        name='cart'
        size={20}
        color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
        </View>
      )
      }}
      />
      <Tab.Screen name="Favourites" component={FavouritesScreen}
      options={{
      tabBarIcon: ({focused,color,size}) => (
        <View style={{ marginTop: 5 }}>
        <CustomIcon 
        name='like'
        size={20}
        color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
        </View>
      )
      }}
      />
      <Tab.Screen name="History" component={OrderHistoryScreen}
      options={{
      tabBarIcon: ({focused,color,size}) => (
        <View style={{ marginTop: 5 }}>
        <CustomIcon 
        name='bell'
        size={20}
        color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
        </View>
      )
      }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
