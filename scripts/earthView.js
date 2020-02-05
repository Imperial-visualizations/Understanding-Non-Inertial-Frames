//This file deals with the rotating Earth vis.

let wideness = $("#graph").width(), heightness = 0.7*$(window).height();
let playing = true;
let omega;
let buttonIncrease;
let buttonDecrease;
let show = false;
let img;
let dragging = true;
const radius = wideness/3;
let vecShow = false;
let derShow = false;
//$("input[type=range]").on('click', () => {dragging != dragging});
//$("input[type=range]").on('mouseup', () => {dragging = false});


let earthview = function(p) {
    p.preload = function() {
        img = p.loadImage("assets/Earth_smaller.png");
    }

    p.setup = function() {
        let canvas = p.createCanvas(wideness,heightness,"webgl");
        canvas.parent("earth");

        buttonFrame = p.createButton("Earth Frame");
        buttonPlaying = p.createButton('Play/Pause');
        buttonPlaying.parent("earth");
        buttonFrame.parent("earth");

        buttonFrame.mouseOver(function() {
            show = !show;
        })

        buttonFrame.mouseOut(function() {
            show = !show;
        })

        buttonPlaying.mousePressed(function() {
            if (playing) {
            p.noLoop()
            playing = false
        } else {
            p.loop()
            playing = true
        }
        });
    }

    p.draw = function() {
        /*omega = slider.value();*/
        omega = 0.5;
        let flatteningFactor = 1 - omega * omega;
        let a = Math.sqrt(radius * radius / flatteningFactor);
        p.background(3);
        p.camera(2*wideness/3,0,2*wideness/3,0,0,0,0,1,0)


        if (show) {
            p.camera(Math.sqrt(2)*2*wideness/3*Math.sin((3*omega)*p.millis()/1000+Math.PI/3), 0, Math.sqrt(2)*2/3*wideness*Math.cos((3*omega)*p.millis()/1000+Math.PI/3), 0, 0, 0, 0, 1, 0);
        } else {

        };
        p.rotateY((3*omega)*p.millis()/1000);
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)
        p.pointLight(250,250,250,0, 20)

        p.texture(img);
        p.sphere(radius)
    }
};

$(document).ready(function () {
    $("#graph").hide();
    $("#derivation").hide();

    $("#showVect").on('click', () => {
        vecShow = !vecShow;
        //document.getElementById("#showVect").value = (vecShow) ? "Hide Vectors" : "Show Vectors";
        if (vecShow) {
            $("#earth").hide();
            $("#graph").show();
        } else {
            $("#earth").show();
            $("#graph").hide();
        }
    });

    $("#showDer").on('click', () => {
        derShow = !derShow;
        //document.getElementById("showDer").value = (derShow) ? "Derivation/Explanation" : "Graphics/Sliders";
        if (derShow) {
            $("#graphics").hide();
            $("#derivation").show();
        } else {
            $("#graphics").show();
            $("#derivation").hide();
        }
    });
});