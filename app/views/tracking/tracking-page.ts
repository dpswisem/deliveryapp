import { NavigatedData, Page } from '@nativescript/core';
import { TrackingViewModel } from './tracking-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new TrackingViewModel(args.context);
    }
}