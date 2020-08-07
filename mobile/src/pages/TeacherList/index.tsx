import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native'
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather  } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage'

function TeacherList() {

  const [ isFilterVisible, setIsFilterVisible ] = useState(false)

  const [favorites, setFavorites] = useState<number[]>([])
  const [teachers, setTeachers] = useState([])

  const [ subject, setSubject ] = useState("")
  const [ week_day, setWeekDay ] = useState("")
  const [ time, setTime ] = useState("")

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response) 
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
        setFavorites(favoritedTeachersIds)
      }
     
    })
  }

  useFocusEffect(() => {
      loadFavorites()
  })

  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible)
  }

  async function handleFiltersSubmit() {

    loadFavorites()
    const response =  await api.get('/classes', { params: {
       subject, week_day, time
     } })

     console.log(response.data)
 
     setTeachers(response.data)
     handleToggleFiltersVisible()
  }
 

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF"/>
          </BorderlessButton>
        } >

        {
          isFilterVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                placeholder="Qual a matéria"
                placeholderTextColor='#c1bccc'
                style={styles.input}
                value={subject}
                onChangeText={text => setSubject(text)}
              />
  
              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                    <TextInput
                    placeholder="Qual o dia?"
                    placeholderTextColor='#c1bccc'
                    style={styles.input}
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                  />
                </View>
    
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                    <TextInput
                    placeholder="Qual o horário?"
                    placeholderTextColor='#c1bccc'
                    style={styles.input}
                    value={time}
                    onChangeText={text => setTime(text)}
                  />
                </View>
    
    
              </View>

              <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
               
            </View>
          )
        }
      
        
      </PageHeader>

    <ScrollView 
      style={styles.teacherList} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
    >
    {
      teachers.map((teacher: Teacher) => (
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher}
          favorited={favorites.includes(teacher.id)}
        />
      ))
    }
     
    </ScrollView>
     
    </View>
  )
}

export default TeacherList