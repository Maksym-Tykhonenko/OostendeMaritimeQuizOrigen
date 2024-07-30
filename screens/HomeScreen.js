import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#29516b'}}>
      <View>
        <Image
          source={require('../assets/prevPhoto.jpeg')}
          style={{width: windowWidth, height: 250}}
        />
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('StartScreen');
              }}
              style={{
                width: 250,
                height: 80,
                borderWidth: 3,
                borderColor: '#ff6a02',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: 20,
              }}>
              <Text
                style={{color: '#ff6a02', fontSize: 40, fontWeight: 'bold'}}>
                Start
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ResultScreen');
              }}
              style={{
                width: 250,
                height: 80,
                borderWidth: 3,
                borderColor: '#ff6a02',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{color: '#ff6a02', fontSize: 40, fontWeight: 'bold'}}>
                Shop
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 250,
                height: 80,
                borderWidth: 3,
                borderColor: '#ff6a02',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{color: '#ff6a02', fontSize: 40, fontWeight: 'bold'}}>
                PROFILE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 250,
                height: 80,
                borderWidth: 3,
                borderColor: '#ff6a02',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: '#ff6a02', fontSize: 40, fontWeight: 'bold'}}>
                ABOUT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
