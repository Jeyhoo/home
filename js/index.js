// /**
//  * 别墅创建
//  */
// createVilla();
// /**
//  * 街道创建
//  */
// createStreet();   


//优化高量级任务
requestIdleCallback(idle=>{
    /**
     * 别墅创建
     */
    createVilla();
    /**
     * 街道创建
     */
    createStreet();    
})

scene.traverse(function (obj) {
    // console.log(obj)
    if (obj.type != 'AmbientLight'){
        // obj.receiveShadow = true;
        // obj.castShadow = true;
    }
})

/**
 * 点击交互
 */
// let raycaster = new THREE.Raycaster();//光线投射，用于确定鼠标点击的位置
// let mouse = new THREE.Vector2();
// document.getElementById("scene").addEventListener("mousedown",initClick)
// function initClick(e){
//     //将html坐标系转化为webgl坐标系，并确定鼠标点击位置
//     mouse.x = e.clientX / renderer.domElement.clientWidth*2 - 1;
//     mouse.y = -(e.clientY / renderer.domElement.clientHeight*2) + 1;
//     //以camera为z坐标系，确定物体的3D位置
//     raycaster.setFromCamera(mouse,camera);
//     //确定所点击位置上的物体数量
//     var intersects = raycaster.intersectObjects(scene.children,true);

//     //点击检测
//     if (intersects.length == 0){
//         console.log("鼠标未点击到物体，如确认有点击物品，请确认intersectObjects的第二个构造参数是否为true，在高版本threeJS中则不需要")
//     }else {
//         //执行物体身上绑定的函数函数
//         if (intersects[0].object.clickFun == undefined){
//             console.log("所点击的物体尚未绑定点击事件")
//         }else {
//             console.log("[点击-物品详情]",intersects[0])
//             eval(intersects[0].object.clickFun);
//         }
//     }


// }

app.loadingProgress = 110
