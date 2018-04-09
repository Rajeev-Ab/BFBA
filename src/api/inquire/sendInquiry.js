import checkStatus from '../HelperFunctions/CheckStatus';
import SetIntroData from '../../state/setState/intro/setIntroData'
import SetStateItem from '../../state/setState/setStateItem'
import InquiryChange from '../../state/emitters/inquiry/inquiryChange'
const sendInquiryUrl =  'https://www.tokenya.com/api_contact_us'

export default function SendInquiry(opts){

//let params = {"first_name":this.state.userName,"email":this.state.userMail,"phone":this.state.userMobile,"no_of_days":9,"no_of_adults":2,"no_of_children":1,"start_date":this.getParsedDate(this.state.date),"comments":this.state.comments}
  var body = new FormData()
  body.append('first_name', opts.first_name)
  body.append('email', opts.email)
  body.append('phone', opts.phone)
  body.append('no_of_days', opts.no_of_days)
  body.append('no_of_adults', opts.no_of_adults)
  body.append('no_of_children', opts.no_of_children)
  body.append('start_date', opts.start_date)
  body.append('comments', opts.comments)

    let data = {
        method: 'POST',
        body: body,
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        }
      }


  fetch( sendInquiryUrl, data)
  .then((res) => checkStatus(res))
  .then((res) => res.json())
  .then((res) => {
     console.log('response'+JSON.stringify(res))
     SetStateItem('error',res.error)
     SetStateItem('message',res.message)
     InquiryChange.emit('INQUIRY_CHANGE')
  })
  .catch((e) => {
   //console.log('error occured during FetchIntro'+e)
   SetStateItem('error',true)
     SetStateItem('message','Some Error occured')
     InquiryChange.emit('INQUIRY_CHANGE')
  })
  .done();

};