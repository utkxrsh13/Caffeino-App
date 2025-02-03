import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GrandientBgIcon from './GrandientBgIcon'
import ProfilePic from './ProfilePic'

interface HeaderBarProps {
  title?: string
}

const HeaderBar:React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderBarContainer}>
      <GrandientBgIcon name={'menu'} size={FONTSIZE.size_16} color={COLORS.primaryGreyHex}/>
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic/>
    </View>
  )
}


const styles = StyleSheet.create({
  HeaderBarContainer:{
    padding:SPACING.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  HeaderText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_20,
    fontWeight:'bold',
    color:COLORS.primaryWhiteHex
  }
})
export default HeaderBar