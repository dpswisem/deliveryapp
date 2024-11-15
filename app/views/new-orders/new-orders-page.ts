import { NavigatedData, Page } from '@nativescript/core';
import { NewOrdersViewModel } from './new-orders-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new NewOrdersViewModel();
    }
}