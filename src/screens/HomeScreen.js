import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import MySearchBar from '../components/mySearchBar';

import axios from 'axios';


const HomeScreen = ({navigation}) => {


  const [meals, setMeals] = useState([]);
  const [input, SetInput] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  console.log(input);


  const onFavorite = rec => {
    if (!favoriteList.includes(rec)) setFavoriteList(favoriteList.concat(rec));
    console.log(rec);

  };

  const onRemoveFavorite = rec => {
    let index = favoriteList.indexOf(rec);
    console.log(index);
    let temp = [...favoriteList.slice(0, index), ...favoriteList.slice(index + 1)];
    setFavoriteList(temp);
  };

  const ifExists = rec => {
    if (favoriteList.filter(item => item['idCategory'] === rec['idCategory']).length > 0) {
      return true;
    }
    return false;
  };

  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setMeals(res.data.categories)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <View style={({ backgroundColor: '#ADD8E6' })}>

      <MySearchBar
      styLe={styles.border}
      placeHolder="Enter your recipe name..."
      input={input}
      onChangeText={(text) => { SetInput(text); }}
      />
      
      <Feather
        style={styles.magnifyingGlass}
        name='search'
        size={24}
        color="black" />

      <TouchableOpacity
        onPress={() => navigation.navigate('Favourite', {favoriteList })}
        title="Go to List obj Demo"><Text style={({ fontSize: 25, marginTop: 25, alignSelf: 'center',borderWidth:1,borderRadius:20,backgroundColor:'#F39C12' })}>Go to the favorite list
        <MaterialIcons name={'fast-forward'} size={32} color={'black'} /></Text>
        
      </TouchableOpacity>

      <ScrollView style={[styles.container, ({ borderWidth: 1, width: "auto", height: 500, borderRadius: 20, marginTop: 10 })]}>
        <FlatList
          style={[styles.container, styles.marginProp, ({ height: "auto"})]}
          data={meals}
          renderItem={({ item }) => {
            if (input == "") {
              return (
                <View style={[styles.container, ({ backgroundColor: 'gray' })]}>
                  <Text style={({ marginTop: -30, fontSize: 22 })}>{item['strCategory']}</Text>
                  <Image source={{ uri: item['strCategoryThumb'] }}
                    style={styles.imageHeigh}
                    resizeMode='cover' />
                  <Text style={({ color: 'white' })}>{item['strCategoryDescription']}</Text>
                  <TouchableOpacity
                    style={({ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', top: 10, right: 10 })}
                    onPress={() => ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)}
                  >
                    <MaterialIcons
                      name={ifExists(item) ? 'favorite' : 'favorite-outline'}
                      size={32}
                      color={'red'}
                    />

                  </TouchableOpacity>
                </View>
              );
            }
            if (item['strCategory'].toLowerCase().includes(input.toLowerCase())) {
              return (
                <View style={[styles.container, ({ backgroundColor: 'gray' })]}>
                  <Text style={({ marginTop: -30, fontSize: 22 })}>{item['strCategory']}</Text>
                  <Image source={{ uri: item['strCategoryThumb'] }}
                    style={styles.imageHeigh}
                    resizeMode='cover' />
                  <Text style={({ color: 'white' })}>{item['strCategoryDescription']}</Text>
                  <TouchableOpacity
                    style={({ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', top: 10, right: 10 })}
                    onPress={() => ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)}
                  >
                    <MaterialIcons
                      name={ifExists(item) ? 'favorite' : 'favorite-outline'}
                      size={32}
                      color={'red'}
                    />

                  </TouchableOpacity>

                </View>
              );
            }
          }
          }
        />
      </ScrollView>
    </View>

  )
}

export default HomeScreen

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
    marginTop: 40,
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