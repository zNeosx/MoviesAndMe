import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

class MyAppText extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
      return (
            <Text style={{ fontFamily: 'Times New Roman', color:'#f1f1f1'}}>
                {this.props.children}
            </Text>
      )
    }
}
  export default MyAppText