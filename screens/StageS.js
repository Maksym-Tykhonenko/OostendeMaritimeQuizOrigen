import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from 'react-native';
import {Dimensions} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const StageS = ({navigation}) => {
  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#29516b',
        height: '100%',
      }}>
      <View style={{marginTop: 50}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              1 History of the Port of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              2 Famous Sailors of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              3: Naval Battles and Skirmishes near Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              4: Maritime Trade of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              5: Maritime Legends and Myths of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              6: Maritime Architecture of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              7: Fishing and Marine Trades of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              8: Maritime Infrastructure of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              9: Maritime Traditions and Festivals of Ostend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.9,
              height: 80,
              borderWidth: 3,
              borderColor: '#ff6a02',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              //navigation.navigate('Lvls1');
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              10: Modern Maritime Activities in Ostend
            </Text>
          </TouchableOpacity>
          <View style={{height: 100}}></View>
        </ScrollView>
        {/**Btn BAck */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StartScreen');
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 60,
            height: 60,
            borderWidth: 3,
            borderColor: '#ff6a02',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text style={{color: '#ff6a02', fontSize: 40, fontWeight: 'bold'}}>
            {'<'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StageS;
