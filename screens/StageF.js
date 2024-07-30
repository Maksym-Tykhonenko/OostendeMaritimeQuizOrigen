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

const StageF = ({navigation}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  console.log('correctAnswersCount==>', correctAnswersCount);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [luserModal, setLuserModal] = useState(false);
  const [incorrectAnswerModal, setIncorrectAnswerModal] = useState(false);
  const [congratModal, setCongratModal] = useState(false);
  const [runOutHintsModal, setRunOutHintsModal] = useState(false);
  const [usedHints, setUsedHints] = useState(0); // Додаємо стан для підрахунку використаних підказок
  //console.log('usedHints==>', usedHints);
  const [currentOptions, setCurrentOptions] = useState([]); // Додаємо стан для збереження варіантів відповіді

  //useEffect(() => {
  //  getData();
  //}, []);

  useEffect(() => {
    setData();
  }, [correctAnswersCount]);

  const setData = async () => {
    try {
      const data = {
        correctAnswersCount,
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
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  ///////////////////////////////////////////////
  useEffect(() => {
    if (stageF.length > 0) {
      setCurrentOptions(stageF[currentQuestionIndex].options);
    }
  }, [currentQuestionIndex]);

  {
    /**timeLeft */
  }
  useEffect(() => {
    if (timeLeft === 0) {
      setLuserModal(true); // Відображаємо модальне вікно програшу, якщо час закінчився
    } else if (timeLeft > 0 && correctAnswersCount < 24) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Запускаємо таймер
      return () => clearTimeout(timerId); // Очищаємо таймер при розмонтуванні
    }
  }, [timeLeft, correctAnswersCount]);

  const handleAnswerPress = selectedOption => {
    const currentQuestion = stageF[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
      setCorrectAnswersCount(correctAnswersCount + 1);

      if (currentQuestionIndex < stageF.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCongratModal(true);
        setCorrectAnswersCount(correctAnswersCount * 2);
      }
    } else {
      setIncorrectAttempts(prev => prev + 1);
      if (incorrectAttempts >= 3) {
        setLuserModal(true);
      } else {
        setIncorrectAnswerModal(true);
      }
    }
  };

  const removeFirstIncorrectOption = currentQuestion => {
    // Створюємо копію масиву options для уникнення мутації оригінального об'єкту
    const options = [...currentOptions];

    // Знаходимо індекс першого неправильного варіанту
    const indexToRemove = options.findIndex(
      option => option !== currentQuestion.answer,
    );

    // Якщо знайдений індекс дійсний (не -1), видаляємо цей варіант
    if (indexToRemove !== -1) {
      options.splice(indexToRemove, 1);
    }

    return options;
  };

  const handleHintPress = () => {
    if (usedHints >= 3) {
      setRunOutHintsModal(true);

      return;
    }

    const currentQuestion = stageF[currentQuestionIndex];
    const updatedOptions = removeFirstIncorrectOption(currentQuestion);

    setCurrentOptions(updatedOptions);
    setUsedHints(usedHints + 1);
  };

  const currentQuestion = stageF[currentQuestionIndex];

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#29516b',
        position: 'relative',
      }}>
      {/* Таймер */}
      <View style={{alignItems: 'center', marginTop: 40, marginBottom: 5}}>
        <View
          style={{
            marginVertical: 0,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'rgba(0, 5, 141, 0.7)',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#ff6a02',
            width: 300,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#ff6a02',
            }}>
            Time Left: {timeLeft}s
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        {/**Кубок */}
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/icons/trophy.png')}
            style={{width: 60, height: 60}}
          />
          <Text
            style={{
              color: '#ff6a02',
              fontSize: 30,
              marginTop: 10,
              marginLeft: 20,
            }}>
            X
          </Text>
          <Text
            style={{
              color: '#ff6a02',
              fontSize: 30,
              marginTop: 10,
              marginLeft: 20,
            }}>
            {correctAnswersCount * 100}
          </Text>
        </View>

        {/**Line */}
        <View style={{borderLeftWidth: 4, borderColor: '#ff6a02'}}></View>

        {/* Кнопка підказки */}
        <TouchableOpacity
          onPress={handleHintPress}
          style={{
            borderWidth: 3,
            borderColor: '#ff6a02',
            borderRadius: 15,
            paddingRight: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/icons/bulb.png')}
              style={{width: 60, height: 60}}
            />
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                marginTop: 10,
                marginLeft: 5,
              }}>
              3 / {usedHints}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image
          source={currentQuestion.photo}
          style={{width: windowWidth, height: 250, marginBottom: 20}}
        />

        <View style={{alignItems: 'center'}}>
          {currentOptions.map((option, index) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginBottom: 20,
                borderBottomWidth: 3,
                borderColor: '#ff6a02',
                width: windowWidth * 0.8,
              }}
              onPress={() => handleAnswerPress(option)}
              key={index}>
              <Text
                style={{
                  color: '#ff6a02',
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                -{option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/**incorrectAnswerModal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={incorrectAnswerModal}>
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
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Wrong answer
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Try again
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              You used
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {incorrectAttempts} of 3 quests
            </Text>

            <TouchableOpacity
              onPress={() => {
                setIncorrectAnswerModal(false);
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

      {/**LuserModal */}
      <Modal animationType="fade" transparent={true} visible={luserModal}>
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
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Looooser !!!!
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              You lost by
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {correctAnswersCount} correct answers
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
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

      {/**runOutHintsModal */}
      <Modal animationType="fade" transparent={true} visible={runOutHintsModal}>
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
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Out of hints.
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              You have already used all 3 hints.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setRunOutHintsModal(false);
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

      {/**congratModal */}
      <Modal animationType="fade" transparent={true} visible={congratModal}>
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
            }}>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Congrat!!!
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              You have completed the quiz
            </Text>
            <Text
              style={{
                color: '#ff6a02',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              with {(correctAnswersCount + 1) / 2} correct answers.
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
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

      {congratModal && (
        <>
          <ConfettiCannon count={200} origin={{x: 0, y: 0}} />
          <ConfettiCannon count={200} origin={{x: 400, y: 0}} />
        </>
      )}

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

export default StageF;
