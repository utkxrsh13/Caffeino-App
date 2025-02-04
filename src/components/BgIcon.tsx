import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme';
import CustomIcon from './customIcon';


interface BgIconProps{
  name: string;
  size: number;
  color: string;
  BgColor: string;
}

const BgIcon:React.FC<BgIconProps> = ({name,size,color,BgColor}) => {
  return (
    <View style={[styles.BgIconStyle, {backgroundColor: BgColor}]}>
      <CustomIcon name={name} color={color} size={size}/>
    </View>
  )
}


const styles = StyleSheet.create({
  BgIconStyle:{
    height:SPACING.space_30,
    width:SPACING.space_30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:BORDERRADIUS.radius_8
  }
})
export default BgIcon