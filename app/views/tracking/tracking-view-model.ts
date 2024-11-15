import { Observable, Frame } from '@nativescript/core';
import { LocationService } from '../../services/location.service';
import { Order } from '../../models/order.model';

export class TrackingViewModel extends Observable {
    private locationService: LocationService;
    
    constructor(order: Order) {
        super();
        
        this.locationService = new LocationService();
        this.set('order', order);
        this.set('currentLocation', {
            latitude: 0,
            longitude: 0
        });
        
        // Initialize location after a short delay to ensure UI is ready
        setTimeout(() => {
            this.initializeLocation().catch(error => {
                console.error('Failed to initialize location:', error);
            });
        }, 1000);
    }
    
    async initializeLocation() {
        try {
            const hasPermission = await this.locationService.requestPermissions();
            if (hasPermission) {
                const location = await this.locationService.getCurrentLocation();
                if (location) {
                    this.set('currentLocation', location);
                }
                this.locationService.startTracking((location) => {
                    this.set('currentLocation', location);
                });
            }
        } catch (error) {
            console.error('Location initialization error:', error);
        }
    }
    
    startNavigation() {
        console.log('Starting navigation...');
    }
    
    goBack() {
        this.locationService.stopTracking();
        Frame.topmost().goBack();
    }
}