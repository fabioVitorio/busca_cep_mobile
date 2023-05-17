import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)

  async function buscar(){
    if(cep == ''){
      alert('Vazio')
      setCep('')
      return
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data)
      Keyboard.dismiss();
    } catch (error) {
      console.log(error)
    }
    
  }

  function limpar(){
    setCep('')
    setCepUser(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          placeholder="Ex: 31998035"
          value={cep}
          maxLength={8}
          onChangeText={(texto) => setCep(texto)}
          
        />
      </View>

      <View style={styles.viewBtn}>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: '#1d75cd'}]}
          onPress={buscar}  
        >
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: '#cd3e1d'}]}
          onPress={limpar}  
        >
          <Text style={styles.textBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
        <View style={styles.viewResult}>
          <Text style={styles.textResult}>CEP: {cepUser.cep}</Text>
          <Text style={styles.textResult}>ENDEREÇO: {cepUser.logradouro}</Text>
          <Text style={styles.textResult}>BAIRRO: {cepUser.bairro}</Text>
          <Text style={styles.textResult}>CIDADE: {cepUser.localidade}</Text>
          <Text style={styles.textResult}>ESTADO: {cepUser.uf}</Text>
        </View>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  view: {
    marginTop: '30%',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    width: 220,
    height: 50,
    padding: 10,
    fontSize: 25,
    borderRadius: 3,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    textAlign: 'center'
  },
  viewBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    width: 300,
    justifyContent: 'space-around',
    
  },
  btn: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
  },
  textBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  viewResult: {
    width: '80%',
    marginTop: 100,
    justifyContent: 'center',
  },
  textResult: {
    fontSize: 20,
    textAlign: 'left',
    backgroundColor: '#ddd',
    marginBottom: 5,
    borderRadius: 4,
    padding: 5
  },
});
