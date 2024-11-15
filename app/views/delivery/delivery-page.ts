import { NavigatedData, Page } from '@nativescript/core';
import { DeliveryViewModel } from './delivery-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new DeliveryViewModel();
}