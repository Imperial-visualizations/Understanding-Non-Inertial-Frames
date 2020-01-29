let wideness = $("#rotfrm").width(), heightness = 0.8*$(window).height();
let playing = true;
let omega;
let buttonIncrease;
let buttonDecrease;
let show = false;
let img;
const radius = wideness/3;
let vecShow = false;


earthframe = function (p) {
    p.preload = function() {
        img = p.loadImage("../assets/Earth_smaller.png");
    }

    p.setup = function() {
        let canvas = p.createCanvas(wideness,heightness, "webgl");
        canvas.parent(rotfrm);
    }

    p.draw = function() {
        /*omega = slider.value();*/
        omega = 0.5;
        let flatteningFactor = 1 - omega * omega;
        let a = Math.sqrt(radius * radius / flatteningFactor);
        p.background(3);
        p.camera(2*wideness/3,0,2*wideness/3,0,0,0,0,1,0)



        p.rotateY((2*omega)*p.millis()/1000);
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.texture(img);
        p.sphere(radius)
    }
}

labframe = function (p) {
    p.preload = function() {
        img = p.loadImage("Earth_smaller.png");
    }

    p.setup = function() {
        let canvas = p.createCanvas(wideness,heightness, "webgl");
        canvas.parent(rotrotfrm);
    }

    p.draw = function() {
        /*omega = slider.value();*/
        omega = 0.5;
        let flatteningFactor = 1 - omega * omega;
        let a = Math.sqrt(radius * radius / flatteningFactor);
        p.background(3);


        p.camera(Math.sqrt(2)*2*wideness/3*Math.sin((2*omega)*p.millis()/1000+Math.PI/3), 0, Math.sqrt(2)*2/3*wideness*Math.cos((2*omega)*p.millis()/1000+Math.PI/3), 0, 0, 0, 0, 1, 0);

        p.rotateY((2*omega)*p.millis()/1000);
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.texture(img);
        p.sphere(radius)
    }
}

const p5inst = new p5(labframe)
const p5inst2 = new p5(earthframe)