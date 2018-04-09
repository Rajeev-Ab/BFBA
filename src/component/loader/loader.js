import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Platform,

  TouchableOpacity,
  Text
} from 'react-native';

import {MaterialIndicator} from 'react-native-indicators';
const {width,height} = Dimensions.get('window')


export default class Loader extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style={[this.props.style,,{justifyContent:'center',alignItems:'center'}]}>
            <View style={{width:130,height:130,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(1,1,1,0.6)',borderRadius:11}}>
            <MaterialIndicator color='white' />
            <Text style={{color:'white',top:-20,textAlign:'center',fontWeight:'bold'}}>Loading...</Text>
            </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',alignItems:'center'
    }
})