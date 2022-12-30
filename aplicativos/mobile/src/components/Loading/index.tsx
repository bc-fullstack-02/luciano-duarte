import React from "react";
import { View, Text } from "react-native";

import { styles } from './styles';

export function Loading(){
  return (
    <View style={styles.container}>
        <text>Carregando...</text>
    </View>
  );
}
