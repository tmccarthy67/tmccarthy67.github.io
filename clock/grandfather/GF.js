var height = 600; var width = 400;
var canvas = ctx = false;
var frameRate = 1/40;
var frameDelay = frameRate * 1000;
var loopTimer = false;
var lastTime = false;

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var pendulum = {mass: 100, length:500, theta: (Math.PI/2) - 0.05, omega: 0, alpha:0, J:0};
var setup = function() {
    pendulum.J = pendulum.mass * pendulum.length * pendulum.length / 500;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";

    // loopTimer = setInterval(loop, frameDelay);
    lastTime = new Date();
    requestAnimFrame(loop);
}
var loop = function(time) {
    var deltaT = (time - lastTime.getTime()) / 1000;

    /*
    When switching away from the window,
    requestAnimationFrame is paused. Switching back
    will give us a giant deltaT and cause an explosion.
    We make sure that the biggest possible deltaT is 50 ms
    */

    if (deltaT > 0.050)
    {
        deltaT = 0.050;
    }
    deltaT = 0.01;

    time = new Date();

    /* Velocity Verlet */
    /* Calculate current position from last frame's position, velocity, and acceleration */
    pendulum.theta += pendulum.omega * deltaT + ( 0.5 * pendulum.alpha * deltaT * deltaT );

    /* Calculate forces from current position. */
    var T = pendulum.mass * 9.81 * Math.cos(pendulum.theta) * pendulum.length;

    /* Current acceleration */
    var alpha = T / pendulum.J;

    /* Calculate current velocity from last frame's velocity and
        average of last frame's acceleration with this frame's acceleration. */
    pendulum.omega += 0.5 * (alpha + pendulum.alpha) * deltaT;

    /* Update acceleration */
    pendulum.alpha = alpha;

    var px = width/2 + pendulum.length*Math.cos(pendulum.theta);
    var py = 50 + pendulum.length*Math.sin(pendulum.theta);


    // Start drawing
    ctx.clearRect(0,0, width, height);
    // Draw bar for Pendulum
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(width/2, 50);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle ='gray';
    // Draw pendulum
    ctx.beginPath();
    ctx.arc(px, py, 30, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();

    // Draw clock face
    ctx.fillStyle = 'beige';
    ctx.beginPath();
    ctx.arc(width/2, 100, 80, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();

    // Draw hour hand

    var ang = (time.getHours() % 12) + (time.getMinutes()/60);
    ang *= 30 * Math.PI/180;
    ang -= Math.PI/2;
    ctx.fillStyle = '#666';
    ctx.beginPath();

    ctx.moveTo(width/2, 100);
    ctx.lineTo(
        width/2 + 40*Math.cos(ang+0.06),
        100 + 40*Math.sin(ang+0.06)
        );
    ctx.lineTo(
        width/2 + 50*Math.cos(ang-0.06),
        100 + 50*Math.sin(ang-0.06)
        );
    ctx.closePath();
    ctx.fill();

    // Draw minute hand
    var ang = time.getMinutes() + (time.getSeconds()/60);
    ang *= 6*Math.PI/180;
    ang -= Math.PI/2;
    ctx.fillStyle = '#999';
    ctx.beginPath();

    ctx.moveTo(width/2, 100);
    ctx.lineTo(
        width/2 + 60*Math.cos(ang+0.03),
        100 + 60*Math.sin(ang+0.03)
        );
    ctx.lineTo(
        width/2 + 70*Math.cos(ang-0.03),
        100 + 70*Math.sin(ang-0.03)
        );
    ctx.closePath();
    ctx.fill();

    // Draw second hand
    var ms = Math.round(time.getMilliseconds() / 250) / 4;
    var ang = time.getSeconds() + ms;
    ang *= 6*Math.PI/180;
    ang -= Math.PI/2;
    ctx.strokeStyle = '#CCC';
    ctx.beginPath();
    ctx.moveTo(width/2, 100);
    ctx.lineTo(
        width/2 + 70*Math.cos(ang),
        100 + 70*Math.sin(ang)
        );
    ctx.stroke();
    ctx.closePath();

    lastTime = new Date();
    requestAnimFrame(loop);

}

    setup();
