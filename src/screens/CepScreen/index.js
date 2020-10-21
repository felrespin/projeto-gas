import React, { useState, Component } from 'react'
import { render } from 'react-dom';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import styles from './styles';
//import { firebase } from '../../firebase/config'
//import {BuscaCEP} from '../../utils/CepPromise/BuscaCEP.js';

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
      Buscar meu CEP:
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
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        paddingVertical: 20
      },
      
      text:{
        textAlign: 'center',
        fontSize: 20,
    
      },
      input:{
       
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#788eec',
        paddingHorizontal: 50,
        paddingVertical: 15,
      },
      button:{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#788eec',
        paddingHorizontal: 20,
        paddingVertical: 15,
      },
      cepContainer:{
        
        marginTop: 20,  
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },

      inputCep:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
       // marginHorizontal: 20,
        //paddingVertical: 200
      }


      /*inputCepResponsenseContainer:{
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#c3c3c3',
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 5,
      },
      */
    });
