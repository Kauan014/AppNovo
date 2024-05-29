import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Inserir() {

  const [email, setEmail] = useState("");
  const [genere, setGenere] = useState("")
  const [name, setName] = useState("")
  const [erro, seterro] = useState(false)
  const [sucesso, setsucesso] = useState(false);

  async function Cadastro() {
    await fetch('http://10.139.75.39:5251/api/Clients/InsertClients', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        clientName: name,
        clientEmail: email,
        clientGenere: genere
      })
    })
      .then(res => res.json())
      .then(json => {
        setsucesso((json.clientId) ? true : false);
        seterro((json.clientId) ? false : true);
      })
      .catch(err => seterro(true))
  }

  return (
    <ScrollView contentContainerStyle={css.container}>
      {sucesso ?
        <>
          <Text style={css.text}> Obrigado por se cadastrar. Seu cadastro foi realizado com sucesso!!</Text>
          <Button title="Novo CLiente" onPress={() => setsucesso(false)} />
        </>
        :
        <>

          <Text style={css.text}>Inserir</Text>

          <TextInput
            inputMode="text"
            placeholder="name"
            style={css.input}
            value={name}
            onChangeText={(digitado) => setName(digitado)}
            placeholderTextColor="white"


          />
          <TextInput
            inputMode="email"
            placeholder="Email"
            style={css.input}
            value={email}
            onChangeText={(digitado) => setEmail(digitado)}
            placeholderTextColor="white"
          />

          
          <TextInput
            inputMode="text"
            placeholder="Genere"
            style={css.input}
            value={genere}
            onChangeText={(digitado) => setGenere(digitado)}
            placeholderTextColor="white"


          />


          <TouchableOpacity style={css.btnCadastrar} onPress={Cadastro}>
            <Text style={css.btnCadastrarText}>Cadastrar</Text>
          </TouchableOpacity>

          {erro &&
            <View style={css.erro}>
              <Text style={css.erroText}>Revise os campos. Tente novamente!</Text>
            </View>
          }
        </>
      }
    </ScrollView>

  )
}

const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#262626",
    color: "white"
  },
  btnCadastrar: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#0195fd"
  },
  btnCadastrarText: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  erro: {
    width: "100%",
    height: 50,
    marginTop: 30
  },
  erroText: {
    color: "white",
    textAlign: "center"
  }
})