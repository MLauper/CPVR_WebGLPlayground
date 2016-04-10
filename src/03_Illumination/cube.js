var camera, orbitControls, scene, renderer;

init();
animate();

function init() 
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, 
                                window.innerWidth / window.innerHeight,
                                0.1, 1000)  ;
    camera.position.x = -5;
    camera.position.y = 5;
    camera.position.z = 5;

    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x00000000 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
    orbitControls.autoRotate = false;
    orbitControls.enableZoom = true;

    //camera.lookAt(scene.position);
    var vertices = [];
    vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 0.0 ) ); // 0
    vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 0.0 ) ); // 1
    vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 0.0 ) ); // 2
    vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 0.0 ) ); // 3
    vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 1.0 ) ); // 4
    vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 1.0 ) ); // 5
    vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 1.0 ) ); // 6
    vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 1.0 ) ); // 7

    var faces=[];
    // bottom
    faces.push ( new THREE.Face3 ( 2, 1, 0 ) );
    faces.push ( new THREE.Face3 ( 3, 2, 0 ) );
    faces.push ( new THREE.Face3 ( 4, 5, 6 ) );
    faces.push ( new THREE.Face3 ( 4, 6, 7 ) );
    faces.push ( new THREE.Face3 ( 0, 4, 7 ) );
    faces.push ( new THREE.Face3 ( 0, 7, 3 ) );
    faces.push ( new THREE.Face3 ( 1, 2, 5 ) );
    faces.push ( new THREE.Face3 ( 6, 5, 2 ) );
    faces.push ( new THREE.Face3 ( 0, 1, 5 ) );
    faces.push ( new THREE.Face3 ( 3, 7, 6 ) );
    faces.push ( new THREE.Face3 ( 3, 6, 2 ) );
    faces.push ( new THREE.Face3 ( 0, 5, 4 ) );




    var pyramideGeometry = new THREE.Geometry();
    pyramideGeometry.vertices = vertices;
    pyramideGeometry.faces = faces;

    //var pyramideMaterial = new THREE.MeshBasicMaterial (
    //    {wireframe: false,
    //     color: 0x2539FF} );
    var pyramideMaterial = new THREE.MeshLambertMaterial (
        {color: 0x2539FF} );


    var pyramide = new THREE.Mesh( pyramideGeometry, pyramideMaterial );
    
    scene.add( pyramide );

    var axes = new THREE.AxisHelper( 1.5 );
    scene.add ( axes );


    //Ambient light
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    // directional light
    //var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    //directionalLight.position.set( 0, 1, 0 );
    //scene.add( directionalLight );

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1,1,1 ).normalize();
    scene.add( light );

    var light = new THREE.DirectionalLight( 0xffefef, 1.5 );
    light.position.set( -1, -1, -1 ).normalize();
    scene.add( light );

    var dir = new THREE.Vector3( 0.5, 0.5, 0.5 );
    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 3;
    var hex = 0xffff00;


    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

    object.position.x = 3;
    object.position.y = 3;
    object.position.z = 0;

    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;

    scene.add( object );



    directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight.position.set( 2, 1.2, 10 ).normalize();
    scene.add( directionalLight );
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( - 2, 1.2, -10 ).normalize();
    scene.add( directionalLight );

    // Arrow
    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    scene.add( arrowHelper );

    window.addEventListener( 'resize', onWindowResize, false );
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() 
{
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() 
{
    requestAnimationFrame( animate );

    // required if controls.enableDamping = true, 
    // or if controls.autoRotate = true
    orbitControls.update(); 
    //stats.update();
    render();
}
