import { Observable } from '@nativescript/core';

export class MainViewModel extends Observable {
    constructor() {
        super();
        
        this.set('selectedTabIndex', 0);
        this.updateCurrentPage(0);
    }
    
    onTabTap(args) {
        const tab = parseInt(args.object.get('data-tab'), 10);
        this.set('selectedTabIndex', tab);
        this.updateCurrentPage(tab);
    }
    
    private updateCurrentPage(index: number) {
        const pages = [
            'views/delivery/delivery-page',
            'views/new-orders/new-orders-page',
            'views/orders/orders-page',
            'views/account/account-page'
        ];
        
        this.set('currentPage', pages[index]);
    }
}