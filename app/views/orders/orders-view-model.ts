import { Observable, Frame, alert } from '@nativescript/core';
import { Order } from '../../models/order.model';

export class OrdersViewModel extends Observable {
    constructor() {
        super();
        
        this.set('activeOrdersCount', 2);
        this.set('orders', [
            {
                id: 'YYM150346646',
                restaurantName: 'Agnes Restaurant',
                status: 'cancelled',
                amount: 94.77,
                timestamp: '2024-01-14 11:04',
                canCancel: false,
                canTrack: false
            },
            {
                id: 'YYM1502188048',
                restaurantName: 'Agnes Restaurant',
                status: 'in-process',
                amount: 432.86,
                timestamp: '2024-01-14 15:57',
                canCancel: true,
                canTrack: true,
                customerInfo: {
                    name: 'John Smith',
                    address: '123 Main St',
                    phone: '+1234567890'
                }
            },
            {
                id: 'YYM149986521',
                restaurantName: 'Bella Pizza',
                status: 'preparing',
                amount: 331.78,
                timestamp: '2024-01-14 16:25',
                canCancel: true,
                canTrack: true,
                customerInfo: {
                    name: 'Jane Doe',
                    address: '456 Oak Ave',
                    phone: '+1234567891'
                }
            },
            {
                id: 'YYM149985427',
                restaurantName: 'Sushi Express',
                status: 'delivered',
                amount: 255.13,
                timestamp: '2024-01-14 16:36',
                canCancel: false,
                canTrack: false
            }
        ] as Order[]);
    }
    
    onCancelTap(args) {
        const order = args.object.bindingContext;
        alert({
            title: "Cancel Order",
            message: `Are you sure you want to cancel order #${order.id} from ${order.restaurantName}?`,
            okButtonText: "Yes, Cancel",
            cancelButtonText: "No"
        }).then((result) => {
            if (result) {
                // Update order status
                order.status = 'cancelled';
                order.canCancel = false;
                order.canTrack = false;
                this.notifyPropertyChange('orders', this.get('orders'));
                
                // Update active orders count
                const activeOrders = this.get('orders').filter(o => 
                    o.status === 'in-process' || o.status === 'preparing'
                );
                this.set('activeOrdersCount', activeOrders.length);
            }
        });
    }
    
    onTrackTap(args) {
        const order = args.object.bindingContext;
        Frame.topmost().navigate({
            moduleName: 'views/tracking/tracking-page',
            context: order,
            transition: {
                name: 'slide'
            }
        });
    }

    goBack() {
        Frame.topmost().goBack();
    }
}