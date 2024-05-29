import { View, Text, TextInput, StyleSheet, FlatList, Alert, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(false);
  const [edicao, setEdicao] = useState(false)
  const [busca, setBusca] = useState(false);
  const [filtro, setFiltro] = useState(false);
  const [ClientId, setClientId] = useState(0)
  const [ClientName, setName] = useState()
  const [ClientEmail, setEmail] = useState()
  const [Genere, setGenere] = useState()
  const [deleteResposta, setResposta] = useState(false)


  async function getClients() {
    await fetch('http://10.139.75.39:5251/api/Clients/GetAllClients', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setClients(json))
      .catch(err => setError(true))
  }

  async function getClient(id) {
    await fetch('http://10.139.75.39:5251/api/Clients/GetClientId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json ; charset=UTF -8',
      },

    })
      .then((response) => response.json())
      .then(json => {
        setClientId(json.clientId);
        setName(json.clientName);
        setEmail(json.clientEmail);
        setGenere(json.clientGenere)
      })
  }

  async function editClient() {
    console.log( ClientId, ClientEmail, ClientName, Genere);
    await fetch('http://10.139.75.39:5251/api/Clients/UpdateClients/' + ClientId, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        clientId: ClientId,
        clientEmail: ClientEmail,
        clientName: ClientName,
        clientGenere: Genere
      })
    })
      .then(response => response.json())
      .then(json => getClients())
      .catch(err => console.log(err));
    setEdicao(false)
  }

  function showAlert(id, clientName) {
    Alert.alert(
      '',
      'Deseja realmente excluir esse cliente ?',
      [
        { text: 'Sim', onPress: () => deleteClient(id, clientName) },
        { text: 'Não', onPress: () => ('') }
      ],
      { cancelable: false }
    )
  }

  async function deleteClient(id, clientName) {
    await fetch('http://10.139.75.39:5251/api/Clients/DeleteClients/' + id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json ; charset=UTF -8',
      }
    })
      .then(res => res.json())
      .then(json => setResposta(json))
      .catch(err => console.log(err))

    if (deleteResposta == true) {
      Alert.alert(
        '',
        'Cliente ' + clientName + ' excluido com sucesso',
        [
          { text: '', onPress: () => ('') },
          { text: 'ok', onPress: () => getClients() },
        ],
        { cancelable: false }

      )
    }

    else {
      Alert.alert(
        '',
        'Cliente ' + clientName + ' não foi excluido',
        [
          { text: '', onPress: () => ('') },
          { text: 'ok', onPress: () => ('') },
        ],
        { cancelable: false }
      )
      getClients();
    }

  }

  useEffect(() => {
    getClients();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getClients();
    }, [])



  );


  return (
    <View style={css.container}>
      {edicao == false ?
        <FlatList
          style={css.flat}
          data={clients}
          keyExtractor={(item) => item.clientId}
          renderItem={({ item }) => (
            <Text style={css.text}>
              <Text style={css.Name}>{item.clientName } </Text>
            
              <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getClient(item.clientId) }}>
                <Text style={css.btnLoginText}> Editar  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={css.btnDelete} onPress={() => showAlert(item.clientId, item.clientName)}>
                <Text style={css.btnLoginText}>Excluir</Text>
              </TouchableOpacity>
            </Text>
          )}
        />

        :
        <View style={css.editar}>
          <TextInput
            inputMode="text"
            style={css.input}
            value={ClientName}
            onChangeText={(digitado) => setName(digitado)}
            placeholderTextColor="black"
          />
          <TextInput
            inputMode="email"
            style={css.input}
            value={ClientEmail}
            onChangeText={(digitado) => setEmail(digitado)}
            placeholderTextColor="black"
          />
          <TextInput
            inputMode="genere"
            style={css.input}
            value={Genere}
            onChangeText={(digitado) => setGenere(digitado)}
            placeholderTextColor="black"
          />

          <TouchableOpacity style={css.btnCreate} onPress={() => editClient()}>
            <Text style={css.btnLoginText2}>SALVAR</Text>
          </TouchableOpacity>
        </View>

      }
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0195fd",
    

    
  },
  text: {
 
    color: "black",
    marginTop:20,
    
    
    

  },
  Name:{
  position:'absolute',
  display:'flex',
  
 
  
    

  },
 
 

  btnDelete:{
    backgroundColor:'red',
    padding:10,
    borderRadius: 5,
   
  },
  btnEdit:{
    backgroundColor:'blue',
    padding:10,
    borderRadius: 5,
  },
  btnCreate:{
    backgroundColor:'blue',
    padding:10,
    borderRadius: 5,
    alignItems:'center',
    marginTop:10
    
  }
  
})