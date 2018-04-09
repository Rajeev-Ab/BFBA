import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

const {width,height} = Dimensions.get('window')


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this._enter = this._enter.bind(this);
    }
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={5} />;
    }
    _renderInfoView(){
        return(
            <View style={{marginLeft:width*0.05,width:width*0.90,height:height*0.23,marginTop:height*0.60,position:'absolute',backgroundColor:'rgba(1,1,1,0.5)',borderRadius:7,alignItems:'center'}}>
            <Text style={{color:'white',fontSize:width*0.075,marginTop:height*0.02}}>BIG  APPLE  TO  BIG  FIVE</Text>
            <View style={{width:width*0.86,height:1,marginTop:height*0.01,backgroundColor:'white'}}/>
            <Text numberOfLines={2} style={{color:'white',fontSize:width*0.04,marginTop:height*0.02,textAlign:'left',width:width*0.86}}>Nairobi, Amboseli National Park, Lake Naivasha and Masai Mara</Text>
            <View style={{flexDirection:'row',width:width*0.86,height:20,marginTop:height*0.02,alignItems:'flex-start'}}>
            <Image style={{width:16,height:16}} source={require('../../img/moon.png')} />
            <Text style={{color:'white',fontSize:width*0.04,marginLeft:5,textAlign:'left'}}>8 Nights</Text>

            </View>
            </View>
        )
    }
    _enter(){
       // this.props.navigation.navigate('DrawerScreen');
        this.props.navigation.navigate('TabBar');
    }
    _renderEnterButton(){
        return(
           <TouchableOpacity style={{marginTop:height*0.85,width:width*0.86,height:40,borderRadius:8,marginLeft:width*0.07,backgroundColor:'rgba(100,171,78,1.0)',justifyContent:'center',alignItems:'center',position:'absolute'}} onPress={this._enter}>
          <Text style={{color:'white',fontSize:width*0.06}}>ENTER</Text>
           </TouchableOpacity>
        )
    }
    render(){
        return(
            <View style={styles.container}>
               <IndicatorViewPager
                    style={{height:height,width:width}}
                    autoPlayEnable={true}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Image source={require('../../img/1.jpg')} />
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                    <Image source={require('../../img/2.jpg')}  />
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                    <Image source={require('../../img/3.jpg')} />
                    </View>

                    <View style={{backgroundColor:'#1AA094'}}>
                    <Image source={require('../../img/4.jpg')} />
                    </View>

                    <View style={{backgroundColor:'#1AA094'}}>
                    <Image source={require('../../img/5.jpg')} />
                    </View>
                </IndicatorViewPager>
            {this._renderInfoView()}
            {this._renderEnterButton()}

           </View>
        )
    }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'yellow'
  },
  viewpager: {
    flex: 1,
  },
});


