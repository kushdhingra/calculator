import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import pallete from './colors';
import Main from './main';
import About from './about';
const Stack = createNativeStackNavigator(); 
export default function App() {
    return (
      <>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            animation: "fade_from_bottom",
            animationDuration: 500,
          }}>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                title: "Calculator",
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="About"
              component={About}
              options={{
                title: "About",
                headerStyle: { backgroundColor: pallete.header },
                headerTitleAlign: "center",
                headerTitleStyle: { color: pallete.text },
                headerTintColor: pallete.text,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
}

const styles = StyleSheet.create({
    
});