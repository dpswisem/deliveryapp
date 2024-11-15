import { Observable, Frame, alert } from '@nativescript/core';
import { Order } from '../../models/order.model';

export class NewOrdersViewModel extends Observable {
    constructor() {
        super();
        
        this.set('activeOrdersCount', 1);
        this.set('newOrders', [
            {
                id: 'YYM150346999',
                restaurantName: 'Agnes Restaurant',
                status: 'preparing',
                amount: 125.50,
                timestamp: '2024-01-14 15:30',
                distance: '2.3 km away',
                estimatedTime: 'Est. delivery 25-30 min',
                itemsSummary: '2x Chicken Burger, 1x Large Fries, 1x Coke',
                customerInfo: {
                    name: 'John Doe',
                    address: '123 Main St',
                    phone: '+1234567890'
                }
            },
            {
                id: 'YYM150347000',
                restaurantName: 'Bella Pizza',
                status: 'preparing',
                amount: 89.99,
                timestamp: '2024-01-14 15:28',
                distance: '1.8 km away',
                estimatedTime: 'Est. delivery 20-25 min',
                itemsSummary: '1x Large Pepperoni Pizza, 2x Garlic Bread',
                customerInfo: {
                    name: 'Jane Smith',
                    address: '456 Oak Ave',
                    phone: '+1234567891'
                }
            }
        ] as Order[]);
    }
    
    onAcceptTap(args) {
        const order = args.object.bindingContext;
        alert({
            title: "Accept Order",
            message: `Accept delivery for ${order.restaurantName}?\nDistance: ${order.distance}\nEstimated Time: ${order.estimatedTime}`,
            okButtonText: "Accept",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result) {
                // Handle order acceptance
                console.log('Order accepted:', order.id);
                // Remove from new orders list
                const orders = this.get('newOrders').filter(o => o.id !== order.id);
                this.set('newOrders', orders);
                // Increment active orders
                this.set('activeOrdersCount', this.get('activeOrdersCount') + 1);
            }
        });
    }
    
    onDeclineTap(args) {
        const order = args.object.bindingContext;
        alert({
            title: "Decline Order",
            message: `Are you sure you want to decline this order from ${order.restaurantName}?`,
            okButtonText: "Decline",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result) {
                // Handle order decline
                console.log('Order declined:', order.id);
                // Remove from new orders list
                const orders = this.get('newOrders').filter(o => o.id !== order.id);
                this.set('newOrders', orders);
            }
        });
    }
}