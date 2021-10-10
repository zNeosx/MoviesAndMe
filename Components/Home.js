import React from 'react'
import {StyleSheet, View, Button, TextInput, Text, FlatList, ActivityIndicator} from 'react-native'
import MyAppText from './MyAppText'

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.home_container}>
                <Text style={styles.home_title}>Bienvenue sur mon Application de Gestion De Films !</Text>
                <Button 
                    title="Rechercher un film"
                    onPress={() => this.props.navigation.navigate('Rechercher')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    home_container: {
        flex: 1, 
        backgroundColor: '#0f0f0f', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    home_title: {
        fontSize: 30,
        fontWeight: '800', 
        fontFamily: 'Times New Roman', 
        color: '#f1f1f1', 
        textAlign: 'center', 
        marginBottom: 30
    }
})

export default Home