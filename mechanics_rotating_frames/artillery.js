//This file deals with the 2-d motion vis. It also calls the functions defined in this file and earthView.js, initialising the p5 windows.

let width = $("#art").width(), height = 0.7*$(window).height();
const m = 50;

// these arrays will log the positions of the particle for each frame.
let counter = 0,
    xpositions = [],
    ypositions = [],
    xpositionsnc = [],
    ypositionsnc = [];
let velx,
    vely,
    velz,
    corx,
    cory,
    s;

var i = width/2,
    j = height/2,
    inc = i,
    jnc = j;

//physics
function computeValues() {
    var v = parseFloat(document.getElementById('vController').value);
    var epsilon = parseFloat(document.getElementById('vHatController').value)*Math.PI;
    var theta = parseFloat(document.getElementById('thetaController').value)*Math.PI;

    vPrime = math.multiply([Math.cos(epsilon), Math.sin(epsilon), 0],-2*v);
    omegaPrime = [0, 2*Math.PI/8.6400*Math.cos(theta), 2*Math.PI/8.6400*Math.sin(theta)];

    FcorPrime = math.cross(vPrime,omegaPrime);
    FcorPlane = [FcorPrime[0],FcorPrime[1]];

    return [vPrime, FcorPlane, theta, epsilon, v];
}


$(document).ready(function () {
    [[velx,vely,velz], [corx,cory], theta, epsilon, v] = computeValues();
});

//Ensures that the values will be updated whenever there is a change in the sliders.
$(document).ready(function () {
    $("input[type=range]").each(function () {
        $(this).on("input", function () {
            [[velx,vely,velz], [corx,cory], theta, epsilon, v] = computeValues();
        });
    });
});

//p5
let artillery = function (p) {
    p.preload = function () {
        bacc = p.loadImage("ocean.png");
    }

    p.setup = function () {
        let art = p.createCanvas(width,height);
        art.parent("art")
    }

    let play = false;
    $(".play").on("click", () => {
        play = !play;
    });

    $(".reset").on("click", () =>{
        i = width/2;
        j = height/2;
        inc = i;
        jnc = j;
        counter = 0;
        xpositions = [];
        ypositions = [];
        xpositionsnc = [];
        ypositionsnc = [];
    })

    p.draw = function() {
        p.background(bacc);
        p.rectMode(p.rect.CENTER);
        for (var w=0;w<height;++w) {
            if (w%80 === 0) {
                //p.stroke(19, 109, 0)
                p.stroke(255, 223, 145)
                p.line(w-40,height,w-40,0)
                p.line(0,w-40,width,w-40)
            };
        };
        p.noStroke();
        p.fill(206, 0, 161);
        p.ellipse(i, j,8,8);

        if (play && ((i-width/2)**2+(j-height/2)**2)**0.5<(width*v/2)) {
            i -= (vely + counter*cory/(10*m));
            j -= (velx + counter*corx/(10*m));
            xpositions.push(i);
            ypositions.push(j);

            inc -= vely;
            jnc -= velx;
            xpositionsnc.push(inc);
            ypositionsnc.push(jnc);

            counter += 1;
        } else {
            play = false;
        }

        for (let t=1; t<xpositions.length; t++) {
            if (t%15 === 0) {
                p.stroke(255, 223, 145);
                p.line(xpositionsnc[t-6],ypositionsnc[t-6],xpositionsnc[t],ypositionsnc[t]);
                p.line(xpositionsnc[t-6]+1,ypositionsnc[t-6],xpositionsnc[t]+1,ypositionsnc[t]);
                p.stroke(255, 223, 145);
                p.line(xpositions[t-6],ypositions[t-6],xpositions[t],ypositions[t]);
                p.line(xpositions[t-6]+1,ypositions[t-6],xpositions[t]+1,ypositions[t]);

                p.line(xpositionsnc[t-6]+1,ypositionsnc[t-6],xpositionsnc[t]+1,ypositionsnc[t]);
            };
        };

        p.stroke(27, 173, 151);
        p.fill(80, 88, 37);
        //p.rotate(2);
        p.ellipse(width/2,height/2,24,24);


        s = 2*Math.PI*(xpositions.length*100)**2*Math.sin(theta)/(86400*v*100)

        p.fill(200,200,210);
        p.noStroke();
        p.textSize(16);
        p.textStyle(p.BOLD);

        p.text("Range:    "+(width*v/2*0.1).toFixed(2)+"km",1.8*width/3,3.5*height/4);
        p.text("Distance:  "+(Math.round(((i-width/2)**2+(j-height/2)**2)**0.5)*0.1).toFixed(2)+"km",1.8*width/3,3.7*height/4);
        p.text("Deflection: "+(Math.round(s)).toFixed(2)+"m",1.8*width/3,3.9*height/4);

    };
};

const p5inst = new p5(earthview)
const p5inst2 = new p5(artillery)