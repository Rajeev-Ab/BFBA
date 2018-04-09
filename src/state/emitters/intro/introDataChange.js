
import assign from 'object-assign';
import EventEmitter from 'events';

const IntroDataChange = assign(EventEmitter.prototype, {

  addIntroDataListener: function(cb){
    this.on('INTRO_DATA_CHANGE',cb);
  },
  removeIntroDataListener: function(cb){
    this.removeListener('INTRO_DATA_CHANGE',cb);
  },
});

export default IntroDataChange;
