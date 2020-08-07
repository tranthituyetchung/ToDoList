import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import AllTask from '../components/AllTask'
import DoneTask from '../components/DoneTask'
import AddTodo from '../components/AddTodo'
import colors from '../values/colors';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('AddTodo')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('AddTodo')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="All" component={AllTask} />
      <HomeStack.Screen name="AddTodo" component={AddTodo} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Done" component={DoneTask} />
      <SettingsStack.Screen name="AddTodo" component={AddTodo} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator       
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tất cả') {
              iconName = focused
                ? 'list'
                : 'list';
            } else if (route.name === 'Đã hoàn thành') {
              iconName = focused ? 'check-circle' : 'check-circle';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.primary_blue,
          inactiveTintColor: 'gray',
          style: {         
            borderTopWidth: 0,
            paddingTop: 3,
            paddingBottom: 4,
            height: 60,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 0 }
          },
          labelStyle: {
            fontSize: 11,
            fontFamily: 'Montserrat-Medium',
            paddingBottom: 5,
          },
        }}
        
        >
        <Tab.Screen name="Tất cả" component={AllTask} 
        />
        <Tab.Screen name="Đã hoàn thành" component={DoneTask} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}