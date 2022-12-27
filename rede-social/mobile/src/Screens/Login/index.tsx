import React from "react";
import { View, Image } from "react-native";
import { Heading } from "../../components/Heading";

import  logo  from "../../../assets/images/logo.png";
 
import { styles } from './styles';

export function Login(){
  return (
    <View style={styles.container}>
      <Image source={logo} style={logo} resizeMethod="scale"/>
      <Heading title='Sysmap Parrot' subtitle='Faça login e comece a usar!'  />
    </View>
  );
}



