import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-logistic-map',
    templateUrl: './logistic-map.component.html'
})
export class LogisticMapComponent implements OnInit {

    running: boolean = false;

    private canvas: HTMLCanvasElement;
    private context: any;

    private r = -2;
    private x = 0.5;
    
    private maxX = 6;// scale form -2 -> 4
    private maxY = 2;// scale form -0.5 -> 1.5

    step = 0.001;

    constructor() { }

    ngOnInit() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#FF0000";
        this.context.font = "30px Arial";
    }

    private interval: any = -1;
    onStartClick(): void {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.r = -2;

        this.running = true;

        let count = 0;
        let xStep = (this.canvas.width)*this.step/this.maxX;
        this.interval = setInterval(() => {

            if(this.r >= 4) {
                this.onStopClick();
                return;
            }

            let lim = this.getLimes(this.r, this.x, 100+Math.random()*10);

            var normX = count*xStep;
            var normY = (this.canvas.height/this.maxY) * (lim + 0.5);
            this.context.fillRect(normX, normY, 1, 1);

            count++;
            this.r += this.step;
        }, 0);
    }

    onStopClick(): void {
        if(this.interval) {
            clearInterval(this.interval);
            this.running = false;
        }
    }

    private getLimes(r: number, x: number, iterations: number): number {
        let v = x;
        for (let i = 0; i < iterations; i++) {
            this.PrintR(r);
            v = r*v * (1-v);
        }
        return v;
    }

    private PrintR(r: number) {
        this.context.fillStyle = "#00FF00";
        this.context.fillRect(10, this.canvas.height-40, 400, 35);
        this.context.fillStyle = "#FF0000";
        this.context.fillText("r: " + r, 10, this.canvas.height-10);
    }
}
