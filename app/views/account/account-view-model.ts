import { Observable, Frame, alert } from '@nativescript/core';

export class AccountViewModel extends Observable {
    constructor() {
        super();
        
        this.set('driverName', 'David Wills');
        this.set('email', 'david.wills@example.com');
        this.set('profileImage', '~/images/profile-placeholder.png');
    }
    
    onEditProfile() {
        // Navigate to edit profile page
        console.log('Edit Profile tapped');
    }
    
    onSettings() {
        // Navigate to settings page
        console.log('Settings tapped');
    }
    
    onSupport() {
        // Navigate to support page
        console.log('Support tapped');
    }
    
    onLogout() {
        alert({
            title: "Logout",
            message: "Are you sure you want to logout?",
            okButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result) {
                // Handle logout
                console.log('Logging out...');
            }
        });
    }
}