import {computed, observable} from 'mobx';
import ShareValue from './../model/ShareValue';

let accountLogId = 0;


export default class ShareValueStore {
    @observable shareValues: ShareValue[] = [];

    addShareValue(value: number) {
        this.shareValues.push(new ShareValue(value));
    }

    removeShareValue(shareValue: ShareValue) {
        const i = this.shareValues.findIndex(s => s.id === shareValue.id);
        this.shareValues.splice(i, 1);
    }
}
