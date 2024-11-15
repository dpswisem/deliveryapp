import { getCurrentLocation, isEnabled, enableLocationRequest, watchLocation, clearWatch } from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class LocationService {
    private watchId: number;

    async requestPermissions(): Promise<boolean> {
        try {
            const enabled = await isEnabled();
            if (!enabled) {
                return await enableLocationRequest();
            }
            return true;
        } catch (error) {
            console.error('Permission error:', error);
            return false;
        }
    }

    async getCurrentLocation(): Promise<CoreTypes.LocationPoint | null> {
        try {
            const location = await getCurrentLocation({
                desiredAccuracy: CoreTypes.Accuracy.high,
                maximumAge: 5000,
                timeout: 20000
            });
            return {
                latitude: location.latitude,
                longitude: location.longitude
            };
        } catch (error) {
            console.error('Get location error:', error);
            return null;
        }
    }

    startTracking(callback: (location: CoreTypes.LocationPoint) => void): void {
        if (!this.watchId) {
            this.watchId = watchLocation(
                (location) => {
                    callback({
                        latitude: location.latitude,
                        longitude: location.longitude
                    });
                },
                (error) => console.error('Location tracking error:', error),
                {
                    desiredAccuracy: CoreTypes.Accuracy.high,
                    updateDistance: 50,
                    minimumUpdateTime: 20000
                }
            );
        }
    }

    stopTracking(): void {
        if (this.watchId) {
            clearWatch(this.watchId);
            this.watchId = null;
        }
    }
}