import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme'

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  if (!data) return [];
  for (let i = 0; i < data.length; i++) {
    if(temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    }else{
      temp[data[i].name] += 1;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
}

const getCoffeeList = (category: string, data: any) => {
  if(category === 'All') {
    return data;
  }
  let coffeeList = data ? data.filter((item: any) => item.name === category) : [];
  return coffeeList;
}

const HomeScreen = () => {
  const CoffeeList = useStore((state:any) => state.CoffeeList)
  const BeanList = useStore((state:any) => state.BeanList);

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState(
    {
      index: 0,
      category: categories[0],
    }
  );
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.Screencontainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}></ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  Screencontainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow: 1,
  },
})


