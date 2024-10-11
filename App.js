import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Posts from './screens/Posts';
import OnePost from './screens/OnePost';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Posts" component={Posts} options={{ title: 'Посты' }} />
        <Stack.Screen name="OnePost" component={OnePost} options={{ title: 'Комментарии к посту' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}