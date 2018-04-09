
import assign from 'object-assign';
import EventEmitter from 'events';

const InquiryChange = assign(EventEmitter.prototype, {

  addInquiryListener: function(cb){
    this.on('INQUIRY_CHANGE',cb);
  },
  removeInquiryListener: function(cb){
    this.removeListener('INQUIRY_CHANGE',cb);
  },
});

export default InquiryChange;