import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppComponent, StatsChartComponent],
    imports: [BrowserModule,RouterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
