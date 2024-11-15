import { Application } from '@nativescript/core';
import { Fontawesome } from './fonts';

// Initialize fonts synchronously
Fontawesome.loadFonts();

Application.run({ moduleName: 'app-root' });