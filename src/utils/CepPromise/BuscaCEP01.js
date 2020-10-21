import React, {Component} from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'

export default class BuscaCep extends Component{

state={
  cep:'',
  dados:{
    logradouro:'',
    uf:'',
    bairro: '',
    localidade:''
  }
};

  buscarCep = () => {
    this.setState({
      cep:'',
      dados:{
        logradouro:'',
        uf:'',
        bairro: '',
        localidade:''
      }
    });
   fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`).then(res => res.json()).then(data =>{
this.setState({
  dados: data
})
   }).catch(err => {
     console.log(err)
   });
  }

  render(){
    return(
  <View style={styles.container}>
  
  <Text style={styles.text}>
  Buscar meu CEP
  </Text>
   <TextInput
   value={this.state.cep}
   onChangeText={cep => {this.setState({cep})}}
  style={styles.input}
  placeholder='Digite o seu CEP'
  placeholderTextColor='#c3c3c3'
  />
  <TouchableOpacity
  style={styles.button}
  onPress={this.buscarCep}
   >
    <Text>
      Buscar
      </Text>
    </TouchableOpacity>
    {
      this.state.dados.localidade ? <View>
      <Text>
 Estado: {this.state.dados.uf}
      </Text>
      <Text>
Cidade: {this.state.dados.localidade}
      </Text>
      
      <Text>
 Bairro: {this.state.dados.bairro}
      </Text>
      <Text>
 Rua: {this.state.dados.logradouro}
      </Text>
    </View> : null
    }
</View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 200
  },
  
  text:{
    textAlign: 'center',
    fontSize: 20,

  },
  input:{
   
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#c3c3c3',
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  button:{
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c3c3c3',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});