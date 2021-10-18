import { useState } from 'react';
import Image from '../Img/triangle.png';

const Main = () => {
    const [myAtt, setMyAtt] = useState({
        hypotenuse: null,
        adjacent: null,
        opposite: null,
        angleA: null,
        angleC: null,
        angleB: null,
        classificationS: null,
        classificationA: null,
        errorMessage: null,
        title: "Input",
        message: "Please enter three parameters of the triangle, at least one of which is a length of the side. Values must be positive and greater then 0."
    })
    const updateAtt = e => {
        setMyAtt({ ...myAtt, [e.target.name]: e.target.value });
    }
    if (myAtt.hypotenuse !== null || myAtt.angleB !== null || myAtt.angleC !== null || myAtt.angleA !== null || myAtt.opposite !== null || myAtt.adjacent !== null) {

        var a = myAtt.opposite
        var b = myAtt.hypotenuse
        var c = myAtt.adjacent
        var A = myAtt.angleA
        var B = myAtt.angleB
        var C = myAtt.angleC
        var sides = (a !== null) + (b !== null) + (c !== null);
        var angles = (A !== null) + (B !== null) + (C !== null);

        if (sides == 0) myAtt.message = "Give at least one side length";

        else if (sides == 3) {
            if (a + b <= c || b + c <= a || c + a <= b) {
                myAtt.message = "No solution";
                myAtt.title = "Error";
            }

            myAtt.angleA = solveAngle(b, c, a);
            myAtt.angleB = solveAngle(c, a, b);
            myAtt.angleC = solveAngle(a, b, c);
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        } else if (angles == 2) {
            if (A === null) A = 180 - B - C;
            if (B === null) B = 180 - C - A;
            if (C === null) C = 180 - A - B;
            if (A <= 0 || B <= 0 || C <= 0) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            var sinA = Math.sin(degToRad(A));
            var sinB = Math.sin(degToRad(B));
            var sinC = Math.sin(degToRad(C));

            var ratio;
            if (a !== null) { ratio = a / sinA }
            if (b !== null) { ratio = b / sinB }
            if (c !== null) { ratio = c / sinC }
            if (a === null) myAtt.opposite = ratio * sinA;
            if (b === null) myAtt.hypotenuse = ratio * sinB;
            if (c === null) myAtt.adjacent = ratio * sinC;
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        } else if (A !== null && a === null || B !== null && b === null || C !== null && c === null) {
            if (A !== null && A >= 180 || B !== null && B >= 180 || C !== null && C >= 180) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            if (a === null) myAtt.opposite = solveSide(b, c, A);
            if (b === null) myAtt.hypotenuse = solveSide(c, a, B);
            if (c === null) myAtt.adjacent = solveSide(a, b, C);
            if (A === null) myAtt.angleA = solveAngle(b, c, a);
            if (B === null) myAtt.angleB = solveAngle(c, a, b);
            if (C === null) myAtt.angleC = solveAngle(a, b, c);
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        } else {
            var knownSide, knownAngle, partialSide;
            if (a !== null && A !== null) { knownSide = a; knownAngle = A; }
            if (b !== null && B !== null) { knownSide = b; knownAngle = B; }
            if (c !== null && C !== null) { knownSide = c; knownAngle = C; }
            if (a !== null && A === null) partialSide = a;
            if (b !== null && B === null) partialSide = b;
            if (c !== null && C === null) partialSide = c;
            if (knownAngle >= 180) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            var ratio = knownSide / Math.sin(degToRad(knownAngle));
            var temp = partialSide / ratio;
            var partialAngle, unknownSide, unknownAngle;
            if (temp > 1 || knownAngle >= 90 && knownSide <= partialSide) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            else if (temp == 1 || knownSide >= partialSide) {
                partialAngle = radToDeg(Math.asin(temp));
                unknownAngle = 180 - knownAngle - partialAngle;
                unknownSide = ratio * Math.sin(degToRad(unknownAngle));
            } else {
                var partialAngle0 = radToDeg(Math.asin(temp));
                var partialAngle1 = 180 - partialAngle0;
                var unknownAngle0 = 180 - knownAngle - partialAngle0;
                var unknownAngle1 = 180 - knownAngle - partialAngle1;
                var unknownSide0 = ratio * Math.sin(degToRad(unknownAngle0));
                var unknownSide1 = ratio * Math.sin(degToRad(unknownAngle1));
                partialAngle = [partialAngle0, partialAngle1];
                unknownAngle = [unknownAngle0, unknownAngle1];
                unknownSide = [unknownSide0, unknownSide1];
            }
            if (a !== null && A === null) myAtt.angleA = partialAngle;
            if (b !== null && B === null) myAtt.angleB = partialAngle;
            if (c !== null && C === null) myAtt.angleC = partialAngle;
            if (a === null && A === null) { myAtt.opposite = unknownSide; myAtt.angleA = unknownAngle; }
            if (b === null && B === null) { myAtt.hypotenuse = unknownSide; myAtt.angleB = unknownAngle; }
            if (c === null && C === null) { myAtt.adjacent = unknownSide; myAtt.angleC = unknownAngle; }
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        }

        function classifyAngle(x, y, z) {
            if (x == y && x == z) return "Equilateral";
            else if (x == y) return "Isosceles";
            else if (y == z) return "Isosceles";
            else if (x == z) return "Isosceles";
            else return "Scalence";
        }

        function classifySide(x, y, z) {
            if (x == 90 || y == 90 || z == 90) return "Right Triangle";
            else if (x > 90 || y > 90 || z > 90) return "Obtuse Triangle";
            else return "Acute Triangle";
        }

        function degToRad(x) {
            return x / 180 * Math.PI;
        }

        function radToDeg(x) {
            return x / Math.PI * 180;
        }

        function solveSide(a, b, C) {
            C = degToRad(C);
            if (C > 0.001)
                return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
            else
                return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
        }

        function solveAngle(a, b, c) {
            var temp = (a * a + b * b - c * c) / (2 * a * b);
            if (-1 <= temp && temp <= 0.9999999)
                return radToDeg(Math.acos(temp));
            else if (temp <= 1) return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
            else {
                myAtt.title = "Error";
                myAtt.message = "No solution: Please enter three parameters of the triangle, at least one of which is a length of the side. Values must be positive and greater then 0.";
            }
        }
    }
    return (
        <div className="container">
            <div>
                <img className="col-md-6" src={Image} />
            </div>
            <div className="row">
                <div className="col-md-2">
                    <h3>Variable</h3>
                    <div><label htmlFor="opposite">Side <i>a</i> in millimetres:</label><input type="number" name="opposite" onChange={updateAtt} /></div>
                    <div><label htmlFor="hypotenuse">Side <i>b</i> in millimetres:</label><input type="number" name="hypotenuse" onChange={updateAtt} /></div>
                    <div><label htmlFor="adjacent">Side <i>c</i> in millimetres:</label><input type="number" name="adjacent" onChange={updateAtt} /></div>
                    <div><label htmlFor="angleA">Angle <i>A</i> in degrees:</label><input type="number" name="angleA" onChange={updateAtt} /></div>
                    <div><label htmlFor="angleB">Angle <i>B</i> in degrees:</label><input type="number" name="angleB" onChange={updateAtt} /></div>
                    <div><label htmlFor="angleC">Angle <i>C</i> in degrees:</label><input type="number" name="angleC" onChange={updateAtt} /></div>
                </div>
                <div className="col-md-4">
                    <h3>{myAtt.title}</h3>
                    <p>{myAtt.message}</p>
                </div>
            </div>
        </div>
    );
}

export default Main;