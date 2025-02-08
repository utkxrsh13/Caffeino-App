import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const CartScreen = () => {
  const CarList = useState((state:any)=> state.CarList);

  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}


const styles = StyleSheet.create({})

export default CartScreen