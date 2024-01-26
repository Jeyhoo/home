/**
 * 场景
 */
const scene = new THREE.Scene();

/**
 * 雾化
 */
// scene.fog = new Fog(0xff00ff,0.01,100)

/**
 * 像机
 */
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000);
camera.position.set(180,80,130);
camera.lookAt(scene.position)

/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true,
});
renderer.setSize(window.innerWidth,window.innerHeight);
// renderer.setClearColor(new THREE.Color(0xeeeeee));
renderer.shadowMapEnabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * 三维坐标系
 */
// const axes = new THREE.AxisHelper(200);
// scene.add(axes);

/**
 * 场景添加到HTML中
 */
document.getElementById("scene").appendChild(renderer.domElement);

/**
 * 光源
 */
//环境光
const ambientLight = new THREE.AmbientLight(Ambient.nightColor.rgb,Ambient.intensity);
scene.add(ambientLight);
//平行光
const sun = new THREE.DirectionalLight(Sun.color,Sun.intensity);
sun.position.set(Sun.position.x,Sun.position.y,Sun.position.z);

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
// directionalLight.shadow.mapSize.width = 3000;
// directionalLight.shadow.mapSize.height = 3000;
sun.shadow.camera.left = -500;
sun.shadow.camera.right = 500;
sun.shadow.camera.near = -500;
sun.shadow.camera.far = 500;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;
sun.shadow.radius = 0.1;
sun.shadow.bias = 0.0001;

sun.castShadow = true;
scene.add(sun);

// const directionalLightHelper = new THREE.DirectionalLightHelper(sun);
// scene.add(directionalLightHelper);


/**
 * 轨道控制器
 */
const controls = new THREE.OrbitControls(camera,renderer.domElement);
//阻尼
controls.enableDamping = true;
// controls.addEventListener('change',()=>{
//     renderer.render(scene,camera);
// })
/**
 * 监听页面变化
 */
window.onresize = function () {
    //修改像机的长宽比
    camera.aspect = window.innerWidth/window.innerHeight;
    //更新镜头
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);

}


// 时钟
let clock = new THREE.Clock();


/**
 * 持续渲染
 * ==================================================================================================================================》》》》》》》》》
 */
//帧数设置
const FPS = 40;
const FPSInterval = 1000 / FPS
let lastTime = new Date().getTime();
function renderScene() {

    // requestIdleCallback(idle=>{
    //     console.log(idle.timeRemaining())
    //     if(idle.timeRemaining() > 0){
            let nowTime = new Date().getTime();
            if((nowTime - lastTime) >= FPSInterval){
                lastTime = nowTime;
                renderer.render(scene,camera);
                animate(clock.getElapsedTime(),clock.getDelta());
                requestAnimationFrame(renderScene);
            }else{
                requestAnimationFrame(renderScene);
            }
    //     }else{
    //         requestAnimationFrame(renderScene);
    //     }
    // })
    
}
//开启循环渲染
renderScene();


app.loadingProgress = 80;
