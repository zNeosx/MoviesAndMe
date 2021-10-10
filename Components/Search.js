import React from 'react'
import {StyleSheet, View, Button, TextInput, Text, FlatList, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = { 
            films : [], 
            isLoading: false,
        }
        this.searchedText = ""
    }

    _loadFilms() {
        this.setState({ isLoading: true})
        if(this.searchedText.length > 0){
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                 })
            })
        }
        else{
            this.setState({
                films: [],
                isLoading: false
            })
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
    
    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        })
        this._loadFilms()
    }

    _displayDetailForFilm = (idFilm) => {
        // console.log(" L'i du film : " + idFilm); 
        this.props.navigation.navigate("FilmDetails", {idFilm: idFilm})
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film" onSubmitEditing={ () => {this._searchFilms()}} />
                <Button title="Rechercher" onPress={ () => {this._searchFilms()}} />
                <FlatList 
                    data={this.state.films}
                    keyExtractor= {(item) => item.id.toString()}
                    onEndReachedThreshold= {0.5}
                    onEndReached= {() => {
                        if(this.page < this.totalPages){
                            this._loadFilms()
                        }
                    }}
                    renderItem = { ({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/> }
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 30, 
        flex: 1, 
        backgroundColor: '#0f0f0f'
    },

    textinput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        fontFamily: 'Times New Roman',
        color: '#f1f1f1', 
        borderColor: "#f1f1f1", 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }, 
    any_results: {
        fontSize: 30,
        fontWeight: '800', 
        fontFamily: 'Times New Roman', 
        color: '#f1f1f1', 
        textAlign: 'center', 
        marginBottom: 30
    }
})

export default Search