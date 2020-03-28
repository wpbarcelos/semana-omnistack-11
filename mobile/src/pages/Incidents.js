import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import logoimg from "../../assets/logo.png";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
// import { Container } from './styles';
import api from "./../services/api";
export default function Incidents() {
  const navigation = useNavigation();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const { data, headers } = await api.get("/incidents", {
      params: { page }
    });
    console.log("buscou...");
    setIncidents([...incidents, ...data]);
    setPage(page + 1);
    setTotal(headers["x-total-count"]);
    setLoading(false);
  }

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }
  return (
    <Container>
      <Header>
        <Logo source={logoimg} resizeMode="cover" />
        <HeaderText>
          Total de <HeaderTextStrong>{total}</HeaderTextStrong> casos
        </HeaderText>
      </Header>
      <Title>Bem-Vindo</Title>
      <Description>Escolha um dos casos abaixo e salve o dia</Description>
      <FlatList
        data={incidents}
        style={{ marginTop: 32 }}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <Incident>
            <TLabel>ONG</TLabel>
            <TValue>{incident.name}</TValue>

            <TLabel>CASO:</TLabel>
            <TValue>{incident.title}</TValue>

            <TLabel>VALOR</TLabel>
            <TValue>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </TValue>
            <DetailButton onPress={() => navigateToDetail(incident)}>
              <DetailButtonText>Ver mais detalhes</DetailButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailButton>
          </Incident>
        )}
      />
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

const HeaderText = styled.Text`
  font-size: 15px;
  color: #737380;
`;

const HeaderTextStrong = styled.Text`
  font-weight: bold;
`;

const Logo = styled.Image``;

const Title = styled.Text`
  font-size: 30px;
  margin: 48px 0px 16px;
  color: #13131a;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #737380;
`;

const Incident = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
`;

const TLabel = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
`;

const TValue = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  margin-bottom: 24px;
  color: #737380;
`;

const DetailButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DetailButtonText = styled.Text`
  color: #e02041;
  font-size: 15px;
  font-weight: bold;
`;
