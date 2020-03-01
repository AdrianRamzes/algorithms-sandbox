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

    private interval = null;
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
            this.PrintR(this.r);
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
            this.interval = null;
        }
    }

    private intervalX = null;
    onStartXClick(): void {
        

        let v = this.x;
        let r = 3.3;
        let step = 0.002

        this.running = true;
        this.intervalX = setInterval(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for(let x=0; x< this.canvas.width; x++) {
                this.context.fillRect(x, this.canvas.height*v, 1, 1);
                v = r*v*(1-v);
                x += 1;
            }
            r += step;
            this.PrintR(r);
        }, 100);
    }

    onStopXClick(): void {
        if(this.intervalX) {
            clearInterval(this.intervalX);
            this.intervalX = null;
            this.running = false;
        }
    }

    private getLimes(r: number, x: number, iterations: number): number {
        let v = x;
        for (let i = 0; i < iterations; i++) {
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
