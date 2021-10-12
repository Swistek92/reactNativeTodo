//rnf + enter

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
// import { AntDesign } from '@expo/vector-icons'; 



export default function SingleTodo({todo, setTodos, todos}) {

const [edit, setEdit] = useState(false);
const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


const handleEdit = () => {
  if(!edit) setEdit(!edit);
  
  
  else  
         {
    setEdit(!edit);
    setTodos(
      todos.map((t)=>
      t.id === todo.id
      ? { 
        id:t.id,
        text: editText, } : t 
            )
            )
        AsyncStorage.setItem("todos", JSON.stringify(todos));
          };

  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id!== id))

  }


const fetchTodos= async () => {
  const data = await AsyncStorage.getItem("todos");
  if(data) setTodos(JSON.parse(data));
}

useEffect(()=>{
  fetchTodos();
},[])

  return (
    <View style={styles.todo}>

        { !edit? 
      <Text style={styles.dodoText}>{todo.text}</Text>:
      <TextInput 
      style={styles.todoInput} 
      value={editText}
      onChangeText={(text)=>setEditText(text)} 
      />
      }



      
   <TouchableOpacity>
               <Entypo 
                    style={styles.todoaction}
                    name="edit" 
                    size={22} 
                    color="#663300"
                    onPress={handleEdit}
                    />  
     </TouchableOpacity>


      <TouchableOpacity>
            <AntDesign
              style={styles.todoaction}
              name="delete"
              size={22}
              color="#ff8000"
              onPress={()=>handleDelete(todo.id)}
               />
              
     </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
todo:{
  flexDirection:"row",
  marginHorizontal: 10,
  elevation: 5,
  shadowColor: "black",
  backgroundColor: "white",
  paddingHorizontal: 20,
  paddingVertical: 10,
  marginBottom: 10,
  borderRadius:50,
  backgroundColor: "#1ae832",
},
dodoText:{
  flex:1,
  fontSize:18,
  paddingVertical: 3,
  paddingHorizontal: 5,
},
todoaction:{
  marginLeft: 15,
},
todoInput: {
  flex:1,
  fontSize:18,
  paddingHorizontal:5,
  borderRadius:50,
  borderColor:"grey",
  borderWidth:1,
}

});