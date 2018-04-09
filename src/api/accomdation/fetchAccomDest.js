import checkStatus from '../HelperFunctions/CheckStatus';
import SetAccomDist from '../../state/setState/accomDest/setAccomDist'

const fetchAccomDestUrl =  'https://wetu.com/API/Itinerary/V7/GetContent?id=337f8ea2-35b7-40c8-9f90-211d70d78175&appKey=22Z4HC9ZM8BJV42H'

export default function FetchAccomDest(){

  fetch( fetchAccomDestUrl, { method: 'GET'} )
  .then((res) => checkStatus(res))
  .then((res) => res.json())
  .then((res) => {
      //console.log('pinsCount'+res.pins.length)
      if (res.pins.length > 0 ){
        SetAccomDist(res.pins);
      }

  })
  .catch((e) => {
   //console.log('error occured during FetchIntro'+e)
  })
  .done();

};