import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeBroScreen from './screens/WelcomeBroScreen';
import WhereToBroScreen from './screens/WhereToBroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomeBro" component={WelcomeBroScreen}/>
        <Stack.Screen name="WhereToBro" component={WhereToBroScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
