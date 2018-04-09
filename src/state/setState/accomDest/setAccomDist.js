import GetStateItem from '../../getStateItem'
import SetStateItem from '../setStateItem'
import isDuplicateItem from '../HelperFunctions/IsDuplicateItem'
import AccomDestChange from '../../emitters/accomDest/accomDestChange'
import Accomdation from './accomdation'
import Destination from './destination'
export default function SetAccomDist(res){

    let array = GetStateItem('accomdationsArray');
    let destinationArray = GetStateItem('destinationArray')
    for (var index=0 ; index < res.length -1 ; index++ ){
       let type = res[index].type
       let name = res[index].name

       if (type === 'Accommodation'){
           // make array for Accomdation
           let object_id = res[index].map_object_id
           let country = res[index].position.country
           let region = res[index].position.region
           let location = res[index].position.location
           let destination = res[index].position.destination

           let general_description = res[index].content.general_description
           let contact_email = res[index].content.contact_information.email
           let contact_telephone = res[index].content.contact_information.telephone
           let contact_website_url = res[index].content.contact_information.website_url
           let contact_bookings_url = res[index].content.contact_information.bookings_url
           let contact_address = res[index].content.contact_information.address
           let contact_mobile_bookings_url = res[index].content.contact_information.mobile_bookings_url
           let contact_front_desk_telephone = res[index].content.contact_information.front_desk_telephone

           let imagesArray = res[index].content.images || [];

            let images = []
            if (imagesArray.length > 0) {
                for (var i=0;i<imagesArray.length-1;i++){
                    let url = imagesArray[i].url_fragment
                    images.push('http://wetu.com/ImageHandler/300x260/'+url)
                }
            }


           // let hotelLogo = res[index].content.logo.url || ''
            // //console.log('index is '+index+'accomdationsArray'+array)
           if  (!isDuplicateItem('object_id',array,object_id)) {
            //console.log('imagesArray'+imagesArray+'name'+name)
            array.push( new Accomdation(object_id,name,type,country,region,location,destination,general_description,contact_email,contact_telephone,contact_website_url,contact_bookings_url,contact_address,contact_mobile_bookings_url,contact_front_desk_telephone,images,''));
         };



       }else if (type === 'Destination'){
        let object_id = res[index].map_object_id
        let general_description = res[index].content.general_description

        let imagesArray = res[index].content.images || [];

        let images = []
        if (imagesArray.length > 0) {
            for (var i=0;i<imagesArray.length-1;i++){
                let url = imagesArray[i].url_fragment
                images.push('http://wetu.com/ImageHandler/300x260/'+url)
            }
        }
       //console.log('Destination name'+name+'ObjectId'+object_id+'images'+images.length)
        if  (!isDuplicateItem('object_id',destinationArray,object_id)) {
            destinationArray.push( new Destination(object_id,name,type,general_description,images));
         };
    }




}
SetStateItem('accomdationsArray',array)
SetStateItem('destinationArray',destinationArray)
AccomDestChange.emit('ACCOM_DEST_CHANGE');

}