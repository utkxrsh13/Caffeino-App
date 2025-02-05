import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GrandientBgIcon from './GrandientBgIcon';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
// import { ImageBackgroundProps } from 'react-native';

interface ImageBackgroundInfoProps{
  EnableBackHnadler:boolean;
  imagelink_portrait:ImageProps;
  type:string;
  id:string;
  name:string;
  favourite:boolean;
  special_ingredient:string;
  ingredients:string;
  average_rating:number;
  ratings_count:string
  roasted:string;
  BackHandler?:any;
  ToggleFavourite?:any;
}

const ImageBackgroundInfo:React.FC<ImageBackgroundInfoProps> = ({EnableBackHnadler,imagelink_portrait,type,id,name,favourite,special_ingredient,ingredients,average_rating,ratings_count,roasted,BackHandler,ToggleFavourite}) => {
  return (
    <View>
      <ImageBackground source={imagelink_portrait} style={styles.ItemBackgroundImage}
      >
        {EnableBackHnadler?(
          <View style={styles.ImageHeaderBarContainer}>
              <TouchableOpacity onPress={BackHandler}>
                <GrandientBgIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=>{
                ToggleFavourite(favourite,type,id);
              }}>
              <GrandientBgIcon name='like' color={favourite?COLORS.primaryRedHex:COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>
              </TouchableOpacity>
          </View>
        ):(
          <View style={styles.ImageHeaderBarContainerWithoutBack}>
              <TouchableOpacity onPress={()=>{
                ToggleFavourite(favourite,type,id);
              }}>
              <GrandientBgIcon name='like' color={favourite?COLORS.primaryRedHex:COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>
              </TouchableOpacity>
          </View>)}
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  ItemBackgroundImage:{
    width:'100%',
    aspectRatio:20/25,
    justifyContent:'space-between'
  },
  ImageHeaderBarContainer:{
    padding:SPACING.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  ImageHeaderBarContainerWithoutBack:{
    padding:SPACING.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  }
})
export default ImageBackgroundInfo