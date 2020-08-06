import React from 'react';
import { View } from 'react-native'
import styles from '../Landing/styles';
import PageHeader from '../../components/PageHeader';



function Favorites() {
  return ( 
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
    </View>
  
  )
}

export default Favorites