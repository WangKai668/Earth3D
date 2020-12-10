var renderer, camera, scene, light,controls,
    container = document.getElementById('container'),
    width = window.innerWidth,
    height = window.innerHeight;

                                      
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.setSize(width,height);          
    container.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45,  width / height, 1, 10000);
    camera.position.set(0, 0, 1000);
    camera.lookAt(0,0,0);   
}

function initScene() {
    scene = new THREE.Scene();
}

function initLight() {
    //在xz水平面放置三个聚光灯光源
    light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI/2, 1);
    light.position.set(3000, 0, 3000);
    light.target.position.set(0,0,0);
    light.castShadow = true;
    scene.add(light);

    light2 = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI/2, 1);
    light2.position.set(-3000, 0, 0);
    light2.target.position.set(0,0,0);
    light2.castShadow = true;
    scene.add(light2);

    light3 = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI/2, 1);
    light3.position.set(3000, 0, -3000);
    light3.target.position.set(0,0,0);
    light3.castShadow = true;
    scene.add(light3);

    //在地球上下各放一个聚光灯光源
    light4 = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI/2, 1);
    light4.position.set(0, 3000, 0);
    light4.target.position.set(0,0,0);
    light4.castShadow = true;
    scene.add(light4);

    light5 = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI/2, 1);
    light5.position.set(0, -3000, 0);
    light5.target.position.set(0,0,0);
    light5.castShadow = true;
    scene.add(light5);
}

function initEarth() {
    var earth = new THREE.SphereGeometry (200, 400, 400),
        material = new THREE.MeshPhongMaterial();
        mesh = new THREE.Mesh(earth, material);
                
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
                
    material.map = THREE.ImageUtils.loadTexture('./images/earth.jpg');
    material.bumpMap = THREE.ImageUtils.loadTexture('./images/earth_bump.jpg');//凹凸效果
    material.bumpScale = 35;
          
    mesh.castShadow = true;
    mesh.receiveShadow = true;
}

function initEarthClouds(){
    var cloud = new THREE.SphereGeometry (201, 400, 400),
        material = new THREE.MeshPhongMaterial({
                map: new THREE.ImageUtils.loadTexture('./images/cloud.png'),
                side: THREE.DoubleSide,
                opacity: 0.3,
                transparent:true,
            }),
        mesh = new THREE.Mesh(cloud, material);

    scene.add(mesh);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
}

function initMoon(){
    var moon = new THREE.SphereGeometry(50, 100, 100),
        material = new THREE.MeshPhongMaterial(),
        mesh = new THREE.Mesh(moon, material);

    mesh.position.set(220, 200, 240);
    
    material.map = THREE.ImageUtils.loadTexture('./images/moon.jpg');
    material.bumpMap = THREE.ImageUtils.loadTexture('./images/moon_bump.jpg');
    material.bumpScale = 1;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
}

function initBackGround(){
    var star = new THREE.SphereGeometry (3000, 10, 100),
        material = new THREE.MeshBasicMaterial(),
        mesh = new THREE.Mesh(star, material);

    material.map = THREE.ImageUtils.loadTexture('./images/star.png');
    material.side = THREE.BackSide;

    scene.add(mesh);
}

function initControls(){
    controls = new THREE.OrbitControls( camera, renderer.domElement);
    controls.addEventListener( 'change', render);
}

function threeStart() {
    initRender();
    initCamera();
    initScene();
    initLight();

    initEarth();
    initEarthClouds();
    initMoon();
    initBackGround();

    initControls();

    animation();
}

function animation(){
    controls.update();
    render();
    requestAnimationFrame(animation);
}

function render(){
    renderer.render(scene, camera);
}

threeStart();