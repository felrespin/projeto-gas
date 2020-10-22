import React, { useEffect, useState, useCallback, useRef } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import { firestore } from '@react-native-firebase/app'
import {BuscaCEP} from '../../utils/CepPromise/BuscaCEP01.js';
import {} from '@expo/vector-icons/Feather'
import Icon from '@expo/vector-icons/FontAwesome5'
import Picker from 'react-native-picker-select';
'@react-native-modal'

export default function HomeScreen(props) {
    const navigation =  useNavigation()
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const modalRef = useRef(false)
    const [isModal, setIsModal] = useState(false)

    const [buscaCep, setBuscaCep] = useState('')
    
    const fp =[
        {label: 'dinheiro', value:'1'},
        {label: 'cartao credito', value:'2'},
        {label: 'cartao debito', value:'3'}
    ]

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        const subscriber = entityRef
            .where("authorID", "==", userID) // BUG: `.where` is not working
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
        
            // Stop listening for updates when no longer required
            return () => subscriber();
    }, [userID])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntities([...entities, {...data, id: _doc.id}])
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {item.text}
                </Text>
            </View>
            
            
        )
    }

    const handleNavigateToFindCep = useCallback(()=>{
        //setIsModal(true)
        navigation.navigate('CepScreen')
    },[])

    return (
        <>
        {isModal ? (
            <Modal ref={modalRef} visible={isModal} transparent={!isModal}>
                <View style={{flex:1,backgroundColor:'#FFf', margin:'10%', justifyContent:'center', alignItems:'center'}}>
                
                <Picker 
                    onValueChange={(value) => alert(value)}
                    items={fp}
                />

                <TouchableOpacity onPress={()=>setIsModal(false)}>
                    <Text>Fechar modal</Text>
                </TouchableOpacity>


                <Icon name="arrow-left" size={30} />
                </View>
            </Modal>
          ):(
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Faça novo pedido'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityText(text)}
                        value={entityText}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Digite seu Cep'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setBuscaCep(text)}
                        value={setBuscaCep}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity  style={styles.button} onPress={handleNavigateToFindCep}>
                        <Text style={styles.buttonText}>Buscar</Text>
                    
                    </TouchableOpacity>
                    
                </View>
                { entities && (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={entities}
                            renderItem={renderEntity}
                            keyExtractor={(item) => item.id}
                            removeClippedSubviews={true}
                        />
                    </View>
                )}
            
            </View>
          )
                }
        </>
      
    )
}
