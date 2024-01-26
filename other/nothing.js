//底墙(多种实现方案，均废弃了)
function livingRoom_wallBottom() {
    // 管道体
    // const geometry = new THREE.TorusGeometry(30,3,6,4,6);
    // const material = new THREE.MeshLambertMaterial({
    //     color:'#c4b393',
    //     wireframe:COMMON.wireframe,
    // })
    // const livingRoom_wallBottom = new THREE.Mesh(geometry,material);
    // livingRoom_wallBottom.position.set(0,10,0)
    // return livingRoom_wallBottom





    // 自定义管道高级几何体
    // let points = [
    //     new THREE.Vector3(-60,5,10),
    //     new THREE.Vector3(-60,5,9),
    //     new THREE.Vector3(-60,8,9),
    //     new THREE.Vector3(-60,8,10),
    // ];
    // //为了方便在场景中看到这些点，可以在这些点的每一个位置创建一个球体
    // points.forEach(function(point){
    //     let sphere = new THREE.SphereGeometry(0.3);
    //     let mat = new THREE.MeshBasicMaterial({color:0xff0000})
    //     let convexSphere = new THREE.Mesh(sphere,mat);
    //     convexSphere.position.copy(point);
    //     scene.add(convexSphere)
    // })
    // //创建三维路径
    // let path = new THREE.CatmullRomCurve3(points);
    // //创建虚线
    // let lineGeo = new THREE.BufferGeometry();
    // //设置坐标
    // lineGeo.setFromPoints(path.getPoints(100));
    // let lineMat = new THREE.LineBasicMaterial({color:'#ff0000'});
    // let line = new THREE.Line(lineGeo,lineMat);
    // scene.add(line)





    // 扫描网格模型
    // let shape = new THREE.Shape();
    // shape.moveTo(-60,5,10);
    // shape.lineTo(-60,5,9);
    // shape.lineTo(-60,8,9);
    // shape.lineTo(-60,8,10);
    // shape.lineTo(-60,5,10);
    // //创建扫描轨迹
    // let curve = new THREE.SplineCurve3([
    //     new THREE.Vector3( -10, -50, -50 ),
    //     new THREE.Vector3( 10, 0, 0 ),
    //     new THREE.Vector3( 8, 50, 50 ),
    //     new THREE.Vector3( -5, 0, 100)
    // ]);
    // var geo = new THREE.ExtrudeGeometry(shape,{
    //     // amount:120,//拉伸长度
    //     bevelEnabled:false,//无倒角
    //     extrudePath:curve,//扫描路径
    // })
    // var material = new THREE.PointsMaterial({
    //     color:"#0000ff",
    //     size:0.3,
    // })
    // var mesh = new THREE.Points(geo,material);
    // scene.add(mesh);





    //凸面几何体
    // let points = [
    //     new THREE.Vector3(-60,VillaData.floorHeight,10),
    //     new THREE.Vector3(-60,VillaData.floorHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(-60,VillaData.floorHeight+VillaData.wallBottomHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(-60,VillaData.floorHeight+VillaData.wallBottomHeight,10),
    //
    //     new THREE.Vector3(0,VillaData.floorHeight,10),
    //     new THREE.Vector3(0,VillaData.floorHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0,VillaData.floorHeight+VillaData.wallBottomHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0,VillaData.floorHeight+VillaData.wallBottomHeight,10),
    //
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight,10),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight+VillaData.wallBottomHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight+VillaData.wallBottomHeight,10),
    //
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight,10),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight+VillaData.wallBottomHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight+VillaData.wallBottomHeight,10),
    //
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight,40),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight+VillaData.wallBottomHeight,10-VillaData.wallBottomThickness),
    //     new THREE.Vector3(0+VillaData.wallBottomThickness,VillaData.floorHeight+VillaData.wallBottomHeight,10),
    // ];
    // //为了方便在场景中看到这些点，可以在这些点的每一个位置创建一个球体
    // points.forEach(function(point){
    //     let sphere = new THREE.SphereGeometry(0.3);
    //     let mat = new THREE.MeshBasicMaterial({color:0xff0000})
    //     let convexSphere = new THREE.Mesh(sphere,mat);
    //     convexSphere.position.copy(point);
    //     villa.add(convexSphere)
    // })
    // //创建凸面几何体
    // const convexGeometry = new THREE.ConvexGeometry(points);
    // const convexMaterial = new THREE.MeshBasicMaterial({color:'#00ff00',wireframe:COMMON.wireframe});
    // let convex = new THREE.Mesh(convexGeometry,convexMaterial);
    // return convex






    // const material = new THREE.MeshNormalMaterial({'color':'#ff0000'})
    // function addCube() {
    //     var geometry = new THREE.BoxGeometry(0.2,0.2,0.2)
    //     var mesh = new THREE.Mesh(geometry, material)
    //     mesh.position.x = Math.random()*4-2
    //     mesh.position.y = Math.random()*4-2
    //     mesh.position.z = Math.random()*4+2
    //     return mesh
    // }
    // const geos = [];
    // for (let i=0; i<20; i++) {
    //     const obj = addCube()
    //     obj.updateMatrix() // 更新投影矩阵，不更新各mesh位置会不正确
    //     // 更新后的矩阵，重新转换为几何体，此时，几何体位置才正确
    //     const newGeometry = obj.geometry.applyMatrix4(obj.matrix)
    //     geos.push(newGeometry)
    // }
    // const bufferGeometry =  new THREE.BufferGeometryUtils.mergeBufferGeometries(geos)
    // scene.add(new THREE.Mesh(bufferGeometry, material));






    // const geometry = new THREE.CylinderGeometry(30,30,Wall.height,4,1,true,Math.PI*0.25);
    // const material = new THREE.MeshLambertMaterial({color:'#c3b292',wireframe:COMMON.wireframe,side:THREE.DoubleSide});
    // const wall = new THREE.Mesh(geometry,material);
    // wall.name = "livingRoomWall"
    // wall.position.set(-30,Floor.height + Wall.height/2,0);




    // const geometry1 = new THREE.PlaneGeometry(60,Wall.height);
    // const geometry2 = new THREE.PlaneGeometry(60,Wall.height);
    // const geometry3 = new THREE.PlaneGeometry(40,Wall.height);
    // const geometry4 = new THREE.PlaneGeometry(40,Wall.height);
    // const material = new THREE.MeshLambertMaterial({color:'#c3b292',wireframe:COMMON.wireframe,side:COMMON.perspective_livingRoom});
    //
    // // 前后左右
    // const wall1 = new THREE.Mesh(geometry1,material);wall1.position.set(-30,Floor.height + Wall.height/2,10);
    // const wall2 = new THREE.Mesh(geometry2,material);wall2.position.set(-30,Floor.height + Wall.height/2,-30);
    // const wall3 = new THREE.Mesh(geometry3,material);wall3.position.set(-60,Floor.height + Wall.height/2,-10);wall3.rotation.set(0,Math.PI*0.5,0);
    // const wall4 = new THREE.Mesh(geometry4,material);wall4.position.set(0,Floor.height + Wall.height/2,-10);wall4.rotation.set(0,Math.PI*0.5,0);
    //
    //  // scene.add(wall1);
    //  // scene.add(wall2);
    //  // scene.add(wall3);
    //  // scene.add(wall4);
    //
    //  //合并几何体
    //  const wall = new THREE.BufferGeometryUtils.mergeBufferGeometries([wall1,wall2,wall3,wall4]);
    //  scene.add((new THREE.Mesh(wall,material)));



    //先准备好所有几何体，外墙，内墙
    // const geometry = new THREE.CylinderGeometry(Math.sqrt(1800),Math.sqrt(1800),Wall.height,4,1,true,Math.PI*0.25);
    const geometry = new THREE.BoxGeometry(60,Wall.height,40);
    const geometryInside = new THREE.BoxGeometry(60-(Wall.thickness*2),Wall.height-Wall.thickness,40-Wall.thickness*2);
    const material = new THREE.MeshLambertMaterial({color:'#c3b292',wireframe:COMMON.wireframe,side:THREE.DoubleSide});
    let wall = new THREE.Mesh(geometry,material);
    let wallInside = new THREE.Mesh(geometryInside,material);
    const wallPosition = {
        x:0,
        y:Floor.height/2 + Wall.height/2,
        z:-10,
    }
    const wallScale = {
        x:1,
        y:1,
        z:40/60
    }
    wall.position.set(wallPosition.x,wallPosition.y,wallPosition.z);
    // wall.scale.set(wallScale.x,wallScale.y,wallScale.z);
    wall.material = new THREE.MeshNormalMaterial();

    wallInside.position.set(wallPosition.x,wallPosition.y-Wall.thickness/2,wallPosition.z);
    // wall.scale.set(wallScale.x,wallScale.y,wallScale.z);
    wallInside.material = new THREE.MeshNormalMaterial();
    // scene.add(wall);
    // scene.add(wallInside);

    // //创建门
    const door = this.door;
    door.position.set(0,Floor.height/2 + 7.5,10-(Door.thickness/2));
    door.material = new THREE.MeshNormalMaterial();
    // door.scale.set(0,0,2);
    // scene.add(door);

    // //取差集，外墙减去内墙，再减去门
    let wallBSP = new ThreeBSP(wall);
    let wallInsideBSP = new ThreeBSP(wallInside);
    // scene.add(wallBSP.toMesh())
    let doorBSP = new ThreeBSP(door);
    // scene.add(doorBSP.toMesh())
    let wallAndDoorBSP = wallBSP.subtract(wallInsideBSP).subtract(doorBSP);
    wall = wallAndDoorBSP.toMesh();
    wall.name = "livingRoomWall";
    // wall.material = material;
    //更新位置
    wall.geometry.computeFaceNormals();
    wall.geometry.computeVertexNormals();
    // wall.scale.set(wallScale.x,wallScale.y,wallScale.z);



    // return wall

}
