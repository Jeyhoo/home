const COMMON = {
    //光线快速变化累加器
    sunAnimationAutoCount:0,

    //网格化开发
    wireframe : false,
    // wireframe : true,

    //透视-客厅
    perspective_livingRoom:THREE.DoubleSide,

    //初始化动画持续时间
    initDur:1.5,

    //阴影分辨率
    mapSizeWidth : 1024,
    mapSizeHeight : 1024,

    getColorRandom:function () {
        return 'rgb(' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ',' +parseInt(Math.random()*255) +')';
    }
};

//场景配置项
const Scene = {
    x:300,
    z:300,
}

//太阳配置项
const Sun = {
    position:{
        // x:-50,
        // y:20,
        // z:50,

        x:-Scene.x/2,
        minX:-Scene.x/2,
        maxX:Scene.x/2,
        y:10,
        minY:-10,
        maxY:100,
        z:Scene.z/2,
        minZ:Scene.z/2,
        maxZ:Scene.z/2,
    },
    intensity:0.5,
    color:'#fff',
}

//环境配置项
const Ambient = {
    nightColor:{
      rgb:'rgb(0,55,155)',
        r:0,
        g:55,
        b:155,
    },
    dayColor:{
      rgb:'rgb(255,255,255)',
        r:255,
        g:255,
        b:255,
    },

    // color:'#fff',
    intensity:0.3,
    //设定白天的区间范围
    // dayTimeInterval:[0.25,0.75],
    dayTimeInterval:[0.4,0.6],
}

//街灯配置项
const streetLampConfig = {
    bottom:{
        height:40,//底部长柱的高度
    },
    spotLight:{
        color:'#fff',
        intensity:0.7,
        distance:0,
        angle:Math.PI/5,
        penumbra:0.5,
        decay:1,
        position:{
            x:0,y:32,z:10
        },
    },
    pointLight:{
        color:'#fff',
        intensity:0.7,
        distance:0,
    },
    lightGUI:{
        mesh:new THREE.Mesh(new THREE.SphereGeometry(1),
            new THREE.MeshNormalMaterial({visible:false})),
    },

    target:{
        mesh:new THREE.Mesh(new THREE.SphereGeometry(1),
            new THREE.MeshBasicMaterial({color:'red',visible:false})),
        position:{
            x:0,
            y:0,
            z:10
        }
    },
}
const MeshNormalMaterial = new THREE.MeshNormalMaterial();
const MeshLambertMaterial = new THREE.MeshLambertMaterial({color:'#fff',side:THREE.DoubleSide,wireframe:COMMON.wireframe});

// 通用函数
function createMesh(geometry,material) {
    return new THREE.Mesh(geometry,material)
}

//图形化开发
// const GUI = new dat.GUI();

// //网格GUI控制器
// let wireframeGUI = GUI.addFolder("开启网格");
// wireframeGUI.add(COMMON,'wireframe').onChange(function (e) {
//     // console.log(scene.children)
//     scene.children.forEach(function (item) {
//         wireframeChange(item,e);
//     })
//     // scene.children.material.wireframe = e;
//     COMMON.wireframe = e;
// })
// function wireframeChange(item,e) {
//     if (item.type != "AmbientLight" && item.type != "DirectionalLight" && item.type != "camera" && item.type != "AxesHelper") {
//         // console.log(item,e);
//         if (item.type == "Group"){
//             item.children.forEach(function (item2) {
//                 wireframeChange(item2,e)
//             })
//         }else {
//             item.material.wireframe = e;
//         }
//     }
// }

// // 透视_客厅
// let livingGUI = GUI.addFolder("客厅");
// livingGUI.add(COMMON,"perspective_livingRoom",{"正常":THREE.DoubleSide,"透视":THREE.BackSide}).onChange(function (e) {
//     console.log(e,scene.getObjectByName("livingRoomWall").material.side);
//     if (e == '2'){
//         scene.getObjectByName("livingRoomWall").material.side = THREE.DoubleSide;
//     }else if (e == '1'){
//         scene.getObjectByName("livingRoomWall").material.side = THREE.BackSide;
//     }
//     // scene.getObjectByName("livingRoomWall").material.side = e;
// })

// //环境光
// let ambientGUI = GUI.addFolder('环境光');
// ambientGUI.addColor(Ambient.nightColor,'rgb').onChange(function (e) {
//     ambientLight.color = new THREE.Color(e);
// })
// ambientGUI.add(Ambient,'intensity',0,1,0.1).onChange(function (e) {
//     ambientLight.intensity = e;
// })

// //太阳变化
// let sunGUI = GUI.addFolder('太阳');
// sunGUI.add(Sun.position,'x',-Scene.x/2,Scene.x/2,1).onChange(function (e) {
//     sun.position.x = e;
// })
// sunGUI.add(Sun.position,'y',-10,100,1).onChange(function (e) {
//     sun.position.y = e;
// })
// sunGUI.add(Sun.position,'z',-Scene.x/2,Scene.x/2,1).onChange(function (e) {
//     sun.position.z = e;
// })
// sunGUI.add(Sun,'intensity',0,1,0.1).onChange(function (e) {
//     sun.intensity = e;
// })

// let testGUI = null;
// function getTestGUI(name,obj,geometry,type) {
//     if (testGUI == null){
//         testGUI = GUI.addFolder(name||'未命名的测试条目');
//     }
//     if (type == 'position'){
//         for (let key in obj){
//             testGUI.add(obj,""+key,-500,500).onChange(function (e) {
//                 geometry.position[""+key+""] = e;
//             })
//         }
//     }else if(type == 'rotation'){
//         for (let key in obj) {
//             testGUI.add(obj, "" + key, -Math.PI * 2, Math.PI * 2).onChange(function (e) {
//                 geometry.rotation["" + key + ""] = e;
//             })
//         }
//     }

// }

//聚光灯的变化（街灯）---暂时注释掉
// const light_asideConfig = {
//     x:0,
//     y:-7,
//     z:-40,
// }
// let streetLampGUI = GUI.addFolder('街灯');
// streetLampGUI.add(light_asideConfig,'x',-300,300).onChange(function (e) {
//     console.log(scene)
//     scene.getObjectByName('streetLight',true).position.x = e;
//     scene.getObjectByName('streetLightTest',true).position.x = e;
//     scene.getObjectByName('streetTarget',true).position.x = e;
// })
// streetLampGUI.add(light_asideConfig,'y',-300,300).onChange(function (e) {
//     console.log(scene)
//     scene.getObjectByName('streetLight',true).position.y = e;
//     scene.getObjectByName('streetLightTest',true).position.y = e;
// })
// streetLampGUI.add(light_asideConfig,'z',-300,300).onChange(function (e) {
//     console.log(scene)
//     scene.getObjectByName('streetLight',true).position.z = e;
//     scene.getObjectByName('streetLightTest',true).position.z = e;
//     scene.getObjectByName('streetTarget',true).position.z = e;
// })
// console.log(getTimePercent())


function _createPathSphere(path,sphereSize,color){
    let group = new THREE.Group();
    path.map(function (point) {
        var geo = new THREE.SphereGeometry(sphereSize||0.3);
        var mat = new THREE.MeshBasicMaterial({color:color||'#ff0000'})
        var sphere = new THREE.Mesh(geo,mat);
        sphere.position.copy(point);
        group.add(sphere)
    })
    scene.add(group)
}


app.loadingProgress = 50
