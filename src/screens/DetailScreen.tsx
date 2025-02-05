import {BackHandler, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {COLORS} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailScreen = ({navigation, route}: any) => {
  // console.log("routes= ", route.params)
  const itemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHandler=()=>{
navigation.pop();
  }
  const addTofavList = useStore((state:any)=> state.addTofavList);
  const deleteFromFavorite = useStore((state:any)=> state.deleteFromFavorite);


  const ToggleFavourite = (favourite:boolean, type:string, id:string)=>{
    favourite? deleteFromFavorite(type,id) : addTofavList(type,id);
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHnadler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          name={itemOfIndex.name}
          favourite={itemOfIndex.favourite}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default DetailScreen;
