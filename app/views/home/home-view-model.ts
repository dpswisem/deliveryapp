import { Observable } from '@nativescript/core';

export class HomeViewModel extends Observable {
    constructor() {
        super();
        this.set('isOnline', false);
    }
    
    toggleOnlineStatus() {
        const currentStatus = this.get('isOnline');
        this.set('isOnline', !currentStatus);
    }
}