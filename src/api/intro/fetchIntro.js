import checkStatus from '../HelperFunctions/CheckStatus';
import SetIntroData from '../../state/setState/intro/setIntroData'

const fetchIntroUrl =  'https://wetu.com/API/Itinerary/V7/Get?id=337f8ea2-35b7-40c8-9f90-211d70d78175'

export default function FetchIntro(){

  fetch( fetchIntroUrl, { method: 'GET'} )
  .then((res) => checkStatus(res))
  .then((res) => res.json())
  .then((res) => {
     SetIntroData(res);
  })
  .catch((e) => {
   //console.log('error occured during FetchIntro'+e)
  })
  .done();

};