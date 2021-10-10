import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

class FilmDetailText extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
      return (
            <Text style={styles.text}>
                {this.props.children}
            </Text>
      )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#f1f1f1', 
        margin: 5, 
        fontSize: 15
    }
})
  export default FilmDetailText