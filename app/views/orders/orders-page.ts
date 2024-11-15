import { NavigatedData, Page } from '@nativescript/core';
import { OrdersViewModel } from './orders-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new OrdersViewModel();
}