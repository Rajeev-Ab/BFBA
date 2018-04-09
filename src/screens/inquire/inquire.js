import React, { Component } from 'react';
import {StyleSheet, View , Alert,Animated,Dimensions,Platform ,TextInput,TouchableOpacity,Image,Text, ScrollView} from 'react-native';
//import SmartScrollView from 'react-native-smart-scroll-view'
const {width,height} = Dimensions.get('window')
import { Dropdown } from 'react-native-material-dropdown'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Loader from '../../component/loader/loader'
import SendInquiry from '../../api/inquire/sendInquiry'
import GetStateItem from '../../state/getStateItem'
import InquiryChange from '../../state/emitters/inquiry/inquiryChange'

var radio_props = [
    {label: 'Email', value: 0 },
    {label: 'Phone', value: 1 }
  ];
  import DatePicker from 'react-native-datepicker'

export default class Inquire extends Component {
    constructor(props){
        super(props);
         this.state={userName:'',userMail:'',userMobile:'',value:0,date:'',nuAdult:'',nuChildren:'',comments:'',showLoader:false}

        this._back = this._back.bind(this);
        this.onChangeAdults = this.onChangeAdults.bind(this);
        this.onChangeChildren = this.onChangeChildren.bind(this);
        this.scrolldown =  this.scrolldown.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this._inquire = this._inquire.bind(this);
        this._inquiryChange = this._inquiryChange.bind(this);
    }

    componentDidMount(){
      InquiryChange.addInquiryListener(this._inquiryChange)
    }

    componentWillUnmount(){
      InquiryChange.removeInquiryListener(this._inquiryChange)
    }

    _inquiryChange(){
      this.setState({showLoader:false})
      let error = GetStateItem('error')
      if (error === 'true') {
      alert(GetStateItem('message'))
      }else{
        console.log("in else block")
        Alert.alert(
          '',
          GetStateItem('message'),
          [
            {text: 'OK', onPress: () =>this.props.navigation.goBack()},
          ],
          { cancelable: false }
        )
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


    _back(){
        this.props.navigation.goBack()
    }
    _inquire(){
      //  let error = this.validateInput()
      //  if (error !== ''){
      //    alert(error)
      //    return
      //  }

      //  // hit for the api

      //  console.log('date is'+this.state.date)
      //  console.log('parsed date is'+this.getParsedDate(this.state.date))

      var body = new FormData()
      body.append('first_name', this.state.userName)
      body.append('email', this.state.userName)
      body.append('phone', this.state.userMobile)
      body.append('no_of_days', 9)
      body.append('no_of_adults', this.state.nuAdult)
      body.append('no_of_children', this.state.nuChildren)
      body.append('start_date', this.getParsedDate(this.state.date))
      body.append('comments', this.state.comments)

      let params = {"first_name":this.state.userName,"email":this.state.userMail,"phone":this.state.userMobile,"no_of_days":9,"no_of_adults":2,"no_of_children":1,"start_date":this.getParsedDate(this.state.date),"comments":this.state.comments}
      //  console.log('params is'+JSON.stringify(params))
        //let params = {first_name:this.state.userName,email:this.state.userMail,phone:this.state.userMobile,no_of_days:9,no_of_adults:this.state.nuAdult,no_of_children:this.state.nuChildren,start_date:'29-05-2018',comments:this.state.comments}
        this.setState({showLoader:true})
       SendInquiry(params);
     }

     getParsedDate(date){
     var days = String(date).split('-');
      return days[2]+'-'+days[1]+'-'+days[0];
    }

    _renderBack(){
        if (Platform.OS == 'ios'){
            return(
                <TouchableOpacity style={{marginTop: 30,marginLeft:10,height:25,width:50,position:'absolute',backgroundColor:'black',borderRadius:4,alignItems:'center',justifyContent:'center'}} onPress={this._back}>
                <Image resizeMode={Image.resizeMode.center} source={require('../../img/back_arrow.png')}/>
                </TouchableOpacity>

            )
        }else{
            return(
                <View/>
                        )
        }
    }

    _renderTitle(){
      return(
                <View style={{marginTop: 20,height:40,width:width,position:'absolute',alignItems:'center',justifyContent:'center'}} onPress={this._back}>
                <Text style={{fontWeight:'bold',fontSize:20}}>INQUIRE</Text>
                </View>

            )
    }

    _renderName(){
        return(
            <View style={{width:width*0.94,height:50,left:width*0.03,marginTop:10,backgroundColor:'rgba(221,221,221,0.6)',borderRadius:25}}>
         <View style={{height: 40,width:width*0.94, marginTop:5}}>
            <TextInput
            ref="text1"
            underlineColorAndroid ={'transparent'}
            placeholder = {'Enter Name'}
            placeholderTextColor = {'black'}
             style={{height: 40,width:width*0.94-20, marginLeft:10}}
             onFocus={()=>this.text1.blur()}
             onChangeText={(userName) => this.setState({userName})}
              value={this.state.userName}
             />
      </View>
            </View>
        )
    }

    _renderEmail(){
        return(
          <View style={{width:width*0.94,height:50,left:width*0.03,marginTop:10,backgroundColor:'rgba(221,221,221,0.6)',borderRadius:25}}>
          <View style={{height: 40,width:width*0.94, marginTop:5}}>
             <TextInput
             underlineColorAndroid ={'transparent'}
             placeholder = {'Enter Email'}
             placeholderTextColor = {'black'}
             style={{height: 40,width:width*0.94-20, marginLeft:10}}
             onChangeText={(userMail) => this.setState({userMail})}
              value={this.state.userMail}
             />
      </View>
            </View>
        )
    }

    _renderContact(){
        return(
          <View style={{width:width*0.94,height:50,left:width*0.03,marginTop:10,backgroundColor:'rgba(221,221,221,0.6)',borderRadius:25}}>
          <View style={{height: 40,width:width*0.94, marginTop:5}}>
             <TextInput
             underlineColorAndroid ={'transparent'}
             placeholder = {'Mobile Number'}
             placeholderTextColor = {'black'}
             style={{height: 40,width:width*0.94-20, marginLeft:10}}
             onChangeText={(userMobile) => this.setState({userMobile})}
              value={this.state.userMobile}
             />
      </View>
            </View>
        )
    }

    _renderContactPreference(){
        return(
            <View style={{width:width*0.94,left:width*0.03,marginTop:15}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'rgba(169,169,169,1.0)'}}>Contact Preference</Text>
            <RadioForm
            style={{width:100,height:60,marginTop:10,left:-5}}
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
            </View>
        )
    }


    onChangeAdults(text){
  this.setState({nuAdult:text})
    }

    onChangeChildren(text){
      this.setState({nuChildren:text})
        }

    _renderAdult(){
        let data = [{
            value: '1',
          }, {
            value: '2',
          }, {
            value:'3',
          },{
            value: '4',
          }, {
            value: '5',
          }, {
            value:'6',
          },{
            value: '7',
          }, {
            value: '8',
          }, {
            value:'9',
          },{
            value: '10',
          }, {
            value:'11',
          }, {
            value:'12',
          }, {
            value:'12+',
          }];
        return(
            <View style={{width:width*0.94,left:width*0.03,marginTop:15}}>
            <View style={{height: 40,width:width*0.94, marginTop:-15}}>
            <Dropdown
            onChangeText={this.onChangeAdults}
        label='Number of Adults'
        data={data}
      />
             </View>
            </View>
        )
    }

    _renderChildren(){
        let data = [{
            value: '1',
          }, {
            value: '2',
          }, {
            value:'3',
          },{
            value: '4',
          }, {
            value: '5',
          }, {
            value:'6',
          },{
            value: '7',
          }, {
            value: '8',
          }, {
            value:'9',
          },{
            value: '10',
          }, {
            value:'11',
          }, {
            value:'12',
          }, {
            value:'12+',
          }];
        return(
            <View style={{width:width*0.94,left:width*0.03,marginTop:25}}>
            <View style={{height: 40,width:width*0.94, marginTop:0}}>
            <Dropdown
            onChangeText={this.onChangeChildren}

        label='Number of Children'
        data={data}
      />
             </View>
            </View>
        )
    }

    _renderStartDate(){
        return(
            <View style={{width:width*0.94,left:width*0.03,marginTop:35}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'rgba(169,169,169,1.0)'}}>Start Date</Text>
           <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
         confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({date: date})}}
      />
            </View>

        )
    }

    scrolldown(){
      this.refs.scrollView.scrollTo(300);
    }
    _renderMessage(){
        return(
            <View style={{width:width*0.94,height:120,backgroundColor:'rgba(221,221,221,0.6)' ,borderRadius:20,left:width*0.03,marginTop:15}}>
            <View style={{width:width*0.94, marginTop:5}}>
            <TextInput
            underlineColorAndroid ={'transparent'}
            placeholder={' Message here...'}
            numberOfLines={5}
            onFocus={this.scrolldown}
             style={{width:width*0.94-20, marginLeft:10}}
             onChangeText={(comments) => this.setState({comments})}
              value={this.state.comments}
             />
      </View>
            </View>
        )
    }

    _renderInquireButton(){
        return(
           <TouchableOpacity style={{marginTop:20,width:width*0.86,height:40,borderRadius:8,marginLeft:width*0.07,backgroundColor:'rgba(100,171,78,1.0)',justifyContent:'center',alignItems:'center'}} onPress={this._inquire}>
          <Text style={{color:'white',fontSize:width*0.06}}>INQUIRE</Text>
           </TouchableOpacity>
        )
    }

    validateInput(){
      if (this.state.userName === ''){
        return 'Please provide Name'
      }else if (this.state.userMail === ''){
        return 'Please provide email id'
      }else if (this.validateEmail(this.state.userMail) === false){
        return 'Please provide correct email id'
      }else if (this.state.userMobile === ''){
        return 'Please provide Mobile Number'
      }else if (this.state.userMobile.length < 10){
        return 'Please provide correct Mobile Number'
      }else if (this.state.nuAdult === ''){
        return 'Please provide number of adults'
      }else if (this.state.nuChildren === ''){
        return 'Please provide number of children'
      }else if (this.state.date === ''){
        return 'Please provide start date'
      }else {
        return ''
      }
    }
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

    render(){
        return(
          <View style={{flex:1,backgroundColor:'rgba(255,255,255,1.0)'}}>
           {this._renderTitle()}
          {this._renderBack()}
          <ScrollView ref="scrollView" style={{width:width,marginTop:60,height:height-60}} >
          {this._renderName()}
          {this._renderEmail()}
          {this._renderContact()}
          {this._renderContactPreference()}
          {this._renderAdult()}
          {this._renderChildren()}
          {this._renderStartDate()}
          {this._renderMessage()}
          {this._renderInquireButton()}
          <View style={{width:width,height:60}}/>



          </ScrollView>
          {this._renderLoader()}
          </View>
        )
    }
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: 'green'
}, scrollViewContainer:{
    marginTop:50,
    width:width,
    height : height-50,
    backgroundColor:'red'
}
});