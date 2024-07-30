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

import {stageF} from '../data/stageF';

const windowWidth = Dimensions.get('window').width;

const ResultScreen = ({navigation}) => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  console.log('correctAnswersCount==>', correctAnswersCount);
  const [lives, setLives] = useState(3); // початкова кількість життів
  console.log('lives==>', lives);
  const [hints, setHints] = useState(3); // початкова кількість підказок
  console.log('hints==>', hints);
  const [alertModal, setAlertModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [correctAnswersCount, lives, hints]);

  const setData = async () => {
    try {
      const data = {
        correctAnswersCount,
        lives,
        hints,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`correctAnswers`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`correctAnswers`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setCorrectAnswersCount(parsedData.correctAnswersCount);
        setLives(parsedData.lives ?? 3);
        setHints(parsedData.hints ?? 3);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const exchangeForLifeRate = 10; // курс обміну життів
  const exchangeForHintsRate = 5; // курс обміну підсказок

  const handleLifeExchange = () => {
    if (correctAnswersCount >= exchangeForLifeRate) {
      setLives(lives + 1);
      setCorrectAnswersCount(correctAnswersCount - exchangeForLifeRate);
    } else {
      setAlertModal(true);
      setModalMessage('Not enough cups to buy a life');
    }
  };
  const handleHintsExchange = () => {
    if (correctAnswersCount >= exchangeForHintsRate) {
      setHints(hints + 1);
      setCorrectAnswersCount(correctAnswersCount - exchangeForHintsRate);
    } else {
      setAlertModal(true);
      setModalMessage('Not enough cups to buy a hints');
    }
  };

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#29516b',
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          color: '#ff6a02',
          fontSize: 70,
          fontWeight: 'bold',
          marginTop: 50,
        }}>
        Shop
      </Text>
      {/**Кубок */}
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Image
          source={require('../assets/icons/trophy.png')}
          style={{width: 90, height: 90}}
        />
        <Text
          style={{
            color: '#ff6a02',
            fontSize: 50,
            marginTop: 10,
            marginLeft: 20,
          }}>
          X
        </Text>
        <Text
          style={{
            color: '#ff6a02',
            fontSize: 50,
            marginTop: 10,
            marginLeft: 20,
          }}>
          {Math.round(correctAnswersCount * 100)}
        </Text>
      </View>

      {/**Life block */}
      <View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Life: {lives}</Text>
        <TouchableOpacity
          onPress={handleLifeExchange}
          style={{
            width: windowWidth * 0.8,
            backgroundColor: '#ff6a02',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            Exchange {exchangeForLifeRate * 100} cups for 1 life
          </Text>
        </TouchableOpacity>
      </View>

      {/**Hints block */}
      <View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Hints: {hints}</Text>
        <TouchableOpacity
          onPress={handleHintsExchange}
          style={{
            width: windowWidth * 0.8,
            backgroundColor: '#ff6a02',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            Exchange {exchangeForHintsRate * 100} cups for 1 hint
          </Text>
        </TouchableOpacity>
      </View>

      {/**Alert Modal */}
      <Modal animationType="fade" transparent={true} visible={alertModal}>
        <View
          style={{
            backgroundColor: '#29516b',
            flex: 1,
            marginVertical: '50%',
            marginHorizontal: '5%',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#ff6a02',
          }}>
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              {modalMessage}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setAlertModal(false);
              }}
              style={{
                marginTop: 40,
                width: 140,
                height: 50,
                borderWidth: 3,
                borderRadius: 50,
                borderColor: '#ff6a02',
                backgroundColor: '#ff6a02',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#ff6a02',
                shadowOffset: {width: 30, height: 10},
                shadowRadius: 15,
                shadowOpacity: 0.2,
                elevation: 5,
              }}>
              <Text
                style={{
                  color: '#29516b',
                  fontSize: 20,
                  fontWeight: 'bold',
                  shadowColor: '#29516b',
                  shadowOffset: {width: 30, height: 10},
                  shadowRadius: 15,
                  shadowOpacity: 0.2,
                  elevation: 5,
                }}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/**Btn BAck */}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
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
  );
};

export default ResultScreen;
