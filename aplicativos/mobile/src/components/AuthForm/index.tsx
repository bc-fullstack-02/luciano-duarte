import React, {useState} from "react";
import { Image, KeyboardAvoidingView, Platform, Text} from "react-native";
import { Lock, User } from "phosphor-react-native";

import { Input } from "../Input";
import { Heading } from "../Heading";
import { Spacer } from "../Spacer";
import { Button } from "../Button";

import  logo  from "../../../assets/logo.png";

import { THEME } from "../../theme";

import { styles } from './styles';

import { Auth } from "../../@types/auth";

interface AuthFormProps {
  formTitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void;
  showNameInput?: boolean;
}

export function AuthForm({ formTitle, submitFormButtonText, submitFormButtonAction,}: AuthFormProps) {
  const [user,setUser] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <KeyboardAvoidingView
    style={styles.container}
    contentContainerStyle={styles.containerPosition} 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <Image source={logo} style={logo} resizeMethod="scale"/>
    <Heading title='Sysmap Parrot' subtitle={ formTitle }  />
    <Input.Root>
      <Input.Icon>
        <User color={THEME.COLORS.INPUT} />
      </Input.Icon>
      <Input.Input 
        value={user}
        onChangeText={setUser}
        placeholder="Digite seu usuário"
        placeholderTextColor={THEME.COLORS.INPUT} 
        autoCapitalize="none"
        autoCorrect
      />
    </Input.Root>
    <Spacer />
    <Input.Root>
      <Input.Icon>
        <Lock color={THEME.COLORS.INPUT} />
      </Input.Icon>
      <Input.Input 
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        placeholderTextColor={THEME.COLORS.INPUT} 
        autoCapitalize="none"
        autoCorrect
        secureTextEntry
      />
    </Input.Root>
    <Spacer />
    <Button 
      title={submitFormButtonText}
      onPress={() => submitFormButtonAction({ user, password })} 
    />
    <Spacer />
  </KeyboardAvoidingView>
  );
}
