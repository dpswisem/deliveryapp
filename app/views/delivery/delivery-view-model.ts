import { Observable, GestureStateTypes, PanGestureEventData } from '@nativescript/core';
import { LocationService } from '../../services/location.service';

export class DeliveryViewModel extends Observable {
    private locationService: LocationService;
    private panThreshold = 100;
    private isDragging = false;
    private startX = 0;

    constructor() {
        super();
        
        this.locationService = new LocationService();
        
        // Initialize with default values
        this.set('isOnline', false);
        this.set('currentLocation', {
            latitude: 38.8977,
            longitude: -77.0365
        });
    }

    onStatusPan(args: PanGestureEventData) {
        switch (args.state) {
            case GestureStateTypes.began:
                this.isDragging = true;
                this.startX = args.deltaX;
                break;

            case GestureStateTypes.changed:
                if (this.isDragging) {
                    const deltaX = args.deltaX - this.startX;
                    console.log('Dragging:', deltaX);
                }
                break;

            case GestureStateTypes.ended:
                if (this.isDragging) {
                    const deltaX = args.deltaX - this.startX;
                    console.log('Final delta:', deltaX);
                    
                    if (Math.abs(deltaX) >= this.panThreshold) {
                        const currentStatus = this.get('isOnline');
                        if ((!currentStatus && deltaX > 0) || (currentStatus && deltaX < 0)) {
                            this.toggleOnlineStatus();
                        }
                    }
                    
                    this.isDragging = false;
                }
                break;
        }
    }

    async toggleOnlineStatus() {
        const newStatus = !this.get('isOnline');
        
        if (newStatus) {
            try {
                const hasPermission = await this.locationService.requestPermissions();
                if (!hasPermission) {
                    console.log('Location permission denied');
                    return;
                }
                
                const location = await this.locationService.getCurrentLocation();
                if (location) {
                    this.set('currentLocation', location);
                    this.startLocationTracking();
                    this.set('isOnline', true);
                }
            } catch (error) {
                console.error('Error getting location:', error);
                return;
            }
        } else {
            this.stopLocationTracking();
            this.set('isOnline', false);
        }
    }

    private startLocationTracking() {
        this.locationService.startTracking((location) => {
            if (location) {
                this.set('currentLocation', location);
            }
        });
    }

    private stopLocationTracking() {
        this.locationService.stopTracking();
    }
}