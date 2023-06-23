import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const mySearchBar = ({styLe,placeHolder,input,onChangeText}) => {
  return (
    <View>
      <TextInput
        style={styLe}
        placeholder={placeHolder}
        value={input}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default mySearchBar

const styles = StyleSheet.create({})