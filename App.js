// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, FlatList } from 'react-native';
import {icon} from "./assets/icon.png";
import SingleTodo from './components/SingleTodo';
import AsyncStorage from "@react-native-async-storage/async-storage"; 


const App = () => {

const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);


const handleAddTodo = () =>{
  if(!todo) return

  setTodos([...todos,{id: Date.now(), text: todo }]);
  setTodo("");
}

const fetchTodos= async () => {
  const data = await AsyncStorage.getItem("todos");
  if(data) setTodos(JSON.parse(data));
};

useEffect(()=>{
  fetchTodos();
},[])

  return (
    
    <View style ={styles.container}>
          
     
      <Text style={styles.heading}> Do what you like</Text>
      
      
      
      <View style={styles.inputContainer}>

      <TextInput 
      onChangeText={(text)=>setTodo(text)} 
      value= {todo}
      placeholder="ENTER WHAT DO YOU LIKE" 
      style={styles.input} />


      <TouchableOpacity onPress={handleAddTodo}>
        <Text style={styles.button}>Go</Text>
      </TouchableOpacity>


      </View>


        {/* <ScrollView>
          {todos.map(todo=>(
            <Text key={todo.id}>{todo.text}</Text>
          ))}
        </ScrollView> */}

        <View style={{width:"100%", marginTop: 10, }}>
        <FlatList
        data={todos}
        renderItem={({item})=> <SingleTodo
        todo={item}
        todos={todos}
        setTodos={setTodos}
        />}
        keyExtractor={(item)=>item.id.toString()}
        
        />


        </View>



     <StatusBar style="auto"/>

      <View style={styles.footer}>
          <Text style={styles.textStyle}>Have nice Day</Text>
        </View>

     

    </View>
  );
};

export default App; 

const styles = StyleSheet.create({
  container: {
    flex:1,
    // height:800,
    alignItems:"center",
    backgroundColor: "#ffff66",
  },
  heading:{
    color: "#b35900",
    // shadowColor:"black",
    // elevation:20,
    marginVertical:30,
    fontSize:30,
    fontWeight:"700",
  },
  inputContainer:{
    flexDirection: "row",
    marginHorizontal:10,
    alignItems: "center",
  },
  input:{
    flex:1,
    shadowColor:"black",
    backgroundColor:"#6798c9",
    elevation:20,
    marginRight:5,
    borderRadius:50,
    paddingHorizontal:20,
    paddingVertical:10,
  },
  button:{
    padding: 15,
    backgroundColor: "#0366fc",
    borderRadius:50,
    elevation:10,
  },
  footer:{
    width: '100%',
    height: 50,
    backgroundColor: '#ffb566',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
})