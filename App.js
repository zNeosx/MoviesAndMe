import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import Search from './Components/Search';
import Home from './Components/Home';
import { View } from 'react-native';
import FilmDetails from './Components/FilmDetails';
import { Provider } from 'react-redux'; 
import Store from './Store/configureStore';

const Stack = createNativeStackNavigator()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Acceuil">
          <Stack.Screen name="Acceuil" component={Home} />
          <Stack.Screen name="Rechercher" component={Search} />
          <Stack.Screen name="FilmDetails" component={FilmDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>  
    )
  }
}

