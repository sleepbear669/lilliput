import {computed, observable} from 'mobx';

let id = 0;

export default class ShareValue {
    readonly id: number = id++;
    readonly value: number;

    constructor(value: number) {
        this.value = value;
    }
}
