import React from 'react'
import {StyleSheet, View, Button, TextInput, Text, FlatList, ActivityIndicator, ScrollView, Image} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import MyAppText from './MyAppText'
import FilmDetailText from '../assets/styles/FilmDetailText'
import moment from 'moment'; 
import numeral from 'numeral';
import { connect } from 'react-redux'

class FilmDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined, 
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data, 
                isLoading: false
            })
        })
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
    
    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    componentDidUpdate(){
        console.log(this.props.favoritesFilm); 
    }
    _displayFilm(){
        const {film} = this.state
        if(this.state.film != undefined){
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)} }
                    />
                    <FilmDetailText>
                        <Text style={styles.scrollview_title}>{film.title}</Text>
                    </FilmDetailText>
                    <Button title="Favoris" onPress={() => this._toggleFavorite()}/>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <FilmDetailText>
                        Sorti le {moment(film.release_date).format('DD/MM/YYYY')}
                    </FilmDetailText>
                    <FilmDetailText >Note: {film.vote_average} / 10</FilmDetailText>
                    <FilmDetailText >Nombres de vote: {film.vote_count}</FilmDetailText>
                    <FilmDetailText >Nombres de vote: {numeral(film.budget).format('0,0[.]00 $')}</FilmDetailText>
                    <FilmDetailText >Genre(s): {film.genres.map((genre) => { return genre.name;}).join('/')}</FilmDetailText>
                    <FilmDetailText >Companie(s): {film.production_companies.map((production_companies) => { return production_companies.name;}).join('/')}</FilmDetailText>

                </ScrollView>
            )
        }
    }

    render() { 
        const idFilm = this.props.route.params.idFilm 
        return (
            <View style={styles.home_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    home_container: {
        flex: 1, 
        backgroundColor: '#0f0f0f', 
    },

    home_text: {
        color: '#f1f1f1'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    scrollview_container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 169,
        margin: 5
    }, 
    scrollview_title: {
        textAlign: 'center', 
        fontSize: 25, 
        margin: 20
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666', 
      textAlign: 'justify', 
      margin: 15
    }
})

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails)