const textureLoader = new THREE.TextureLoader();
//通用窗户
const windowImg = textureLoader.load("./images/window.png");

//卧室一楼的大落地窗
const windowImg_bedroom = textureLoader.load("./images/window.png");
//阵列（如果不开启列阵，只渲染一小部分）
windowImg_bedroom.wrapS = THREE.RepeatWrapping;
windowImg_bedroom.wrapT = THREE.RepeatWrapping;
//uv两个方向的重复次数
windowImg_bedroom.repeat.set(2,1);

//栅栏
const railImg = textureLoader.load("./images/rail.png");

//绿化带
const greenbeltImg = textureLoader.load("./images/greenbelt.png");

//公路
const roadImg = textureLoader.load("./images/road.png");

//花园栅栏
const fenceImg_front = textureLoader.load('./images/fence.png');
const fenceImg_side = textureLoader.load('./images/fence.png');

//花叶
const flowerLeaf = textureLoader.load('./images/flowerLeaf.png');

app.loadingProgress = 60
