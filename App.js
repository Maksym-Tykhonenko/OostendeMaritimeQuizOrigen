import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import StageF from './screens/StageF';
import ResultScreen from './screens/ResultScreen';
import Lvls1 from './screens/Lvls/Lvl1';
import StageS from './screens/StageS';
import Lvls2 from './screens/Lvls/Lvls2';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StageF"
          component={StageF}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StageS"
          component={StageS}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvls1"
          component={Lvls1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvls2"
          component={Lvls2}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
