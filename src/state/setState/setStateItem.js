import STATE from '../state'


export default function SetStateItem(key,value){
    // used to set single item in STATE, pass key argument as STRING!!!
    return (
      STATE[key] = value
    )
  }

