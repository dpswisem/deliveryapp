export interface Order {
    id: string;
    restaurantName: string;
    status: 'preparing' | 'in-process' | 'cancelled' | 'delivered';
    amount: number;
    timestamp: string;
    customerInfo?: {
        name: string;
        address: string;
        phone: string;
    };
}