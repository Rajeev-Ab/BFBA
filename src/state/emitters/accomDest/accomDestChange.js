
import assign from 'object-assign';
import EventEmitter from 'events';

const AccomDestChange = assign(EventEmitter.prototype, {

  addAccomDestChangeListener: function(cb){
    this.on('ACCOM_DEST_CHANGE',cb);
  },
  removeAccomDestChangeListener: function(cb){
    this.removeListener('ACCOM_DEST_CHANGE',cb);
  },
});

export default AccomDestChange;