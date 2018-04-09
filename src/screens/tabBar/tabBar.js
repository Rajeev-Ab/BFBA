import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  FlatList,
  Platform,
ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';

 import Loader from '../../component/loader/loader'
import FetchIntro from '../../api/intro/fetchIntro'
 import FetchAccomDest from '../../api/accomdation/fetchAccomDest'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
 import IntroDataChange from '../../state/emitters/intro/introDataChange'
 import AccomDestChange from '../../state/emitters/accomDest/accomDestChange'
 const {width,height} = Dimensions.get('window')
 import GetStateItem from '../../state/getStateItem'
 import HTMLView from 'react-native-htmlview'
 import Tts from 'react-native-tts'
 import Inquire from '../inquire/inquire'
 import { Dropdown } from 'react-native-material-dropdown'
 import Accordion from 'react-native-collapsible/Accordion'

const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...'
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...'
    }
  ];
export default class TabBar extends Component{
    _keyExtractor = (item, index) => item;
    constructor(props){
        super(props);
         this._back = this._back.bind(this);
         this._inquire = this._inquire.bind(this);
         this.introChange = this.introChange.bind(this)
         this.accomDestChange = this.accomDestChange.bind(this)
         this._playPriceIncuding = this._playPriceIncuding.bind(this);
         this._playPriceExcuding = this._playPriceExcuding.bind(this);
        this.onChangeText =  this.onChangeText.bind(this);
         this.onChangeTextDestination = this.onChangeTextDestination.bind(this);
         this.state = {dayByDayData:[],showLoader:false,isSpeaking:false,isSpeakingPriceExclude:false,showInquire:true,isAccomDataFound:false,accomData:[],selectedIndex:0,selectedDestinationIndex:0,sliderIndex:0,maxSlider:0,sliderIndexAccom:0,maxSliderAccom:0,showImageSlider:false,selectedSliderIndex:-1,dataArray:[]}
          // this.state = {showLoader:false,isSpeaking:false,isSpeakingPriceExclude:false,selectedDestinationIndex:0,isAccomDataFound:false,accomData:[],sliderIndex:0,maxSlider:0}
    }

     introChange=()=>{
         let array = GetStateItem('dayByDayArray')
         this.setState({showLoader:false,dayByDayData:array});
     }
    accomDestChange=()=>{

        this.setState({isAccomDataFound:true});
        let array = GetStateItem('destinationArray');
           let imageArray = array[this.state.selectedDestinationIndex].images
           if (imageArray.length > 0){
               this.setState({sliderIndex:0,maxSlider:imageArray.length-1})
               this.startAnimation()
           }

           let arrayAccom = GetStateItem('accomdationsArray');
           let imageArrayAccom = arrayAccom[this.state.selectedIndex].images
           if (imageArrayAccom.length > 0){
               this.setState({sliderIndexAccom:0,maxSliderAccom:imageArrayAccom.length-1})
              this.startAnimationAccom()
           }
    }

    componentDidMount(){
         IntroDataChange.addIntroDataListener(this.introChange);
         AccomDestChange.addAccomDestChangeListener(this.accomDestChange);
         this.setState({showLoader:true});
         FetchAccomDest()
         FetchIntro()


        Tts.addEventListener('tts-start', (event) => console.log("start", event));
        Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
        Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
    }

    componentWillUnmount(){
         IntroDataChange.removeIntroDataListener(this.introChange)
         AccomDestChange.removeAccomDestChangeListener(this.accomDestChange)
         clearInterval(this.destInterval)
        clearInterval(this.accomInterval)
    }

    _inquire=()=>{
        this.props.navigation.navigate('Inquire');
    }
    _back=()=>{
   this.props.navigation.goBack()
    }

    _playPriceIncuding=()=>{
        if (this.state.isSpeakingPriceExclude){
            Tts.stop();
            this.setState({isSpeakingPriceExclude:false});
        }

       if (this.state.isSpeaking === false){
           this.setState({isSpeaking:true,isSpeakingPriceExclude:false});
           let intro = GetStateItem('introductionData');


            let price_including = intro[0].price_includes
        //var element = document.getElementById('txt');
        var text = price_including.replace(/<[^>]*>/g, "")

        Tts.speak(text);
       }else{

        Tts.stop();
        this.setState({isSpeaking:false});
       }


     }
    _playPriceExcuding=()=>{
        if (this.state.isSpeaking){
            Tts.stop();
            this.setState({isSpeaking:false});
        }

        if (this.state.isSpeakingPriceExclude === false){
            this.setState({isSpeakingPriceExclude:true,isSpeaking:false});
            let intro = GetStateItem('introductionData');


             let price_including = intro[0].price_excludes
         //var element = document.getElementById('txt');
         var text = price_including.replace(/<[^>]*>/g, "")

         Tts.speak(text);
        }else{

         Tts.stop();
         this.setState({isSpeakingPriceExclude:false});
        }
    }


    _renderLoader=()=>{
        if (this.state.showLoader){
            return(
              <Loader style={{width:width,height:height,position:'absolute'}}/>
            )
        }else{
            return(
                <View/>
            )
        }
    }

    _renderInquire=()=>{
        return(
            <TouchableOpacity style={{marginTop: 30,marginLeft:width - 120,height:25,width:100,position:'absolute',backgroundColor:'rgba(100,171,78,1.0)',borderRadius:4,justifyContent:'center',alignItems:'center'}} onPress={this._inquire}>
            <Text style={{color:'white'}}>INQUIRE</Text>
            </TouchableOpacity>
        )
    }


_renderBack=()=>{
    if (Platform.OS == 'ios'){
        return(
            <TouchableOpacity style={{marginTop: 30,marginLeft:10,height:25,width:50,position:'absolute',backgroundColor:'black',borderRadius:4,alignItems:'center',justifyContent:'center'}} onPress={this._back}>
            <Image resizeMode={Image.resizeMode.center} style={{width:30,height:20}}source={require('../../img/back_arrow.png')}/>
            </TouchableOpacity>

        )
    }else{
        return(
            <View/>
                    )
    }
}
    _renderTabIndicator=()=>{
        let tabs = [
            {
                text: 'Overview',
                iconSource: require('../../img/home.png'),
                selectedIconSource: require('../../img/home_selected.png')
            },{
                text: 'Day-by-day',
                iconSource: require('../../img/bars.png'),
                selectedIconSource: require('../../img/bars_selected.png')
        },{
                text: 'Destinations',
                iconSource: require('../../img/globe.png'),
                selectedIconSource: require('../../img/globe_selected.png')
            },{
                text: 'Accommodations',
                iconSource: require('../../img/bed.png'),
                selectedIconSource: require('../../img/bed_selected.png')
        }];
        return <PagerTabIndicator style={{backgroundColor:'rgba(21,21,21,0.85)',height:65}}tabs={tabs} />;
    }



    _renderIntroduction=()=>{
        let intro = GetStateItem('introductionData');

        if (intro.length > 0){
            let test = intro[0].summary
            let price = intro[0].price
            var textPrice = price.replace(/<[^>]*>/g, "")
            let price_including = intro[0].price_includes
            let price_exluding = intro[0].price_excludes
            var textPriceInclude = price_including.replace(/<[^>]*>/g, "")
            var textPriceExclude = price_exluding.replace(/<[^>]*>/g, "")
            //console.log('test'+test)
            return(
                <View style={{backgroundColor:'rgba(238,238,238,1.0)'}}>
                <ScrollView style={{width:width*0.94,marginLeft: width*0.03,marginTop: 60}}>
                                <HTMLView
            value={test}
            style={{width:width*0.94,marginTop: 20}}

          />

         <View style={{width:width*0.94,borderWidth:1,borderColor:'#ddd',borderBottomWidth:0,borderRadius:2,backgroundColor:'rgba(255,255,255,1.0)',shadowColor:'#000',shadowOffset:{width: 0, height: 4},shadowOpacity:0.8,shadowRadius:2,elevation:1}}>
          <View style={{width:width*0.94,height:40,backgroundColor:'rgba(221,221,221,1.0)',flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../img/price.png')} style={{marginLeft:10,width:24,height:24}}/>
          <Text style={{fontSize:16,color:'rgba(31,31,31,0.8)',fontWeight:'bold'}}>  Price</Text>
          </View>
          <Text
            style={{width:width*0.90,marginTop: 5,marginLeft:width*0.02,color:'rgba(21,21,21,0.7)',fontSize:14}}
            >{textPrice}</Text>
            <View style={{width:width*0.94,height:15}}/>
            </View>



          <View style={{width:width*0.94,marginTop:30,borderWidth:1,borderColor:'#ddd',borderBottomWidth:0,borderRadius:2,backgroundColor:'rgba(255,255,255,1.0)',shadowColor:'#000',shadowOffset:{width: 0, height: 4},shadowOpacity:0.8,shadowRadius:2,elevation:1}}>
          <View style={{width:width*0.94-2,height:40,backgroundColor:'rgba(221,221,221,1.0)',flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../img/tick.png')} style={{marginLeft:10,width:20,height:20}}/>
          <TouchableOpacity style={{width:width*0.20,marginLeft:width*0.74,position:'absolute',alignItems:'center',justifyContent:'center'}} onPress={this._playPriceIncuding}>
          <Image source={require('../../img/speaker.png')} style={{marginLeft:10,width:20,height:20}}/>
          </TouchableOpacity>
          <Text style={{fontSize:16,color:'rgba(31,31,31,0.8)',fontWeight:'bold'}}>  Price Includes</Text>
          </View>
          <View style={{width:width*0.94,height:10}}/>
          <Text
            style={{width:width*0.90,marginTop: 5,marginLeft:width*0.02,color:'rgba(21,21,21,0.7)',fontSize:14}}
            >{textPriceInclude}</Text>
            <View style={{width:width*0.94,height:15}}/>
            </View>

           <View style={{width:width*0.94,marginTop:30,borderWidth:1,borderColor:'#ddd',borderRadius:2,borderBottomWidth:0,backgroundColor:'rgba(255,255,255,1.0)',shadowColor:'#000',shadowOffset:{width: 0, height: 4},shadowOpacity:0.8,shadowRadius:2,elevation:1}}>
          <View style={{width:width*0.94-2,height:40,backgroundColor:'rgba(221,221,221,1.0)',flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../img/error.png')} style={{marginLeft:10,width:20,height:20}}/>
          <TouchableOpacity style={{width:width*0.20,marginLeft:width*0.74,position:'absolute',alignItems:'center',justifyContent:'center'}}  onPress={this._playPriceExcuding}>
          <Image source={require('../../img/speaker.png')} style={{marginLeft:10,width:20,height:20}}/>
          </TouchableOpacity>
          <Text style={{fontSize:16,color:'rgba(31,31,31,0.8)',fontWeight:'bold'}}>  Price Excludes</Text>
          </View>
          <View style={{width:width*0.94,height:10}}/>
          <Text
            style={{width:width*0.90,marginTop: 5,marginLeft:width*0.02,color:'rgba(21,21,21,0.7)',fontSize:14}}
            >{textPriceExclude}</Text>
            <View style={{width:width*0.94,height:15}}/>
            </View>

            <View style={{width:width*0.94,height:20}}/>

          </ScrollView>
                            </View>
            )
        }else{

                return(
                    <View style={{backgroundColor:'rgba(251,251,251,1.00)'}}>

                                </View>
                )

        }

    }
    onChangeTextDestination=(text)=>{
        let index = this._getDestinationSelectedIndex(text)
        if((index !== -1) && (this.state.selectedDestinationIndex !== index) ){

           let array = GetStateItem('destinationArray');
           let imageArray = array[index].images
           if (imageArray.length > 0){
               clearInterval(this.destInterval)
               this.setState({sliderIndex:0,maxSlider:imageArray.length-1})
              this.scrollToIndex(0,false);
              this.startAnimation()
               this.scrollToIndex(0,false);
           }else{
            clearInterval(this.destInterval)
           }
            this.setState({selectedDestinationIndex:index});
        }
    }
    onChangeText=(text)=>{
  //console.log('text'+text)
  let index = this._getSelectedIndex(text)
    if((index !== -1) && (this.state.selectedIndex !== index) ){
        this.scrollToIndexAccom(0,false);
        let array = GetStateItem('accomdationsArray');
        let imageArray = array[index].images
        if (imageArray.length > 0){
            clearInterval(this.accomInterval)
            this.setState({sliderIndexAccom:0,maxSliderAccom:imageArray.length-1})
            this.startAnimationAccom()
        }
       this.setState({selectedIndex:index});
    }
    }

    _getDestinationSelectedIndex=(valueName)=>{
        let array = GetStateItem('destinationArray');
        let resultIndex = -1
        for(var index = 0 ; index < array.length - 1 ;index++){
            if  (valueName === array[index].name){
                resultIndex = index
                break
            }
       }
       return resultIndex
    }
    _getSelectedIndex=(valueName)=>{
        let array = GetStateItem('accomdationsArray');
        let resultIndex = -1
        for(var index = 0 ; index < array.length - 1 ;index++){
            if  (valueName === array[index].name){
                resultIndex = index
                break
            }
       }
       return resultIndex
    }
    _renderAccomdation=()=>{
        let array = GetStateItem('accomdationsArray');
        //console.log('array'+JSON.stringify(array))
        let data = []
        let imagesData = []
        let test = ''
        if  (array.length > 0){

            for(var index = 0 ; index < array.length - 1 ;index++){
                 let name  = {value:array[index].name};
                 //console.log('CheckArray'+index+'name'+name)

                data.push(name);
            }
             imagesData = array[this.state.selectedIndex].images
             test = array[this.state.selectedIndex].general_description
            //this.setState({accomData:imagesData});
            var textHtml = test.replace(/<[^>]*>/g, "")
        }
        //console.log('imagesData'+imagesData);



        if  (array.length > 0){
            return(
                <View style={{backgroundColor:'rgba(238,238,238,1.0)'}}>
                       <View style={{width:width,height:height-120,marginTop:60}}>
                       <View style={{width:width*0.90,marginLeft:width*0.05,height:40}}>
                       <Dropdown
                       value={data[0].value}
                       onChangeText={this.onChangeText}
                    label='Select Accomdation'
                     data={data}/>
                       </View>
<View style={{width:width,height:15}}/>
                       <ScrollView style={{marginTop:20}} >
                       <FlatList
                       ref={this.setRefAccom}
                       style={{width:width,height:height*0.30,top:10}}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={imagesData}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) =>  <Image
        source={{ uri: item }}
        style={{ height:height*0.30, width: width,backgroundColor:'white' }}
      />}
      />
      <Text style={{marginTop:25,width:width*0.30,marginLeft:10,color:'gray',fontSize:14,fontWeight:'normal'}}>Accomdation</Text>
      <Text style={{marginTop:15,marginLeft:10,width:width-30,color:'rgba(31,31,31,0.8)',fontSize:18,fontWeight:'bold'}}>{array[this.state.selectedIndex].name}</Text>

<Text
        style={{width:width*0.94,marginLeft:10,marginTop: 20,fontSize:14,color:'rgba(21,21,21,0.7)'}}

      >{textHtml}</Text>
<View style={{width:width,height:60}}/>
            </ScrollView>

                       </View>
                </View>

            )
        }else{
            return(
                <View style={{backgroundColor:'#1AA094'}}>
                 </View>

            )
        }

    }

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
      }
      setRef = (c) => {
        this.listRef = c;
      }

      startAnimation=()=>{
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


      scrollToIndexAccom = (index, animated) => {
        this.listRefAccom && this.listRefAccom.scrollToIndex({ index, animated })
      }
      setRefAccom = (c) => {
        this.listRefAccom = c;
      }

      startAnimationAccom=()=>{
       this.accomInterval = setInterval(function() {
            const { sliderIndexAccom, maxSliderAccom } = this.state
            let nextIndex = 0

            if (sliderIndexAccom < maxSliderAccom) {
              nextIndex = sliderIndexAccom + 1
            }

            this.scrollToIndexAccom(nextIndex, true)
            this.setState({sliderIndexAccom: nextIndex})
          }.bind(this), 2000)
      }

//       _renderImageSlider(){
//           if (this.state.showImageSlider){
//               return(
//                   <ImageSlider style={{position:'absolute'}} sliderIndex={this.state.selectedSliderIndex} data={this.state.dataArray}/>
//               )
//           }else{
//               return(
//                   <View/>
//               )
//           }
//       }

    _renderDestination=()=>{
        let array = GetStateItem('destinationArray');
        //console.log('array'+JSON.stringify(array))
        let data = []
        let imagesData = []
        let test = ''
        if  (array.length > 0){
            //this.setState({sliderIndex:0,maxSlider:array.length-1})
            for(var index = 0 ; index < array.length - 1 ;index++){
                 let name  = {value:array[index].name};
                 //console.log('CheckArray'+index+'name'+name)

                data.push(name);
            }
             imagesData = array[this.state.selectedDestinationIndex].images
             test = array[this.state.selectedDestinationIndex].general_description
            //this.setState({accomData:imagesData});
            var textHtml = test.replace(/<[^>]*>/g, "")

        }



        if  (array.length > 0){

            return(
                <View style={{backgroundColor:'rgba(238,238,238,1.0)'}}>
                       <View style={{width:width,height:height-120,marginTop:60}}>
                       <View style={{width:width*0.90,marginLeft:width*0.05,height:40}}>
                       <Dropdown
                       value={data[0].value}
                       onChangeText={this.onChangeTextDestination}
                    label='Select Destination'
                     data={data}/>
                       </View>

                       <ScrollView style={{backgroundColor:'transparent',marginTop:20}} >
                       <FlatList
                       ref={this.setRef}
                       style={{width:width,height:height*0.30,top:10}}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={imagesData}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) =>  <Image
        source={{ uri: item }}
        style={{ height:height*0.30, width: width,backgroundColor:'white' }}
      />}
      />

      <Text style={{marginTop:25,width:width*0.30,marginLeft:10,color:'gray',fontSize:14,fontWeight:'normal'}}>Destination</Text>
      <Text style={{marginTop:15,marginLeft:10,width:width-30,color:'rgba(31,31,31,0.8)',fontSize:18,fontWeight:'bold'}}>{array[this.state.selectedDestinationIndex].name}</Text>

<Text
        style={{width:width*0.94,marginLeft:10,marginTop: 20,fontSize:14,color:'rgba(21,21,21,0.7)'}}

      >{textHtml}</Text>
      <View style={{width:width,height:60}}/>
                       </ScrollView>

                       </View>
                </View>

            )
        }else{
            return(
                <View style={{backgroundColor:'lightgray'}}>
                 </View>

            )
        }

    }

    _renderHeader(data) {
        let title = data.dayFor===''?'Day'+' '+data.day:'Day'+' '+data.day+'-'+' '+data.dayFor
        return (
            <View style={{width:width*0.96,marginLeft:width*0.02,height:60,marginTop:20,borderWidth:1,borderColor:'#ddd',borderBottomWidth:0,borderRadius:2,backgroundColor:'rgba(255,255,255,1.0)',shadowColor:'#000',shadowOffset:{width: 0, height: 4},shadowOpacity:0.8,shadowRadius:2,elevation:1}}>
            <Text style={{marginLeft:10,fontSize:16,marginTop:10,color:'rgba(31,31,31,0.8)',fontWeight:'bold'}}>{title}</Text>
            <View style={{width:width*0.96,marginTop:15,height:1,backgroundColor:'lightgray'}}/>
          </View>
        );
      }

      _renderContent(data) {
          let notes =  data.notes.replace(/<[^>]*>/g, "")
        return (
            <View style={{width:width*0.96,marginLeft:width*0.02,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor:'#ddd',borderRadius:2,backgroundColor:'rgba(255,255,255,1.0)',shadowColor:'#000',shadowOffset:{width: 0, height: 4},shadowOpacity:0.8,shadowRadius:2,elevation:1}}>
             <Text style={{marginLeft:10,fontSize:12,marginTop:5,color:'rgba(21,21,21,0.6)'}}>Day Notes</Text>
             <Text style={{marginLeft:10,fontSize:16,marginTop:5,color:'rgba(21,21,21,0.8)',fontWeight:'normal'}}>{notes}</Text>
             <View style={{width:width*0.96,height:20}}/>
          </View>
        );
      }

    _renderDayByDay=()=>{

        return(
                  <View style={{backgroundColor:'lightgray'}}>
                  <View style={{width:width,height:height-120,marginTop:60}}>
                  <ScrollView style={{backgroundColor:'transparent',marginTop:20}} >

                  <Accordion
        sections={this.state.dayByDayData}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
      <View style={{width:width*0.96,height:20}}/>
      </ScrollView>
      </View>
                    </View>
        )
    }


    render(){
        return(
            <View style={{flex:1}}>
              <IndicatorViewPager
					style={{flex:1, paddingTop:0, backgroundColor:'black'}}
                    indicator={this._renderTabIndicator()}
                >

                {this._renderIntroduction()}
                {this._renderDayByDay()}
                {this._renderDestination()}
                {this._renderAccomdation()}


                </IndicatorViewPager>
                {this._renderInquire()}
                {this._renderBack()}
                {this._renderLoader()}



            </View>
        )
    }
}


const stylesHML = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: 'yellow', // make links coloured pink
    },
  });