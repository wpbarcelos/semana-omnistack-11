import React from "react";
import { Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import logoimg from "../../assets/logo.png";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const incidentValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value);

  const message =
    `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" ` +
    `com o valor de ${incidentValue}`;
  function navigateBack() {
    navigation.goBack();
  }
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso:${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5527999447975&text=${message}`);
  }

  return (
    <Container>
      <Header>
        <Logo source={logoimg} resizeMode="cover" />
        <ButtonBack onPress={navigateBack}>
          <Feather name="arrow-left" size={22} color="#e02041" />
        </ButtonBack>
      </Header>
      <Incident>
        <TLabel style={{ marginTop: 0 }}>ONG</TLabel>
        <TValue>
          {incident.name} de {incident.city}/{incident.uf}
        </TValue>

        <TLabel>CASO:</TLabel>
        <TValue>{incident.title}</TValue>

        <TLabel>VALOR</TLabel>
        <TValue>{incidentValue}</TValue>
      </Incident>
      <ContactView>
        <Hero>Salve o dia!</Hero>
        <Hero>Seja o herói deste caso.</Hero>

        <HeroDescription>Entre em Contato:</HeroDescription>
        <Buttons>
          <Btn onPress={sendWhatsapp}>
            <BtnText>WhatsApp</BtnText>
          </Btn>
          <Btn onPress={sendMail}>
            <BtnText>E-mail</BtnText>
          </Btn>
        </Buttons>
      </ContactView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: ${Constants.statusBarHeight + 20}px;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonBack = styled.TouchableOpacity`
  padding: 10px;
`;

const Logo = styled.Image``;

const Incident = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-top: 48px;
`;

const TLabel = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
  margin-top: 24px;
`;

const TValue = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  color: #737380;
`;

const ContactView = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
`;

const Hero = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #13131a;
  line-height: 30px;
`;
const HeroDescription = styled.Text`
  font-size: 15px;
  color: #737380;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const Btn = styled.TouchableOpacity`
  background-color: #e02041;
  border-radius: 8px;
  height: 50px;
  width: 48%;
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;
