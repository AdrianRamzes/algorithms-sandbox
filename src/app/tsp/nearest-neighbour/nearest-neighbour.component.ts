import { Component, OnInit } from '@angular/core';

import { TspNearestNeighbour } from "./nearest-neighbour";
import { TspData, TspNode } from '../tsp.data';
import { TspSolution } from '../tsp-solution.model';

@Component({
    selector: 'app-nearest-neighbour',
    templateUrl: './nearest-neighbour.component.html'
})
export class NearestNeighbourComponent implements OnInit {

    running: boolean = false;

    private canvas: HTMLCanvasElement;
    private context: any;
    private normX: number;
    private normY: number;

    constructor() {
    }

    ngOnInit() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#FF0000";
        this.context.font = "30px Arial";
    }

    onStartSolutionsAnimationClick() {
        if (!this.running) {
            this.running = true;
            var solutions = TspNearestNeighbour.getSolutions(TspData.kroA100);
            this.startSolutionsAnimation(solutions, 100);
        }
    }

    onStartPathAnimationClick() {
        if (!this.running) {
            this.running = true;
            let solutions = TspNearestNeighbour.getSolutions(TspData.kroA100);
            let best = solutions[solutions.length-1];
            let normalizedSolution = this.getNormalizedData(best.path, 30);

            this.clearCanvas();
            this.drawDistance(best.distance);
            this.drawNodes(normalizedSolution, 5);

            this.startPathAnimation(normalizedSolution, 500, 1)
        }
    }

    private getNormalizedData(nodes: TspNode[], marigin: number): TspNode[] {
        let maxX: number = 0;
        let maxY: number = 0;

        nodes.forEach(n => {
            maxX = Math.max(maxX, n.x);
            maxY = Math.max(maxY, n.y);
        });

        this.normX = (this.canvas.width - (marigin * 2)) / (maxX || 1);
        this.normY = (this.canvas.height - (marigin * 2)) / (maxY || 1);

        return nodes.map((n) => {
            return { id: n.id, x: n.x * this.normX + marigin, y: n.y * this.normY + marigin } as TspNode;
        });
    }

    private startSolutionsAnimation(solutions: TspSolution[], delay: number): void {
        let i = 0;
        let interval = this.betterSetInterval(() => {
            if (i >= solutions.length) {
                clearInterval(interval);
                this.running = false;
                return;
            }

            let normalizedSolution = this.getNormalizedData(solutions[i].path, 30);
            this.clearCanvas();
            this.drawDistance(solutions[i].distance);
            this.drawPath(normalizedSolution);
            this.drawNodes(normalizedSolution, 5);
            i++;
        }, delay);
    }

    private startPathAnimation(path: TspNode[], delay: number, lineWidth: number = -1): void {
        let prevLineWidth = this.context.lineWidth;
        this.context.lineWidth = lineWidth || prevLineWidth;
        let i = 1;
        let interval = this.betterSetInterval(() => {
            if(i >= path.length) {
                this.context.beginPath();
                this.context.moveTo(path[i-1].x, path[i-1].y);
                this.context.lineTo(path[0].x, path[0].y);
                this.context.stroke();
                this.context.lineWidth = prevLineWidth;
                clearInterval(interval);
                this.running = false;
                return;
            }
            this.context.beginPath();
            this.context.moveTo(path[i-1].x, path[i-1].y);
            this.context.lineTo(path[i].x, path[i].y);
            this.context.stroke();
            i++;
        }, delay);
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawDistance(distance: number): void {
        distance = Math.ceil(distance);
        this.context.fillText("distance: " + distance, 10, 30);
    }

    private drawPath(path: TspNode[], lineWidth: number = -1): void {
        let prevLineWidth = this.context.lineWidth;
        this.context.lineWidth = lineWidth || prevLineWidth;
        this.context.beginPath();
        this.context.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            this.context.lineTo(path[i].x, path[i].y);
        }
        this.context.lineTo(path[0].x, path[0].y);
        this.context.stroke();
        this.context.lineWidth = prevLineWidth;
    }

    private drawNodes(nodes: TspNode[], size: number): void {
        nodes.forEach(n => {
            this.context.fillRect(n.x-(size/2), n.y-(size/2), size, size);
        });
        let color = this.context.fillStyle;
        this.context.fillStyle = "#00FF00";
        this.context.fillRect(nodes[0].x-size, nodes[0].y-size, size * 2, size * 2);
        this.context.fillStyle = color;
    }

    private betterSetInterval(fun, delay: number) {
        fun();
        return setInterval(fun, delay);
    }
}