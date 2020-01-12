import { TspSolution } from "../tsp-solution.model";
import { TspNode } from "../tsp.data";

export class TspNearestNeighbour {

    static getSolutions(data: TspNode[]): TspSolution[] {
        let distances: { [id: number]: { id: number, distance: number }[] } = {};

        let nodes: { [id: number]: TspNode } = {};
        data.forEach(n => { nodes[n.id] = n });

        data.forEach(c1 => {
            let dist: { id: number, distance: number }[] = [];
            data.forEach(c2 => {
                if (c1.id != c2.id) {
                    dist.push({ id: c2.id, distance: this.getDistance(c1, c2) });
                }
            });
            distances[c1.id] = dist.sort((a, b) => a.distance - b.distance);
        });

        let solutions: TspSolution[] = [];
        data.forEach(first => {
            let used = new Set<number>();
            let solution = new TspSolution();

            let source = first.id;
            for (let i = 0; i < data.length-1; i++) {
                used.add(source);
                solution.path.push(nodes[source]);

                let target = distances[source].find((t) => !used.has(t.id));

                source = target.id;
            }
            solution.path.push(nodes[source]);
            solution.distance = this.getTotalDistance(solution.path);

            solutions.push(solution);
        });

        return solutions.sort((a, b) => a.distance - b.distance).reverse();
    }

    private static getTotalDistance(path: TspNode[]): number {
        if(path.length == 0) return 0;

        let prev = path[0];
        let total = 0;
        for (let i = 1; i < path.length; i++) {
            total += this.getDistance(prev, path[i]);
            prev = path[i];
        }
        total += this.getDistance(prev, path[0]);

        return total;
    }

    private static getDistance(a: TspNode, b: TspNode): number {
        return Math.hypot(b.x - a.x, b.y - a.y);
    }
}