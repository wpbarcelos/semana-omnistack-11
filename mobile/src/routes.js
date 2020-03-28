import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Incidents from "./pages/Incidents";
import Detail from "./pages/Detail";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Incidents} name="Incidents" />
        <Stack.Screen component={Detail} name="Detail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
