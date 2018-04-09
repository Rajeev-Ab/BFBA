import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';

const {width,height} = Dimensions.get('window')

export default class ImageSlider extends Component{
    constructor(props){
        super(props);
        this.state = {sliderIndex:props.currentIndex,maxSlider:props.data.length-1}
    }
    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
      }
      setRef = (c) => {
        this.listRef = c;
      }

      startAnimation(){
       this.destInterval = setInterval(function() {
            const { sliderIndex, maxSlider } = this.state
            let nextIndex = 0

            if (sliderIndex < maxSlider) {
              nextIndex = sliderIndex + 1
            }

            this.scrollToIndex(nextIndex, true)
            this.setState({sliderIndex: nextIndex})
          }.bind(this), 2000)
      }

    componentDidMount(){
      //this.scrollToIndex(this.state.currentIndex,false);
      //this.startAnimation()
    }
    componentWillUnmount(){
        clearInterval(this.destInterval);
    }

    render(){
        return(
            <View style={this.props.style}>
            <FlatList
                       ref={this.setRef}
                       style={{width:width,height:height,top:10,backgroundColor:'black'}}
                       horizontal={true}
                       pagingEnabled={true}
                       showsHorizontalScrollIndicator={false}
                       data={this.props.data}
                       renderItem={({ item: rowData }) => {
                       //console.log('rowData'+rowData);
                     return (
                        <Image
                        source={{ uri: 'http://wetu.com/ImageHandler/'+width+'x'+Math.round(height*0.50)+'/'+rowData.url }}
                        style={{ height:height*0.50, width: width,backgroundColor:'white' }}
                      />
          );
        }}
        keyExtractor={(item, index) => index}
      />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        position: 'absolute'
    }
})