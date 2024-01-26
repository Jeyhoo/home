/**
 * 别墅基本框架
 */
const villa = new THREE.Group();

//墙
const Wall = {
    y:20,
    thickness:1,
}
const WallBottom ={
    y:2,
    color:'#e8e6e1',
    overThickness:0.2,
    overThicknessInWindow:1,
}
const RoofBottom ={
    color:'#fff'
}
//地板
const Floor = {
    y:4,
}
const Floor2 = {
    y:1,
    color:'#f1e6d5'
}
//门
const Door = {
    thickness:1,
}

// PS:门都是经过旋转处理的，因此x一般表示门的宽度，而并非在三维中的x轴长度

function createVilla(){
    //街道
    // villa.add(street.init());
    //各个房间
    villa.add(livingRoom1st.init());
    villa.add(livingRoom2nd.init());
    villa.add(bedroom1st.init());
    villa.add(bedroom2nd.init());
    villa.add(kitchen1st.init());
    villa.add(kitchen2nd.init());
    villa.add(garage1st.init());
    villa.add(garage2nd.init());
    //屋顶
    villa.add(roof.init());

    //位置修改及渲染
    villa.position.set(0,0,0);
    scene.add(villa);
}



/**
 * 客厅
 */
let livingRoom1st = (function () {
    return {
        data:{
            //客厅的长宽属性
            x:60,
            z:40,
            position:{
                x:-30,
                y:Floor.y/2,
                z:0,
            },
            //墙体
            Wall: {
                position:{
                    x:0,
                    y:Floor.y/2 + Wall.y/2,
                    z:-10,
                },
            },
            Door:{
                position:{
                  x:15,
                },
                width: 10,
            },
            Window:{
                width:20,
                //窗户位置
                position:{
                    x:-10,
                }
            }
        },
        init:function () {
            const livingRoom = new THREE.Group();
            livingRoom.add(this.floor());
            livingRoom.add(this.door());
            livingRoom.add(this.window());
            livingRoom.add(this.wall());
            livingRoom.add(this.wallBottom());


            livingRoom.position.set(this.data.position.x,this.data.position.y,this.data.position.z);
            // scene.add(livingRoom);
            return livingRoom
        },
        floor:function () {
            const geometry = new THREE.BoxGeometry(this.data.x,Floor.y,this.data.x);
            // const geometry = new THREE.BoxGeometry(50,Floor.y,50);
            const material = new THREE.MeshLambertMaterial({
                color:'#d9c8ad',
                wireframe:COMMON.wireframe,
            });
            const floor = new THREE.Mesh(geometry,material);
            floor.receiveShadow = true;
            floor.position.set(0,0,0);
            return floor
        },
        wallBottom:function(){
            //基本结构
            let material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            let wallBottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x+WallBottom.overThickness,WallBottom.y,this.data.z+WallBottom.overThickness)),
                MeshNormalMaterial);
            const WallBottomInsde = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-WallBottom.overThickness,WallBottom.y,this.data.z-WallBottom.overThickness)),
                MeshNormalMaterial);
            // scene.add(wallBottom)

            // //创建门
            const door = this.door.clone();
            door.position.set(15,0,this.data.z/2);
            door.material = new THREE.MeshNormalMaterial();
            door.scale.set(1,1,2)

            //创建窗户-背影
            const window = this.windowForWall.clone();
            window.scale.set(1,1,2)
            window.position.set(this.data.Window.position.x,0,this.data.z/2);

            //创建窗户
            const window2 = this.windowForWallBottomToAdd.clone();
            window2.position.set(this.data.Window.position.x,0,this.data.z/2)
            // scene.add(window2);
            //创建窗户-内部
            const window2Inside = this.windowInsideForWallBottomToAdd.clone();
            window2Inside.position.set(this.data.Window.position.x,0,this.data.z/2)
            // scene.add(window2Inside);

            //布尔运算
            const wallBottomBSP = new ThreeBSP(wallBottom);
            const WallBottomInsdeBSP = new ThreeBSP(WallBottomInsde);
            const windowBSP = new ThreeBSP(window);
            const window2BSP = new ThreeBSP(window2);
            const window2InsideBSP = new ThreeBSP(window2Inside);
            let doorBSP = new ThreeBSP(door);
            wallBottom = wallBottomBSP.subtract(WallBottomInsdeBSP).subtract(doorBSP).subtract(windowBSP).union(window2BSP.subtract(window2InsideBSP));
            wallBottom = wallBottom.toMesh();
            wallBottom.material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            wallBottom.position.set(0,WallBottom.y/2+Floor.y/2,-(this.data.x-this.data.z)/2);
            wallBottom.castShadow = true;
            return wallBottom

        },
        wall:function () {
            //先准备好所有几何体，外墙，内墙
            // const geometry = new THREE.CylinderGeometry(Math.sqrt(1800),Math.sqrt(1800),Wall.height,4,1,true,Math.PI*0.25);
            const geometry = new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z);
            const geometryInside = new THREE.BoxGeometry(this.data.x-(Wall.thickness*2),Wall.y-Wall.thickness,this.data.z-Wall.thickness*2);
            const material = new THREE.MeshLambertMaterial({color:'#c3b292',wireframe:COMMON.wireframe,side:THREE.DoubleSide});
            let wall = new THREE.Mesh(geometry,material);
            let wallInside = new THREE.Mesh(geometryInside,material);
            wall.position.set(this.data.Wall.position.x,this.data.Wall.position.y,this.data.Wall.position.z);
            wall.material = new THREE.MeshNormalMaterial();

            wallInside.position.set(this.data.Wall.position.x,this.data.Wall.position.y-Wall.thickness/2,this.data.Wall.position.z);
            wallInside.material = new THREE.MeshNormalMaterial();
            // scene.add(wall);
            // scene.add(wallInside);

            // //创建门
            const door = this.door.clone();
            door.position.set(15,Floor.y/2 + Wall.y/2,10-(Door.thickness/2));
            door.material = new THREE.MeshNormalMaterial();
            // scene.add(door)

            //创建窗户
            const window = this.windowForWall.clone();
            // scene.add(window);
            window.position.set(this.data.Window.position.x,Floor.y/2 + (Wall.y/2),10-(Door.thickness/2));

            // //取差集，外墙减去内墙，再减去门
            let wallBSP = new ThreeBSP(wall);
            let wallInsideBSP = new ThreeBSP(wallInside);
            let windowBSP = new ThreeBSP(window);
            // scene.add(wallBSP.toMesh())
            let doorBSP = new ThreeBSP(door);
            // scene.add(doorBSP.toMesh())
            let wallAndDoorBSP = wallBSP.subtract(wallInsideBSP).subtract(doorBSP).subtract(windowBSP);
            wall = wallAndDoorBSP.toMesh();
            wall.name = "livingRoomWall";
            wall.material = material;
            //更新位置
            wall.geometry.computeFaceNormals();
            wall.geometry.computeVertexNormals();
            // wall.scale.set(wallScale.x,wallScale.y,wallScale.z);
            wall.castShadow = true;

            return wall
        },
        door:function () {
            var doorGroup = new THREE.Group();
            doorGroup.position.set(this.data.Door.position.x,Floor.y/2 + Wall.y/2,10 -Wall.thickness/2);

            //门
            const geometry = new THREE.BoxGeometry(10,Wall.y,Wall.thickness);
            const material = new THREE.MeshLambertMaterial({color:'red',wireframe:COMMON.wireframe,side:THREE.DoubleSide,map:windowImg,transparent:true});
            const door = new THREE.Mesh(geometry,material);
            door.name="livingRoomDoor";
            door.clickFun="livingRoom1st.doorOpenClose()";
            door.isOpen = false;
            this.door = door;

            doorGroup.add(door);
            return doorGroup;
        },
        //主体窗户
        window:function(){
            //创建用于墙体减法布尔运算的窗户
            let windowForWall = new THREE.Mesh((new THREE.BoxGeometry(this.data.Window.width,Wall.y,Wall.thickness)),
                new THREE.MeshNormalMaterial());
            this.windowForWall = windowForWall;
            //创建用于底墙加法
            let windowForWallBottomToAdd = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2,this.data.Window.width/2,WallBottom.y,3,1,false,Math.PI*1.5,Math.PI*1)),
            // let windowForWallBottomToAdd = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2,this.data.Window.width/2,WallBottom.y*2,10,1,false,Math.PI*1.5,Math.PI*1)),
                MeshNormalMaterial);
            let windowInsideForWallBottomToAdd = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2-WallBottom.overThickness,this.data.Window.width/2-WallBottom.overThickness,WallBottom.y,3,1,false,Math.PI*1.5,Math.PI*1)),
                // let windowForWallBottomToAdd = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2,this.data.Window.width/2,WallBottom.y*2,10,1,false,Math.PI*1.5,Math.PI*1)),
                MeshNormalMaterial);
            this.windowForWallBottomToAdd = windowForWallBottomToAdd;
            this.windowInsideForWallBottomToAdd = windowInsideForWallBottomToAdd;
            //创建窗户组
            let group = new THREE.Group();
            //创建窗户基本模型
            let window = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2,this.data.Window.width/2,Wall.y,3,1,false,Math.PI*1.5,Math.PI*1)),
                // new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,depthTest:true,transparent:true}));
                [
                    new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,depthTest:true,transparent:true}),
                    new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,transparent:true,opacity:0}),
                    new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,transparent:true,opacity:0}),
                ]
                );
            group.position.set(this.data.Window.position.x,Floor.y/2+Wall.y/2,this.data.Window.width/2-Wall.thickness);
            //添加到组
            group.add(window);
            console.log(this.data.Window.width/2,this.data.Window.width/2,Wall.y,6);
            return group
        },
        doorOpenClose:function () {
            console.log("客厅门开关");
            if (this.isOpen){
                this.door.rotation.set(0,0,0);
            } else{
                this.door.rotation.set(0,Math.PI*0.5,0);
            }
            this.isOpen = !this.isOpen;

        },
    }
})()
let livingRoom2nd = (function () {
    return {
        data:{
            //客厅的长宽属性
            x:60,
            z:40,
            position:{
                x:-30,
                y:Wall.y + Floor.y/2,
                z:0,
            },
            Wall: {
                position:{
                    x:0,
                    y:Floor.y/2 + Wall.y/2,
                    z:-10,
                },
            },
            Door:{
                position:{
                    x:15,
                },
                width: 10,
            },
            //主体大窗户
            Window:{
                width:20,
                //窗户位置
                position:{
                    x:-10,
                }
            }
        },
        init:function () {
            const livingRoom = new THREE.Group();
            // livingRoom.add(this.floor());

            livingRoom.add(this.window());
            livingRoom.add(this.window2());
            livingRoom.add(this.wall());

            livingRoom.position.set(this.data.position.x,this.data.position.y,this.data.position.z);
            // scene.add(livingRoom);
            return livingRoom
        },
        decorate:function(){
        },
        wall:function () {
            //先准备好所有几何体，外墙，内墙
            // const geometry = new THREE.CylinderGeometry(Math.sqrt(1800),Math.sqrt(1800),Wall.height,4,1,true,Math.PI*0.25);
            const geometry = new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z);
            const geometryInside = new THREE.BoxGeometry(this.data.x-(Wall.thickness*2),Wall.y-Wall.thickness,this.data.z-Wall.thickness*2);
            const material = new THREE.MeshLambertMaterial({color:'#c3b292',wireframe:COMMON.wireframe,side:THREE.DoubleSide});
            let wall = new THREE.Mesh(geometry,material);
            let wallInside = new THREE.Mesh(geometryInside,material);
            wall.position.set(this.data.Wall.position.x,this.data.Wall.position.y,this.data.Wall.position.z);
            wall.material = new THREE.MeshNormalMaterial();

            wallInside.position.set(this.data.Wall.position.x,this.data.Wall.position.y-Wall.thickness/2,this.data.Wall.position.z);
            wallInside.material = new THREE.MeshNormalMaterial();
            // scene.add(wall);
            // scene.add(wallInside);

            //创建窗户
            const window = this.windowForWall.clone();
            // scene.add(window);
            window.position.set(this.data.Window.position.x,(Wall.y/2),10-(Door.thickness/2));

            //创建窗户
            const window2 = this.windowForWall2.clone();
            window2.position.set(this.data.Door.position.x,Floor.y/2 + Wall.y/2,10-(Door.thickness/2));
            // scene.add(window2);


            // //取差集，外墙减去内墙，再减去门
            let wallBSP = new ThreeBSP(wall);
            let wallInsideBSP = new ThreeBSP(wallInside);
            let windowBSP = new ThreeBSP(window);
            let window2BSP = new ThreeBSP(window2);
            // scene.add(wallBSP.toMesh())
            // scene.add(doorBSP.toMesh())
            let wallAndDoorBSP = wallBSP.subtract(wallInsideBSP).subtract(windowBSP).subtract(window2BSP);
            wall = wallAndDoorBSP.toMesh();
            wall.name = "livingRoomWall";
            wall.material = material;
            //更新位置
            wall.geometry.computeFaceNormals();
            wall.geometry.computeVertexNormals();
            // wall.scale.set(wallScale.x,wallScale.y,wallScale.z);
            wall.castShadow = true;

            return wall
        },
        //主体窗户
        window:function(){
            //创建窗户组
            let group = new THREE.Group();

            //创建用于墙体减法布尔运算的窗户
            let windowForWall = new THREE.Mesh((new THREE.BoxGeometry(this.data.Window.width,Wall.y,Wall.thickness)),
                new THREE.MeshNormalMaterial());
            this.windowForWall = windowForWall;

            //创建窗户基本模型
            let window = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2,this.data.Window.width/2,Wall.y,3,1,false,Math.PI*1.5,Math.PI*1)),
                [
                    new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,depthTest:true,transparent:true}),
                    new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,transparent:true,opacity:0}),
                    new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,transparent:true,opacity:0}),
                ]);
                // new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,depthTest:true,transparent:true}));


            // 装饰
            const windowButtom_floor = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2+WallBottom.overThicknessInWindow,this.data.Window.width/2+WallBottom.overThicknessInWindow,WallBottom.y/2,3,1,false,Math.PI*1.5,Math.PI*1)),
                MeshNormalMaterial);
            const windowButtom = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2+WallBottom.overThickness,this.data.Window.width/2+WallBottom.overThickness,WallBottom.y,3,1,false,Math.PI*1.5,Math.PI*1)),
                MeshNormalMaterial);
            const windowInsideButtom = new THREE.Mesh( (new THREE.CylinderGeometry(this.data.Window.width/2-WallBottom.overThickness,this.data.Window.width/2-WallBottom.overThickness,WallBottom.y,3,1,false,Math.PI*1.5,Math.PI*1)),
                MeshNormalMaterial);
            const windowButtom_floorBSP = new ThreeBSP(windowButtom_floor);
            const windowButtomBSP = new ThreeBSP(windowButtom);
            const windowInsideButtomBSP = new ThreeBSP(windowInsideButtom);
            let decorate = windowButtom_floorBSP.union(windowButtomBSP).subtract(windowInsideButtomBSP);
            decorate = decorate.toMesh();
            decorate.material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            decorate.position.set(0,-Wall.y/2,0);

            //添加到组
            group.add(window);
            group.add(decorate);
            group.position.set(this.data.Window.position.x,Floor.y/2+Wall.y/2,this.data.Window.width/2-Wall.thickness);

            return group
        },
        //门上边的窗户
        window2:function(){
            //创建窗户组
            let group = new THREE.Group();

            //创建窗户基本类型，并提供给墙体用于布尔运算
            let windowForWall2 = new THREE.Mesh((new THREE.BoxGeometry(this.data.Door.width,Wall.y,Door.thickness)),
                new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,transparent:true}));
            this.windowForWall2 = windowForWall2;

            // 装饰
            let windowBottom = new THREE.Mesh((new THREE.BoxGeometry(this.data.Door.width,WallBottom.y,WallBottom.overThickness)),
                new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe}));
                // MeshNormalMaterial);
            windowBottom.position.set(0,-Wall.y/2,Wall.thickness/2)

            group.position.set(this.data.Door.position.x,Floor.y/2 + Wall.y/2,this.data.Window.width/2 -Wall.thickness/2);
            //添加到组
            group.add(windowForWall2);
            group.add(windowBottom);
            return group
        },
    }
})()

/**
 * 卧室
 */
let bedroom1st = (function () {
    return{
        data:{
            x:40,
            z:60,
            position:{
                x:20,
                y:Floor.y/2,
                z:0
            },
            Wall:{
                position:{
                    x:0,
                    y:Floor.y/2 + Wall.y/2,
                    z:0
                },
            },
            Window:{
                x:15,
            },
            Window2:{
                x:15,
                position:{
                    z:15,
                }
            },
            Door:{
                x:10,
                position:{
                    z:-15,
                },
                decorate:{
                    color:'#f1e6d5',
                    far:20,
                    moreWidth:3,
                    between:{
                        z:3,
                        x:4,
                        y:5,
                    }
                },
                steps:{
                    color:'red'
                }
            },
            //主窗户上的装饰
            decorate:{
                color:'#f1e6d5',
                between:{
                    x:4,
                    y:5,
                    z:1,
                }
            },
            grass:{
                outSideColor:'#aaae98',
                color:'#0da857'
            }

        },
        init:function () {
            const bedroom = new THREE.Group();
            bedroom.position.set(this.data.position.x,this.data.position.y,this.data.position.z);
            bedroom.add(this.floor());
            bedroom.add(this.window());
            bedroom.add(this.window2());
            bedroom.add(this.door());
            bedroom.add(this.wall());
            bedroom.add(this.wallBottom());
            bedroom.add(this.grass());

            return bedroom
        },
        floor:function () {
            const geometry = new THREE.BoxGeometry(this.data.x,Floor.y,this.data.z);
            geometry.receiveShadow = true;
            const material = new THREE.MeshLambertMaterial({
                color:'#bbad97',
                wireframe:COMMON.wireframe,
            })
            const floor = new THREE.Mesh(geometry,material);
            // bedroom_floor.position.set(0,0,0);
            // scene.add(plane_frontLeft);
            return floor
        },
        wallBottom:function(){
            //基本结构
            let material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            let wallBottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x+WallBottom.overThickness,Floor.y+WallBottom.y,this.data.z+WallBottom.overThickness)),
                MeshNormalMaterial);
            const WallBottomInsde = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-WallBottom.overThickness,Floor.y+WallBottom.y,this.data.z-WallBottom.overThickness)),
                MeshNormalMaterial);
            // scene.add(wallBottom)

            // //创建门
            const door = this.door.clone();
            door.position.set(this.data.x/2-Wall.thickness/2,0,this.data.Door.position.z);
            door.material = new THREE.MeshNormalMaterial();
            door.scale.set(1,1,2)
            // scene.add(door)

            //布尔运算
            const wallBottomBSP = new ThreeBSP(wallBottom);
            const WallBottomInsdeBSP = new ThreeBSP(WallBottomInsde);
            const doorBSP = new ThreeBSP(door);
            wallBottom = wallBottomBSP.subtract(WallBottomInsdeBSP).subtract(doorBSP);
            wallBottom = wallBottom.toMesh();
            wallBottom.material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            wallBottom.position.set(0,+WallBottom.y/2,0)
            return wallBottom
        },
        wall:function () {
            let wallMaterial = new THREE.MeshLambertMaterial({color:'#87634e',wireframe:COMMON.wireframe});

            let wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z)),
                MeshNormalMaterial);
            const wallInside = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-Wall.thickness*2,Wall.y-Wall.thickness,this.data.z-Wall.thickness)),
                MeshNormalMaterial);
            wallInside.position.set(0,-Wall.thickness/2,0);
            // scene.add(wall)

            //最大的窗户
            const window = this.windowForWall.clone();
            window.material = MeshNormalMaterial;
            window.position.set(0,0,this.data.z/2-Wall.thickness/2);
            // scene.add(window);

            //最大窗户右侧的窗户
            const window2 = this.window2ForWall.clone();
            window2.material = MeshNormalMaterial;
            window2.position.set(this.data.x/2+Wall.thickness/2-Wall.thickness,0,this.data.Window2.position.z);
            // scene.add(window2);

            //门
            const door = this.door.clone();
            door.material = MeshNormalMaterial;
            door.position.set(this.data.x/2-Wall.thickness/2,0,this.data.Door.position.z);
            // scene.add(door);

            //布尔运算掏空房间
            const WallBSP = new ThreeBSP(wall);
            const WallInsideBSP = new ThreeBSP(wallInside);
            const doorBSP = new ThreeBSP(door);
            const windowBSP = new ThreeBSP(window);
            const window2BSP = new ThreeBSP(window2);
            wall = WallBSP.subtract(WallInsideBSP).subtract(doorBSP).subtract(windowBSP).subtract(window2BSP);
            wall = wall.toMesh();
            wall.material = wallMaterial;
            wall.position.set(this.data.Wall.position.x,this.data.Wall.position.y,this.data.Wall.position.z);
            wall.castShadow = true
            return wall
        },
        window:function () {
            var group = new THREE.Group();
            const window = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Window.x,Wall.y)),
                new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg_bedroom,transparent:true}));
            window.position.set(0,Floor.y/2+Wall.y/2,this.data.z/2-Wall.thickness/2);
            this.windowForWall = window;

            //装饰
            let decorate_left = new THREE.Group();
            const decorate_left_top = new THREE.Mesh( (new THREE.BoxGeometry(this.data.decorate.between.x,this.data.decorate.between.y,this.data.decorate.between.z)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            const decorate_left_middle = new THREE.Mesh( (new THREE.BoxGeometry(this.data.decorate.between.x*0.8,Wall.y+Floor.y-this.data.decorate.between.y*2,this.data.decorate.between.z*0.8)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            const decorate_left_bottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.decorate.between.x,this.data.decorate.between.y,this.data.decorate.between.z)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            decorate_left_top.position.set(-this.data.Window.x/2-this.data.decorate.between.x/2,Wall.y-Math.abs(Floor.y-this.data.decorate.between.y)/2,this.data.z/2+this.data.decorate.between.z/2);
            decorate_left_middle.position.set(-this.data.Window.x/2-this.data.decorate.between.x/2,Wall.y/2,this.data.z/2+this.data.decorate.between.z/2);
            decorate_left_bottom.position.set(-this.data.Window.x/2-this.data.decorate.between.x/2,Math.abs(Floor.y-this.data.decorate.between.y)/2,this.data.z/2+this.data.decorate.between.z/2);
            decorate_left.add(decorate_left_top);
            decorate_left.add(decorate_left_bottom);
            decorate_left.add(decorate_left_middle);

            let decorate_right = new THREE.Group();
            const decorate_right_top = new THREE.Mesh( (new THREE.BoxGeometry(this.data.decorate.between.x,this.data.decorate.between.y,this.data.decorate.between.z)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            const decorate_right_middle = new THREE.Mesh( (new THREE.BoxGeometry(this.data.decorate.between.x*0.8,Wall.y+Floor.y-this.data.decorate.between.y*2,this.data.decorate.between.z*0.8)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            const decorate_right_bottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.decorate.between.x,this.data.decorate.between.y,this.data.decorate.between.z)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            decorate_right_top.position.set(-this.data.Window.x/2-this.data.decorate.between.x/2,Wall.y-Math.abs(Floor.y-this.data.decorate.between.y)/2,this.data.z/2+this.data.decorate.between.z/2);
            decorate_right_middle.position.set(-this.data.Window.x/2-this.data.decorate.between.x/2,Wall.y/2,this.data.z/2+this.data.decorate.between.z/2);
            decorate_right_bottom.position.set(-this.data.Window.x/2-this.data.decorate.between.x/2,Math.abs(Floor.y-this.data.decorate.between.y)/2,this.data.z/2+this.data.decorate.between.z/2);
            decorate_right.add(decorate_right_top);
            decorate_right.add(decorate_right_middle);
            decorate_right.add(decorate_right_bottom);
            decorate_right.position.set(this.data.Window.x+this.data.decorate.between.x,0,0);

            let decorate_bottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Window.x*0.8,Floor.y*0.8,this.data.decorate.between.z*0.8)),
                new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe}));
            decorate_bottom.position.set(0,-Math.abs(Floor.y-Floor.y*0.8)/2,this.data.z/2+(this.data.decorate.between.z*0.8)/2)

            //添加到组
            group.add(window);
            group.add(decorate_left);
            group.add(decorate_right);
            group.add(decorate_bottom);
            return group
        },
        window2:function () {
            const window = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Window2.x,Wall.y)),
                new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,transparent:true}));
            window.position.set(this.data.x/2-Wall.thickness/2,Floor.y/2+Wall.y/2,this.data.Window2.position.z);
            window.rotation.set(0,Math.PI*0.5,0);
            this.window2ForWall = window;
            return window
        },
        grass:function(){
            const group = new THREE.Group();

            let left_grass_1 = new THREE.Mesh( (new THREE.BoxGeometry(garage1st.data.x-this.data.x,
                Floor.y/2,
                this.data.z-this.data.Door.x - this.data.Door.decorate.moreWidth*2 - this.data.Door.decorate.between.z*3
                    )),
                new THREE.MeshLambertMaterial({color:this.data.grass.outSideColor,wireframe:COMMON.wireframe}));
            left_grass_1.position.set(this.data.x/2 + (garage1st.data.x-this.data.x)/2 + WallBottom.overThickness,
                -Floor.y/4,
               14);
            const left_grass_1Inside = new THREE.Mesh( (new THREE.BoxGeometry((garage1st.data.x-this.data.x)-0.5,
                (Floor.y/2)*2,
                (this.data.z-this.data.Door.x - this.data.Door.decorate.moreWidth*2 - this.data.Door.decorate.between.z*3)-0.5
                )),
                new THREE.MeshLambertMaterial({color:this.data.grass.outSideColor,wireframe:COMMON.wireframe}));
            left_grass_1Inside.position.set(this.data.x/2 + (garage1st.data.x-this.data.x)/2 + WallBottom.overThickness,
                -Floor.y/4,
                14);
            const left_grass_1Green = new THREE.Mesh( (new THREE.BoxGeometry((garage1st.data.x-this.data.x)-0.5,
                (Floor.y/2)*0.8,
                (this.data.z-this.data.Door.x - this.data.Door.decorate.moreWidth*2 - this.data.Door.decorate.between.z*3)-0.5
                )),
                new THREE.MeshLambertMaterial({color:this.data.grass.color,wireframe:COMMON.wireframe}));
            left_grass_1Green.position.set(this.data.x/2 + (garage1st.data.x-this.data.x)/2 + WallBottom.overThickness,
                -Floor.y/4-((Floor.y/2)*0.8)/4,
                14);

            let left_grass_2 = new THREE.Mesh( (new THREE.BoxGeometry(20,
                Floor.y/2,
                garage1st.data.x-this.data.x
                )),
                new THREE.MeshLambertMaterial({color:this.data.grass.outSideColor,wireframe:COMMON.wireframe}));
            left_grass_2.position.set(35,
                -Floor.y/4,
                1.5);
            const left_grass_2Inside = new THREE.Mesh( (new THREE.BoxGeometry(20-0.5,
                (Floor.y/2)*2,
                garage1st.data.x-this.data.x-0.5
                )),
                new THREE.MeshLambertMaterial({color:this.data.grass.outSideColor,wireframe:COMMON.wireframe}));
            left_grass_2Inside.position.set(35,
                -Floor.y/4,
                1.5);
            const left_grass_2Green = new THREE.Mesh( (new THREE.BoxGeometry(20-0.5,
                (Floor.y/2)*0.8,
                garage1st.data.x-this.data.x-0.5
                )),
                new THREE.MeshLambertMaterial({color:this.data.grass.color,wireframe:COMMON.wireframe}));
            left_grass_2Green.position.set(35,
                -Floor.y/4-((Floor.y/2)*0.8)/4,
                1.5);
            // scene.add(left_grass_1);
            // scene.add(left_grass_1Inside);
            // scene.add(left_grass_1Green);
            const left_grass_1BSP = new ThreeBSP(left_grass_1);
            const left_grass_1InsideBSP = new ThreeBSP(left_grass_1Inside);
            const left_grass_1greenBSP = new ThreeBSP(left_grass_1Green);

            const left_grass_2BSP = new ThreeBSP(left_grass_2);
            const left_grass_2InsideBSP = new ThreeBSP(left_grass_2Inside);
            const left_grass_2greenBSP = new ThreeBSP(left_grass_2Green);

            let left_grass_outside = (left_grass_1BSP.union(left_grass_2BSP)).subtract(left_grass_1InsideBSP.union(left_grass_2InsideBSP));
            let left_grass_green = left_grass_1greenBSP.union(left_grass_2greenBSP);
            left_grass_outside = left_grass_outside.toMesh();
            left_grass_green = left_grass_green.toMesh();

            left_grass_outside.material =  new THREE.MeshLambertMaterial({color:this.data.grass.outSideColor,wireframe:COMMON.wireframe});
            left_grass_green.material =  new THREE.MeshLambertMaterial({color:this.data.grass.color,wireframe:COMMON.wireframe});

            group.add(left_grass_outside)
            group.add(left_grass_green)
            // group.add(left_grass_1)
            // group.add(left_grass_2)
            return group;
        },
        door:function () {
            let group = new THREE.Group();
            const door = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.x,Wall.y,Wall.thickness)),
                new THREE.MeshLambertMaterial({color:'red',wireframe:COMMON.wireframe}));
            door.rotation.set(0,Math.PI*0.5,0);
            door.position.set(this.data.x/2-Wall.thickness/2,Wall.y/2+Floor.y/2,this.data.Door.position.z);
            door.name='bedroomDoor';
            door.clickFun='bedroom1st.doorOpenClose()';
            door.isOpen = false;
            this.door = door;

            // 装饰--小围墙
            let wallMaterial = new THREE.MeshLambertMaterial({color:this.data.Door.decorate.color,wireframe:COMMON.wireframe});
            let floorMaterial = new THREE.MeshLambertMaterial({color:this.data.decorate.color,wireframe:COMMON.wireframe});
            let decorate = new THREE.Group();
            const left_wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.far,this.data.Door.decorate.between.y*0.8,this.data.Door.decorate.between.z*0.8,)),
                wallMaterial);
            const right_wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.far,this.data.Door.decorate.between.y*0.8,this.data.Door.decorate.between.z*0.8,)),
                wallMaterial);
            left_wall.position.set(this.data.x/2+this.data.Door.decorate.far/2,-Math.abs(this.data.Door.decorate.between.y*0.8-Floor.y)/2,this.data.Door.position.z+this.data.Door.x/2+this.data.Door.decorate.between.z/2+this.data.Door.decorate.moreWidth);
            right_wall.position.set(this.data.x/2+this.data.Door.decorate.far/2,-Math.abs(this.data.Door.decorate.between.y*0.8-Floor.y)/2,this.data.Door.position.z-this.data.Door.x/2-this.data.Door.decorate.between.z/2-this.data.Door.decorate.moreWidth);
            const left_bottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.between.x,this.data.Door.decorate.between.y,this.data.Door.decorate.between.z,)),
                wallMaterial);
            left_bottom.position.set(this.data.x/2+this.data.Door.decorate.far,Math.abs(this.data.Door.decorate.between.y-Floor.y)/2,this.data.Door.position.z+this.data.Door.x/2+this.data.Door.decorate.between.z/2+this.data.Door.decorate.moreWidth);
            const left_top = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.between.x,this.data.Door.decorate.between.y,this.data.Door.decorate.between.z,)),
                wallMaterial);
            left_top.position.set(this.data.x/2+this.data.Door.decorate.far,Math.abs(this.data.Door.decorate.between.y-Floor.y)/2+Wall.y,this.data.Door.position.z+this.data.Door.x/2+this.data.Door.decorate.between.z/2+this.data.Door.decorate.moreWidth);
            const right_bottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.between.x,this.data.Door.decorate.between.y,this.data.Door.decorate.between.z,)),
                wallMaterial);
            right_bottom.position.set(this.data.x/2+this.data.Door.decorate.far,Math.abs(this.data.Door.decorate.between.y-Floor.y)/2,this.data.Door.position.z-this.data.Door.x/2-this.data.Door.decorate.between.z/2-this.data.Door.decorate.moreWidth);
            const right_top = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.between.x,this.data.Door.decorate.between.y,this.data.Door.decorate.between.z,)),
                wallMaterial);
            right_top.position.set(this.data.x/2+this.data.Door.decorate.far,Math.abs(this.data.Door.decorate.between.y-Floor.y)/2+Wall.y,this.data.Door.position.z-this.data.Door.x/2-this.data.Door.decorate.between.z/2-this.data.Door.decorate.moreWidth);
            const left_middle = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.between.x*0.8,Wall.y+Floor.y,this.data.Door.decorate.between.z*0.8,)),
                wallMaterial);
            left_middle.position.set(this.data.x/2+this.data.Door.decorate.far,Math.abs(this.data.Door.decorate.between.y-Floor.y)/2+Wall.y/2,this.data.Door.position.z+this.data.Door.x/2+this.data.Door.decorate.between.z/2+this.data.Door.decorate.moreWidth);
            const right_middle = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.between.x*0.8,Wall.y+Floor.y,this.data.Door.decorate.between.z*0.8,)),
                wallMaterial);
            right_middle.position.set(this.data.x/2+this.data.Door.decorate.far,Math.abs(this.data.Door.decorate.between.y-Floor.y)/2+Wall.y/2,this.data.Door.position.z-this.data.Door.x/2-this.data.Door.decorate.between.z/2-this.data.Door.decorate.moreWidth);
            decorate.add(left_wall);
            decorate.add(right_wall);
            decorate.add(left_bottom);
            decorate.add(left_top);
            decorate.add(right_bottom);
            decorate.add(right_top);
            decorate.add(left_middle);
            decorate.add(right_middle);
            //装饰--台阶
            const steps1 = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.far/3,(this.data.Door.decorate.between.y*0.6),this.data.Door.x+this.data.Door.decorate.moreWidth*2+1)),
                floorMaterial);
            steps1.position.set(this.data.x/2+this.data.Door.decorate.far/6,-Math.abs(this.data.Door.decorate.between.y*0.6-Floor.y)/2,this.data.Door.position.z);
            const steps2 = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.far/3,(this.data.Door.decorate.between.y*0.4),this.data.Door.x+this.data.Door.decorate.moreWidth*2+1)),
                floorMaterial);
            steps2.position.set(this.data.x/2+this.data.Door.decorate.far/6+this.data.Door.decorate.far/3,-Math.abs(this.data.Door.decorate.between.y*0.4-Floor.y)/2,this.data.Door.position.z);
            const steps3 = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.decorate.far/3,(this.data.Door.decorate.between.y*0.2),this.data.Door.x+this.data.Door.decorate.moreWidth*2+1)),
                floorMaterial);
            steps3.position.set(this.data.x/2+this.data.Door.decorate.far/6+(this.data.Door.decorate.far/3)*2,-Math.abs(this.data.Door.decorate.between.y*0.2-Floor.y)/2,this.data.Door.position.z);
            decorate.add(steps1);
            decorate.add(steps2);
            decorate.add(steps3);

            //给组所有几何体开启阴影
            for (var i = 0 ; i < decorate.children.length ; i ++){
                decorate.children[i].castShadow = true;
                decorate.children[i].receiveShadow = true;
            }

            //添加到组
            group.add(door);
            group.add(decorate);
            return group
        },
        doorOpenClose(){
            console.log("卧室-门开关");
            if (this.door.isOpen){
                this.door.rotation.set(0,Math.PI*0.5,0);
            }else{
                this.door.rotation.set(0,Math.PI*1,0);
            }
            this.door.isOpen = !this.door.isOpen;
        },
    }
})()
let bedroom2nd = (function () {
    return{
        data:{
            x:40,
            z:45,
            position:{
                x:20,
                y:Floor.y/2 + Wall.y,
                z:-7.5
            },
            floor:{
                overThickness:2,
                position:{
                    x:0,
                    y:Floor.y/2+Floor2.y/2,
                    z:7.5
                }
            },
            Wall:{
                position:{
                    x:0,
                    y:Floor.y/2 + Wall.y/2+Floor2.y,
                    z:0
                },
            },
            Window:{
                x:30,
            },
            Window2:{
                x:15,
                position:{
                    z:15,
                }
            },
            Door:{
                x:10,
                position:{
                    z:-20,
                }
            },
            //护栏
            rail:{
                d:3,
                y:6+Floor2.y,
                thickness:0.1,
            }
        },
        init:function () {
            const bedroom = new THREE.Group();
            bedroom.add(this.floor());
            bedroom.add(this.door());
            bedroom.add(this.door2());
            bedroom.add(this.wall());
            bedroom.add(this.rail());
            bedroom.position.set(this.data.position.x,this.data.position.y,this.data.position.z);

            return bedroom
        },
        floor:function(){
            const floor = new THREE.Mesh( (new THREE.BoxGeometry(bedroom1st.data.x+this.data.floor.overThickness*2,Floor2.y,bedroom1st.data.z+this.data.floor.overThickness*2)),
                new THREE.MeshLambertMaterial({color:Floor2.color,wireframe:COMMON.wireframe}));
                // MeshNormalMaterial);
            floor.position.set(this.data.floor.position.x,this.data.floor.position.y,this.data.floor.position.z);
            floor.receiveShadow = true;
            return floor
        },
        wall:function () {
            let wallMaterial = new THREE.MeshLambertMaterial({color:'#87634e',wireframe:COMMON.wireframe});

            let wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z)),
                MeshNormalMaterial);
            const wallInside = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-Wall.thickness*2,Wall.y-Wall.thickness,this.data.z-Wall.thickness)),
                MeshNormalMaterial);
            wallInside.position.set(0,-Wall.thickness/2,0);
            // scene.add(wall)

            //左门
            const door = this.door.clone();
            door.material = MeshNormalMaterial;
            door.position.set(-this.data.Door.x/2,0,this.data.z/2-Wall.thickness/2);
            door.scale.set(1,1,2);
            // scene.add(door);
            //右门
            const door2 = this.door.clone();
            door2.material = MeshNormalMaterial;
            door2.position.set(this.data.Door.x/2,0,this.data.z/2-Wall.thickness/2);
            door2.scale.set(1,1,2);
            // scene.add(door2);

            //布尔运算掏空房间
            const WallBSP = new ThreeBSP(wall);
            const WallInsideBSP = new ThreeBSP(wallInside);
            const doorBSP = new ThreeBSP(door);
            const door2BSP = new ThreeBSP(door2);
            wall = WallBSP.subtract(WallInsideBSP).subtract(doorBSP).subtract(door2BSP);
            wall = wall.toMesh();
            wall.material = wallMaterial;
            wall.position.set(this.data.Wall.position.x,this.data.Wall.position.y,this.data.Wall.position.z);
            wall.castShadow = true;
            return wall
        },
        door:function () {
            const door = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.x,Wall.y,Wall.thickness/2)),
                new THREE.MeshLambertMaterial({color:'red',wireframe:COMMON.wireframe,map:windowImg,transparent:true}));
            door.position.set(-this.data.Door.x/2,Wall.y/2+Floor.y/2+Floor2.y,this.data.z/2-Wall.thickness+Wall.thickness/4);
            door.name='bedroomDoor';
            door.clickFun='bedroom2nd.doorOpenClose()';
            door.isOpen = false;
            this.door = door;
            return door
        },
        door2:function () {
            const door = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.x,Wall.y,Wall.thickness/2)),
                new THREE.MeshLambertMaterial({color:'red',wireframe:COMMON.wireframe,map:windowImg,transparent:true}));
            door.position.set(this.data.Door.x/2,Wall.y/2+Floor.y/2+Floor2.y,this.data.z/2-Wall.thickness/4);
            door.name='bedroomDoor';
            door.clickFun='bedroom2nd.door2OpenClose()';
            door.isOpen = false;
            this.door2 = door;
            return door
        },
        // 栅栏
        rail:function(){
            let group = new THREE.Group();
            //石柱墩子
            let material = new THREE.MeshLambertMaterial({color:'#e0d9c8',wireframe:COMMON.wireframe});
            let cylinder = new THREE.Mesh( (new THREE.BoxGeometry(this.data.rail.d,this.data.rail.y,this.data.rail.d)),
                // material}));
                MeshNormalMaterial);
            // scene.add(cylinder)
            //石墩柱子布尔运算
            //大外圈
            const cylinder_big = new THREE.Mesh( (new THREE.BoxGeometry(this.data.rail.d*1.2,0.4,this.data.rail.d*1.2)),
                MeshNormalMaterial);
            cylinder_big.position.set(0,this.data.rail.y/2-0.6,0)
            // scene.add(cylinder_big);
            //小外圈
            const cylinder_small = new THREE.Mesh( (new THREE.BoxGeometry(this.data.rail.d*1.1,0.4,this.data.rail.d*1.1)),
                MeshNormalMaterial);
            cylinder_small.position.set(0,this.data.rail.y/2-1,0)
            // scene.add(cylinder_small);
            //合并
            const cylinderBSP = new ThreeBSP(cylinder);
            const cylinder_bigBSP = new ThreeBSP(cylinder_big);
            const cylinder_smallBSP = new ThreeBSP(cylinder_small);
            cylinder = cylinderBSP.union(cylinder_bigBSP).union(cylinder_smallBSP);
            cylinder = cylinder.toMesh();
            cylinder.material = material;
            cylinder.castShadow = true;
            //复制品
            const cylinder1 = cylinder.clone();cylinder1.position.set(
                -this.data.x/2+this.data.rail.d/2,
                this.data.rail.y/2+Floor.y/2,
                this.data.z/2+this.data.rail.d/2)
            const cylinder2 = cylinder.clone();cylinder2.position.set(
                -this.data.x/2+this.data.rail.d/2,
                this.data.rail.y/2+Floor.y/2,
                this.data.z/2-this.data.rail.d/2+(bedroom1st.data.z-this.data.z))
            const cylinder3 = cylinder.clone();cylinder3.position.set(
                -this.data.x/2+this.data.x/3+this.data.rail.d/2,
                this.data.rail.y/2+Floor.y/2,
                this.data.z/2-this.data.rail.d/2+(bedroom1st.data.z-this.data.z))
            const cylinder4 = cylinder.clone();cylinder4.position.set(
                this.data.x/2-this.data.x/3-this.data.rail.d/2,
                this.data.rail.y/2+Floor.y/2,
                this.data.z/2-this.data.rail.d/2+(bedroom1st.data.z-this.data.z))
            const cylinder5 = cylinder.clone();cylinder5.position.set(
                this.data.x/2-this.data.rail.d/2,
                this.data.rail.y/2+Floor.y/2,
                this.data.z/2-this.data.rail.d/2+(bedroom1st.data.z-this.data.z))
            const cylinder6 = cylinder.clone();cylinder6.position.set(
                this.data.x/2-this.data.rail.d/2,
                this.data.rail.y/2+Floor.y/2,
                this.data.z/2+this.data.rail.d/2);

            //栅栏
            let box = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-this.data.rail.d,this.data.rail.y/2,bedroom1st.data.z-this.data.z-this.data.rail.d)),
                MeshNormalMaterial);
            let boxInside = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-this.data.rail.d-this.data.rail.thickness*2,this.data.rail.y/2+1,bedroom1st.data.z-this.data.z-this.data.rail.d-this.data.rail.thickness)),
                MeshNormalMaterial);
            boxInside.position.set(0,0,-this.data.rail.thickness/2);
            //合并
            const boxBSP = new ThreeBSP(box);
            const boxInsideBSP = new ThreeBSP(boxInside);
            box = boxBSP.subtract(boxInsideBSP);
            box = box.toMesh();
            // box.material = new THREE.MeshLambertMaterial({color:'#000',map:railImg,transparent:true});
            box.material = new THREE.MeshLambertMaterial({color:'#000',map:railImg,transparent:true});
            box.position.set(0,Floor.y/2+this.data.rail.y/4+Floor2.y,this.data.z/2+(bedroom1st.data.z-this.data.z)/2);
            box.castShadow = true;

            group.add(cylinder1);
            group.add(cylinder2);
            group.add(cylinder3);
            group.add(cylinder4);
            group.add(cylinder5);
            group.add(cylinder6);
            group.add(box);
            return group

        },
        doorOpenClose(){
            console.log("卧室二楼-门开关1");
            if (this.door.isOpen){
                this.door.position.set(-this.data.Door.x/2,Wall.y/2+Floor.y/2,this.data.z/2-Wall.thickness+Wall.thickness/4);
            }else{
                this.door.position.set(this.data.Door.x/2,Wall.y/2+Floor.y/2,this.data.z/2-Wall.thickness+Wall.thickness/4);
            }
            this.door.isOpen = !this.door.isOpen;
        },
        door2OpenClose(){
            console.log("卧室二楼-门开关2");
            if (this.door2.isOpen){
                this.door2.position.set(this.data.Door.x/2,Wall.y/2+Floor.y/2,this.data.z/2-Wall.thickness/4);
            }else{
                this.door2.position.set(-this.data.Door.x/2,Wall.y/2+Floor.y/2,this.data.z/2-Wall.thickness/4);
            }
            this.door2.isOpen = !this.door2.isOpen;
        },
    }
})()

/**
 * 车库
 */
let garage1st = (function () {
    return{
        data:{
            x:50,
            z:40,
            position:{
                x:25,
                y:Floor.y/2,
                z:-50,
            },
            Door:{
                far:20,
                x:20,
                y:Wall.y * 0.8,
            },
            Hill:{
                color:'#f1e6d5'
            }
        },
        init:function () {
            const garage = new THREE.Group();
            garage.position.set(this.data.position.x,this.data.position.y,this.data.position.z);
            garage.add(this.floor());
            garage.add(this.door());
            garage.add(this.wall());
            garage.add(this.wallBottom());
            return garage
        },
        floor:function () {
            const geometry = new THREE.BoxGeometry(this.data.x,Floor.y,this.data.z);
            geometry.receiveShadow = true;
            const material = new THREE.MeshLambertMaterial({
                color:'#bbad97',
                wireframe:COMMON.wireframe,
            })
            const garage_floor = new THREE.Mesh(geometry,material);
            garage_floor.position.set(0,0,0);
            // scene.add(plane_frontLeft);
            return garage_floor
        },
        wallBottom:function(){
            //基本结构
            let material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            let wallBottom = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x+WallBottom.overThickness,Floor.y+WallBottom.y,this.data.z+WallBottom.overThickness)),
                MeshNormalMaterial);
            const WallBottomInsde = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-WallBottom.overThickness,Floor.y+WallBottom.y,this.data.z-WallBottom.overThickness)),
                MeshNormalMaterial);
            // scene.add(wallBottom)

            // //创建门
            const door = this.door.clone();
            door.position.set(this.data.x/2-Wall.thickness/2,0,0);
            door.material = new THREE.MeshNormalMaterial();
            door.scale.set(1,1,2)
            // scene.add(door)

            //布尔运算
            const wallBottomBSP = new ThreeBSP(wallBottom);
            const WallBottomInsdeBSP = new ThreeBSP(WallBottomInsde);
            const doorBSP = new ThreeBSP(door);
            wallBottom = wallBottomBSP.subtract(WallBottomInsdeBSP).subtract(doorBSP);
            wallBottom = wallBottom.toMesh();
            wallBottom.material = new THREE.MeshLambertMaterial({color:WallBottom.color,wireframe:COMMON.wireframe});
            wallBottom.position.set(0,+WallBottom.y/2,0)
            return wallBottom
        },
        wall:function () {
            let material = new THREE.MeshLambertMaterial({color:'#87634e',wireframe:COMMON.wireframe});
            let wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z)),
                MeshNormalMaterial);
            const wallInside = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-Wall.thickness*2,Wall.y-Wall.thickness,this.data.z-Wall.thickness*2)),
                MeshNormalMaterial);
            wallInside.position.set(0,-Wall.thickness/2,0);
            // scene.add(wall);

            //门
            let door = this.door.clone();
            door.position.set(this.data.x/2-Wall.thickness/2,-(Wall.y-this.data.Door.y)/2,0);
            door.material = MeshNormalMaterial;
            // scene.add(door);

            //布尔运算
            const wallBSP = new ThreeBSP(wall);
            const wallInsideBSP = new ThreeBSP(wallInside);
            const doorBSP = new ThreeBSP(door);
            wall = wallBSP.subtract(wallInsideBSP).subtract(doorBSP);
            wall = wall.toMesh();
            wall.material = material;
            wall.position.set(0,Floor.y/2+Wall.y/2,0);
            wall.castShadow = true
            return wall
        },
        door:function () {
            var group = new THREE.Group();
            const door = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Door.x,this.data.Door.y,Wall.thickness)),
                new THREE.MeshLambertMaterial({color:'red',wireframe:COMMON.wireframe}));
            door.rotation.set(0,Math.PI*0.5,0);
            door.name="garage1stDoor";
            door.clickFun="garage1st.doorOpenClose()";
            door.isOpen =false;
            group.add(door);
            this.door = door;

            //斜坡
            //创建基本形状
            let triangleShape = new THREE.Shape();
            triangleShape.moveTo(0,0,0);
            triangleShape.lineTo(this.data.Door.far/2,0,0);
            triangleShape.lineTo(0,Floor.y,0);
            triangleShape.lineTo(0,0,0);
            const trangle = new THREE.Mesh( (new THREE.ShapeGeometry(triangleShape)),MeshNormalMaterial);
            //创建拉伸对象配置属性
            let extrudeSetting ={
                depth:this.data.Door.x,//拉伸的深度
                bevelEnalbe:false,
                bevelSegments:1,
                bevelSize:0,
            }
            //创建拉伸几何体
            const hill = new THREE.Mesh( (new THREE.ExtrudeGeometry(triangleShape,extrudeSetting)),
                new THREE.MeshLambertMaterial({color:this.data.Hill.color,wireframe:COMMON.wireframe}));
            hill.position.set(WallBottom.overThickness,-Wall.y/2-Floor.y/2,-this.data.Door.x/2);
            group.add(hill);

            group.position.set(this.data.x/2-Wall.thickness/2,Floor.y/2+Wall.y/2-(Wall.y-this.data.Door.y)/2,0);
            return group
        },
        doorOpenClose() {
            console.log("车库-门开关");
            if (this.door.isOpen){
                this.door.rotation.set(0,Math.PI*0.5,0);
            }else{
                this.door.rotation.set(Math.PI*0.5,Math.PI*0.9,0);
            }
            this.door.isOpen = !this.door.isOpen
        }
    }
})();
let garage2nd = (function () {
    return{
        data:{
            x:50,
            z:30,
            position:{
                  x:25,
                  y:Floor.y/2 + Wall.y,
                  z:-45,
            },
            Door:{
                x:20,
                y:Wall.y * 0.8,
            },
            Window:{
                x:10,
                y:Wall.y * 0.5,
                position:{
                    x:25 - Wall.thickness/2,
                    y:Wall.y/2 + Floor.y/2,
                    z:0,
                }
            }
        },
        init:function () {
            const garage = new THREE.Group();
            garage.position.set(this.data.position.x,this.data.position.y,this.data.position.z);
            // garage.add(this.floor());
            garage.add(this.window());
            garage.add(this.wall());
            return garage
        },
        floor:function () {
            const geometry = new THREE.BoxGeometry(this.data.x,Floor.y,this.data.z);
            geometry.receiveShadow = true;
            const material = new THREE.MeshLambertMaterial({
                color:'#bbad97',
                wireframe:COMMON.wireframe,
            })
            const garage_floor = new THREE.Mesh(geometry,material);
            garage_floor.position.set(0,0,0);
            // scene.add(plane_frontLeft);
            return garage_floor
        },
        wall:function () {
            let material = new THREE.MeshLambertMaterial({color:'#87634e',wireframe:COMMON.wireframe});
            let wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z)),
                MeshNormalMaterial);
            const wallInside = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x-Wall.thickness*2,Wall.y-Wall.thickness,this.data.z-Wall.thickness*2)),
                MeshNormalMaterial);
            wallInside.position.set(0,-Wall.thickness/2,0);
            // scene.add(wall);

            //窗户
            const window = this.window.clone();
            window.material = MeshNormalMaterial;
            window.position.set(this.data.x/2,0,0);
            window.scale.set(1,1,2);
            // scene.add(window)

            //布尔运算
            const wallBSP = new ThreeBSP(wall);
            const wallInsideBSP = new ThreeBSP(wallInside);
            const windowBSP = new ThreeBSP(window);
            wall = wallBSP.subtract(wallInsideBSP).subtract(windowBSP);
            wall = wall.toMesh();
            wall.material = material;
            wall.position.set(0,Floor.y/2+Wall.y/2,0);
            return wall
        },
        window:function () {
            const window = new THREE.Mesh( (new THREE.BoxGeometry(this.data.Window.x,this.data.Window.y,Wall.thickness)),
                new THREE.MeshLambertMaterial({color:'#fff',wireframe:COMMON.wireframe,map:windowImg,transparent:true}));
            window.position.set(this.data.Window.position.x,this.data.Window.position.y,0);
            window.rotation.set(0,Math.PI*0.5,0);
            this.window = window;

            return window

        }

    }
})();

/**
 * 厨房
 */
let kitchen1st = (function () {
    return{
        data:{
            x:40,
            z:30,
        },
        init:function () {
            const kitchen = new THREE.Group();
            kitchen.position.set(-20,Floor.y/2,-45);
            kitchen.add(this.floor());
            kitchen.add(this.wall());
            return kitchen
        },
        floor:function () {
            const geometry = new THREE.BoxGeometry(this.data.x,Floor.y,this.data.z);
            geometry.receiveShadow = true;
            const material = new THREE.MeshLambertMaterial({
                color:'#bbad97',
                wireframe:COMMON.wireframe,
            })
            const kitchen_floor = new THREE.Mesh(geometry,material);
            kitchen_floor.position.set(0,0,0);
            // scene.add(plane_frontLeft);
            return kitchen_floor
        },
        wall:function () {
            let material = new THREE.MeshLambertMaterial({color:'#b7a17e',wireframe:COMMON.wireframe})
            let wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z)),
                MeshNormalMaterial);
            const wallInside = new THREE.Mesh( new THREE.BoxGeometry(this.data.x - Wall.thickness*2,Wall.y - Wall.thickness,this.data.z - Wall.thickness*2),
                MeshNormalMaterial);
            wallInside.position.set(0,-Wall.thickness/2,0);

            //布尔运算
            const wallBSP = new ThreeBSP(wall);
            const wallInsideBSP = new ThreeBSP(wallInside);
            wall = wallBSP.subtract(wallInsideBSP);
            wall = wall.toMesh();
            wall.position.set(0,Wall.y/2+Floor.y/2,0)
            wall .material = material;
            return wall
        },
    }
})();
let kitchen2nd = (function () {
    return{
        data:{
            x:40,
            z:30,
        },
        init:function () {
            const kitchen = new THREE.Group();
            kitchen.position.set(-20,Floor.y/2+Wall.y,-45);
            kitchen.add(this.wall());
            return kitchen
        },
        wall:function () {
            let material = new THREE.MeshLambertMaterial({color:'#b7a17e',wireframe:COMMON.wireframe})
            let wall = new THREE.Mesh( (new THREE.BoxGeometry(this.data.x,Wall.y,this.data.z)),
                MeshNormalMaterial);
            const wallInside = new THREE.Mesh( new THREE.BoxGeometry(this.data.x - Wall.thickness*2,Wall.y - Wall.thickness,this.data.z - Wall.thickness*2),
                MeshNormalMaterial);
            wallInside.position.set(0,-Wall.thickness/2,0);

            //布尔运算
            const wallBSP = new ThreeBSP(wall);
            const wallInsideBSP = new ThreeBSP(wallInside);
            wall = wallBSP.subtract(wallInsideBSP);
            wall = wall.toMesh();
            wall.position.set(0,Wall.y/2+Floor.y/2,0)
            wall .material = material;
            return wall
        },
    }
})();

/**
 * 屋顶
 */
let roof = (function () {
    return {
        data:{
            overThickness:3,
        },
        init:function () {
            const group = new THREE.Group();
            //贯穿客厅和卧室
            group.add(this.roof1());
            //客厅主体窗户
            group.add(this.roof2());
            //卧室
            group.add(this.roof3());
            //贯穿车库和厨房
            group.add(this.roof4());
            //贯穿车库和卧室的一楼屋顶
            group.add(this.roof5());
            //车库一楼
            group.add(this.roof6());
            //屋顶底部
            group.add(this.bottom());
            group.position.set(0,44,0);
            return group
        },
        roof1:function () {
            let group = new THREE.Group();
            // 凸面几何体
            // 创建凸包的点
            let points = [
                new THREE.Vector3(-livingRoom2nd.data.x-this.data.overThickness,0,(livingRoom1st.data.x-livingRoom1st.data.z)/2+this.data.overThickness),
                new THREE.Vector3(this.data.overThickness,0,(livingRoom1st.data.x-livingRoom1st.data.z)/2+this.data.overThickness),
                new THREE.Vector3(-livingRoom2nd.data.x-this.data.overThickness,0,-(livingRoom1st.data.x)/2-this.data.overThickness),
                new THREE.Vector3(this.data.overThickness,0,-(livingRoom1st.data.x)/2-this.data.overThickness),
                new THREE.Vector3(20,15,-(livingRoom1st.data.x-livingRoom1st.data.z)/2),
                new THREE.Vector3(-livingRoom2nd.data.x+10,15,-(livingRoom1st.data.x-livingRoom1st.data.z)/2),
            ];
            let roof = new THREE.Mesh( (new THREE.ConvexGeometry(points)),(new THREE.MeshLambertMaterial({color:'#f6ddc6',wireframe:COMMON.wireframe})));
            roof.castShadow = true;

            group.add(roof)

            return group
        },
        roof2:function () {
            let points = [
                new THREE.Vector3(-48,0,15),
                new THREE.Vector3(-45,0,20),
                new THREE.Vector3(-35,0,20),
                new THREE.Vector3(-32,0,15),

                new THREE.Vector3(-40,10,10),

                new THREE.Vector3(-40,10,-30),
                new THREE.Vector3(-50,0,-30),
                new THREE.Vector3(-30,0,-30),
            ];
            let roof = new THREE.Mesh( (new THREE.ConvexGeometry(points)),(new THREE.MeshLambertMaterial({color:'#f6ddc6',wireframe:COMMON.wireframe})));
            roof.castShadow = true;

            return roof
        },
        roof3:function () {
            let points = [
                new THREE.Vector3(-5,0,20),
                new THREE.Vector3(45,0,20),
                new THREE.Vector3(-5,0,-30),
                new THREE.Vector3(45,0,-30),

                new THREE.Vector3(20,15,10),
                new THREE.Vector3(20,15,-20),
            ];
            let roof = new THREE.Mesh( (new THREE.ConvexGeometry(points)),(new THREE.MeshLambertMaterial({color:'#f6ddc6',wireframe:COMMON.wireframe})));
            roof.castShadow = true;

            return roof
        },
        roof4:function () {
            let points = [
                new THREE.Vector3(55,0,-25),
                new THREE.Vector3(55,0,-65),
                new THREE.Vector3(-50,0,-25),
                new THREE.Vector3(-50,0,-65),

                new THREE.Vector3(45,15,-45),
                new THREE.Vector3(-40,15,-45),

            ];
            let roof = new THREE.Mesh( (new THREE.ConvexGeometry(points)),(new THREE.MeshLambertMaterial({color:'#f6ddc6',wireframe:COMMON.wireframe})));
            roof.castShadow = true;

            return roof
        },
        roof5:function () {
            let points = [
                new THREE.Vector3(40,-19,0),
                new THREE.Vector3(65,-19,0),
                new THREE.Vector3(65,-19,-30),
                new THREE.Vector3(40,-19,-30),

                new THREE.Vector3(50,-9,-15),
                new THREE.Vector3(40,-9,-15),

            ];
            let roof = new THREE.Mesh( (new THREE.ConvexGeometry(points)),(new THREE.MeshLambertMaterial({color:'#f6ddc6',wireframe:COMMON.wireframe})));
            roof.castShadow = true;

            return roof
        },
        roof6:function () {
            let points = [
                new THREE.Vector3(60,-19,-30),
                new THREE.Vector3(60,-19,-75),
                new THREE.Vector3(-5,-19,-75),
                new THREE.Vector3(-5,-19,-30),

                new THREE.Vector3(30,-9,-60),
                //减法点位
                new THREE.Vector3(30,-9,0),

            ];
            let roof = new THREE.Mesh( (new THREE.ConvexGeometry(points)),(new THREE.MeshLambertMaterial({color:'#f6ddc6',wireframe:COMMON.wireframe})));
            roof.castShadow = true;
            return roof
        },
        bottom:function () {
            let group = new THREE.Group();

            let material = new THREE.MeshLambertMaterial({color:RoofBottom.color,wireframe:COMMON.wireframe})

            //客厅
            let bottom = new THREE.Mesh( (new THREE.BoxGeometry(66,1,46)),
                material)
            bottom.position.set(livingRoom1st.data.position.x,0.4,-(livingRoom1st.data.x - livingRoom1st.data.z)/2);

            //客厅主体窗户
            let bottomOfWindow = new THREE.Mesh( (new THREE.CylinderGeometry(livingRoom2nd.data.Window.width/2,livingRoom2nd.data.Window.width/2,1,6,1,false,Math.PI*0.5)),
                material)
            bottomOfWindow.position.set(-40,0.4,12);

            //卧室
            let bottomBedroom = new THREE.Mesh( (new THREE.BoxGeometry(50,1,62)),
                material)
            bottomBedroom.position.set(bedroom1st.data.position.x,0.4,-(bedroom1st.data.z - bedroom1st.data.x)/2);

            //卧室门
            let bottomDoor = new THREE.Mesh( (new THREE.BoxGeometry(25,0,31)),
                material)
            bottomDoor.position.set(52.5,-19,-15);

            //厨房和车库
            let bottom2 = new THREE.Mesh( (new THREE.BoxGeometry(108,1,42)),
                material)
            bottom2.position.set(2.5,0,-45);

            //车库
            let bottomGarage = new THREE.Mesh( (new THREE.BoxGeometry(65,1,52)),
                material)
            bottomGarage.position.set(27.5,-19,-50);

            group.add(bottom);
            group.add(bottomOfWindow);
            group.add(bottomBedroom);
            group.add(bottom2);
            group.add(bottomDoor);
            group.add(bottomGarage);

            return group

        }

    }
})()

app.loadingProgress = 95;
