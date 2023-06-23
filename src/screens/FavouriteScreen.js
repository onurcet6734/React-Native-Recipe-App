import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const FavouriteScreen = ({ route, navigation }) => {


  const fav = navigation.getParam('favoriteList');

  return (
    <View style={({backgroundColor:'#ADD8E6',height:650})}>
      <ScrollView style={[styles.container, ({ borderWidth: 1, width: "auto", height: 'auto', borderRadius: 20, marginTop: 10, backgroundColor: '#ADD8E6' })]}>
        <FlatList
          style={[styles.container, styles.marginProp, ({ height: "auto" })]}
          data={fav}
          renderItem={({ item }) => {
            return (
              <View style={[styles.container, ({ backgroundColor: 'gray' })]}>
                <Text style={({ marginTop: -30, fontSize: 22 })}>{item['strCategory']}</Text>
                <Image source={{ uri: item['strCategoryThumb'] }}
                  style={styles.imageHeigh}
                  resizeMode='cover' />
                <Text style={({ color: 'white' })}>{item['strCategoryDescription']}</Text>
              </View>
            );

          }
          }
        />
      </ScrollView>
    </View>
    
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  border: {
    backgroundColor: "#B1B1B1",
    alignItems: 'center',
    height: 60,
    width: 280,
    margin: 12,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
  },

  magnifyingGlass: {
    fontSize: 30,
    marginTop: -60,
    marginLeft: 270
  },
  container: {
    marginTop: 30,
    borderWidth: 1,
    height: "auto",
    width: 280,
    alignSelf: "center",

  },
  marginProp: {
    marginTop: 10
  },
  imageHeigh: {
    height: 180,
  }
})