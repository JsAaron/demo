var renderer = PIXI.autoDetectRenderer();
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// stage.width  = 400
// stage.height = 300

// stage.position.x = 100;
// stage.position.y = 100;

var texture = PIXI.Texture.fromImage('_assets/basics/test.png');

var bunny = new PIXI.Sprite(texture);

bunny.width  = 400;
bunny.height = 300

// bunny["background-size"] = "100% 100%";

// bunny.anchor.x = 0.5;
// bunny.anchor.y = 0.5;


// bunny.width ='300%';

// move the sprite to the center of the screen
// bunny.position.x = 200;
// bunny.position.y = 150;


// stage.width  = 100
// stage.height = 100

stage.addChild(bunny);
// // kick off the animation loop (defined below)
animate();


function animate() {
    requestAnimationFrame(animate);
    // render the container
    renderer.render(stage);
}

