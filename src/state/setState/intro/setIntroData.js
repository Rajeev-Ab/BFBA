import GetStateItem from '../../getStateItem'
import IntroData from './introData'
import SetStateItem from '../setStateItem'
import isDuplicateItem from '../HelperFunctions/IsDuplicateItem'
import IntroDataChange from '../../emitters/intro/introDataChange'
import DayByDay from './dayByDay'
export default function SetIntroData(res){
    let intro = GetStateItem('introductionData');

        let operator_id = res.operator_id;
        let operator_user_id = res.operator_user_id;
        let identifier = res.identifier;
        let name = res.name;
        let summary = res.summary;
        let price = res.price;
        let price_includes = res.price_includes;
        let price_excludes = res.price_excludes;




        if ( !isDuplicateItem('operator_user_id',intro,operator_user_id) ) {
            intro.push( new IntroData(operator_id,operator_user_id,identifier,name,summary,price,price_includes,price_excludes));
         };


         // setting dayByDay Data Array
      let dayByDayData = GetStateItem('dayByDayArray');

      let legsArray = res.legs
      let leg_id = res.itinerary_leg_id;
      let day = 0
      for (var index = 0;index < legsArray.length ; index++){
    //      // set the day

          let legsDays = legsArray[index].days

          for (var i = 0; i < legsDays.length ; i++){
               day += 1

            let dayNotes = legsDays[i].notes
             console.log('dayNotes'+dayNotes)

              let str1 = 'Nairobi'
            let str2 = 'Amboseli National Park'
            let str3 = 'Rift Valley'
            let str4 =  'Masaai Mara'
            var dayFor = ''


            if (dayNotes.includes(str1)){
                    dayFor = str1
            }else if (dayNotes.includes(str2)){
                dayFor = str2
            }else if (dayNotes.includes(str3)){
              dayFor = str3
           }else if (dayNotes.includes(str4)){
              dayFor = str4
            }else{
             dayFor = ''
            }

            if (day == 1){
                dayFor = ''
            }else  if (day == 2){
                dayFor = 'Nairobi'
            }else  if (day == 3){
                dayFor = 'Amboseli National Park'
            }else  if (day == 4){
                dayFor = ''
            }else  if (day == 5){
                dayFor = 'Rift Valley'
            }else  if (day == 6){
                dayFor = 'Masaai Mara'
            }else  if (day == 7){
                dayFor = ''
            }else  if (day == 8){
                dayFor = ''
            }else  if (day == 9){
                dayFor = 'Arrival'
            }


                dayByDayData.push( new DayByDay(leg_id,day,dayFor,dayNotes));


         }



     }
    console.log('dayByDayData'+JSON.stringify(dayByDayData));
    // SetStateItem('dayByDayArray',dayByDayData)
   SetStateItem('introductionData',intro)
  IntroDataChange.emit('INTRO_DATA_CHANGE');
}
