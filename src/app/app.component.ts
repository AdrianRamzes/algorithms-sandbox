import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    loadedFeature: string = "";
    onNavigate(feature: string): void {
        this.loadedFeature = feature;
    }
}
