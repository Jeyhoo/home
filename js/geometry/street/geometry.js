function createStreet(){
    street.init();
    streetLamp.init();
    //广告牌
    billboard.init();
    //路边绿植
    kerb.init();
    //树
    trees.init();
    //公路
    road.init();
    //停车场
    carPark.init();
    //花园
    garden.init();
    //院灯
    yardLight.init();
}

let street = (function () {
    return {
        data:{
            floor:{
                // color:'#dcdcdc'
                color:'#fff'
            },
            streetLight:{
                color:'#2b3b47'
            }
        },
        init:function () {
            const group = new THREE.Group();
            group.add(this.floor());
            group.position.set(0,-0.1,0);

            scene.add(group)
            // return group
        },
        floor:function () {
            const floor = new THREE.Mesh(new THREE.BoxGeometry(3000,1,3000),
                new THREE.MeshPhongMaterial({color:this.data.floor.color,wireframe:COMMON.wireframe,side:THREE.DoubleSide}));
            // MeshNormalMaterial);
            floor.receiveShadow=true;
            return floor
        },
    }
})();
let streetLamp = (function () {
    return {
        data:{
            color:'#2b3b47'
        },
        init:function () {
            let group = new THREE.Group();
            let streetLamp_1 = this.streetLampMesh();streetLamp_1.position.set(-150,0,80);group.add(streetLamp_1);
            let streetLamp_2 = this.streetLampMesh();streetLamp_2.position.set(-50,0,80);group.add(streetLamp_2);
            let streetLamp_3 = this.streetLampMesh();streetLamp_3.position.set(50,0,80);group.add(streetLamp_3);
            let streetLamp_4 = this.streetLampMesh();streetLamp_4.position.set(150,0,80);group.add(streetLamp_4);

            scene.add(group);
        },
        streetLampMesh:function(){
            const group = new THREE.Group();
            let material = new THREE.MeshLambertMaterial({color:this.data.color,wireframe:COMMON.wireframe})
            //底部长柱
            const bottom = new THREE.Mesh( (new THREE.CylinderGeometry(1,1,streetLampConfig.bottom.height)),material);
            bottom.position.set(0,streetLampConfig.bottom.height/2,0)
            bottom.castShadow = true;

            //弯曲的顶部
            let points = [];
            for (let i = 0 ; i < 10 ; i ++){
                points.push(new THREE.Vector3(0,Math.sin((i/10)*Math.PI/2) * 10 + (streetLampConfig.bottom.height)*0.6,i));
            }
            //创建三维路径
            let path = new THREE.CatmullRomCurve3(points);
            const top = new THREE.Mesh( (new THREE.TubeGeometry(path,64,1,8,false)),material);

            //侧边灯-非光源
            const lightAside_cover = new THREE.Mesh( (new THREE.SphereGeometry(2,32,32,0,Math.PI*2,0,Math.PI*0.5)),material);
            lightAside_cover.scale.set(1,1,1.5);
            lightAside_cover.position.set(0,33,10);
            lightAside_cover.castShadow = true;
            const lightAside = new THREE.Mesh( (new THREE.SphereGeometry(1.5,32,32)),
                new THREE.MeshBasicMaterial({color:'#fff'}));
            lightAside.position.copy(lightAside_cover.position);
            lightAside.castShadow = true;

            //顶部灯-非光源
            const lightTop_cover = new THREE.Mesh(new THREE.CylinderGeometry(2,3,3,8,),material);
            lightTop_cover.position.set(0,streetLampConfig.bottom.height+2,0);
            lightTop_cover.castShadow = true;
            const lightTop = new THREE.Mesh(new THREE.SphereGeometry(2),
                new THREE.MeshBasicMaterial({color:'#fff'}));
            lightTop.castShadow = true;
            lightTop.position.set(0,40,0);

            //光源--侧边
            const spotLight = new THREE.SpotLight(streetLampConfig.spotLight.color,
                streetLampConfig.spotLight.intensity,
                streetLampConfig.spotLight.distance,
                streetLampConfig.spotLight.angle,
                streetLampConfig.spotLight.penumbra,
                streetLampConfig.spotLight.decay);

            spotLight.position.set(streetLampConfig.spotLight.position.x,streetLampConfig.spotLight.position.y,streetLampConfig.spotLight.position.z);
            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = COMMON.mapSizeWidth;
            spotLight.shadow.mapSize.height = COMMON.mapSizeHeight;
            spotLight.name = 'streetLamp_spotLight';
            //光源位置复制品，以便看清位置
            let spotLightGUI = streetLampConfig.lightGUI.mesh.clone();
            spotLightGUI.position.copy(spotLight.position);
            spotLightGUI.name='spotLightGUI';
            //光源照射方向
            const lightLampTarget = streetLampConfig.target.mesh.clone();
            lightLampTarget.position.set(streetLampConfig.target.position.x,streetLampConfig.target.position.y,streetLampConfig.target.position.z);
            lightLampTarget.name = 'streetTarget';
            spotLight.target = lightLampTarget;

            //光源--顶部
            const pointLight = new THREE.PointLight("#fff",1,50,1);
            pointLight.position.set(0,40,0);
            pointLight.name = 'streetLamp_pointLight';
            const pointLightGUI = streetLampConfig.lightGUI.mesh.clone();
            pointLightGUI.position.copy(pointLight.position);

            group.add(bottom);
            group.add(top);
            group.add(lightAside_cover);
            group.add(lightAside);
            group.add(lightTop_cover);
            group.add(lightTop);
            group.add(spotLight);
            group.add(pointLight);
            group.add(spotLightGUI);
            group.add(pointLightGUI);
            group.add(lightLampTarget);
            return group
        },
    }
})();
let billboard = (function () {
    return {
        data:{
            // material: new THREE.MeshLambertMaterial({color:'#c0c0c0',wireframe:COMMON.wireframe})
            material: new THREE.MeshPhongMaterial({color:'#c0c0c0',wireframe:COMMON.wireframe})
        },
        init:function () {
            let group = new THREE.Group();
            //创建广告牌的柱子
            group.add(this.bottom());
            //创建广告牌的外边框
            group.add(this.topFrame());
            //创建广告牌的中心主体
            group.add(this.topInside());
            //创建彩灯
            group.add(this.light());
            group.position.set(100,7.5,30);
            scene.add(group);
        },
        bottom:function () {
            let bottom = new THREE.Mesh(new THREE.CylinderGeometry(3,3,15),
                this.data.material);
            bottom.castShadow = true;
            return bottom
        },
        topFrame:function () {
            let outSide = new THREE.Mesh(new THREE.BoxGeometry(50,30,6));
            let inside = new THREE.Mesh(new THREE.BoxGeometry(45,25,6));

            outSide = new ThreeBSP(outSide);
            inside = new ThreeBSP(inside);
            let topFrame = outSide.subtract(inside);topFrame = topFrame.toMesh();
            topFrame.material = this.data.material;
            topFrame.position.set(0,20,0);
            topFrame.castShadow = true;
            return topFrame
        },
        topInside:function () {
            let topInside = new THREE.Mesh(new THREE.BoxGeometry(45,25,4),this.data.material);
            topInside.position.set(0,20,0);
            topInside.castShadow = true;
            return topInside
        },
        light:function () {
            let group = new THREE.Group();

            let light_1 = this.createLight();light_1.position.set(-24,31,3.5);
            let light_2 = this.createLight();light_2.position.set(-15,28,3.5);
            let light_3 = this.createLight();light_3.position.set(-5,32,3.5);
            let light_4 = this.createLight();light_4.position.set(5,29,3.5);
            let light_5 = this.createLight();light_5.position.set(15,30,3.5);
            let light_6 = this.createLight();light_6.position.set(24,32,3.5);


            //彩灯的电线
            const lineArr = new Array();
            lineArr.push(-24,31,3.5);
            lineArr.push(-15,28,3.5);
            lineArr.push(-5,32,3.5);
            lineArr.push(5,29,3.5);
            lineArr.push(15,30,3.5);
            lineArr.push(24,32,3.5);

            const lineGeometry = new THREE.BufferGeometry();
            const lineMaterial = new THREE.LineBasicMaterial();

            lineGeometry.addAttribute('position',new THREE.Float32BufferAttribute(lineArr,3));
            lineGeometry.addAttribute('color',new THREE.Float32BufferAttribute('red',3));

            //不知道干啥用的
            lineGeometry.computeBoundingSphere();

            let line  = new THREE.Line(lineGeometry,lineMaterial);

            group.add(light_1)
            group.add(light_2)
            group.add(light_3)
            group.add(light_4)
            group.add(light_5)
            group.add(light_6)
            group.add(line)

            return group
        },
        createLight(){
            let color = COMMON.getColorRandom();
            let group = new THREE.Group();
            let baisc = new THREE.Mesh(new THREE.SphereGeometry(1),new THREE.MeshBasicMaterial({color:color}));
            let light = new THREE.PointLight(color,1,50,1);
            light.shadow.camera.near = -1;
            light.shadow.camera.far = 1;
            light.shadow.camera.left = -1;
            light.shadow.camera.right = 1;
            color.castShadow = true;
            group.add(baisc)
            group.add(light)
            return group
        }
    }
})();
let kerb = (function () {
    return{
        init:function () {
            let group = new THREE.Group();
            group.add(this.green());
            group.position.set(0,0,60)
            scene.add(group)
        },
        green:function () {
            //方案一：点云材质
        //     let geometry = new THREE.BufferGeometry();
        //     let material = new THREE.PointsMaterial({
        //         size:0.5,
        //         vertexColors:true,
        //     })
        //     let points = [];
        //     var color = [];
        //     for (let x = 0 ; x < 300 ; x ++){
        //         for (let y = 0 ; y < 10 ; y++){
        //             for (let z = 0 ; z < 5 ; z++){
        //                 points.push(x,y,z);
        //                 let clr = new THREE.Color(0xffffff);
        //                 color.push(clr.r,clr.g,clr.b);
        //             }
        //         }
        //     }
        //     geometry.addAttribute('position',new THREE.Float32BufferAttribute(points,3));
        //     geometry.addAttribute('color',new THREE.Float32BufferAttribute(color,3));
        //     return new THREE.Points(geometry,material);

            //方案二：几何体合并
            // let geometry = new THREE.PlaneGeometry(1,1);
            // let material = new THREE.MeshLambertMaterial({color:'red',side:THREE.DoubleSide});
            // let leaves = new THREE.Geometry();
            // for (let x = 0 ; x < 300 ; x ++){
            //     for (let y = 0 ; y < 10 ; y++){
            //         for (let z = 0 ; z < 5 ; z++){
            //             let leaf = createMesh(geometry,material);
            //             leaf.position.set(x,y,z);
            //             scene.add(leaf)
            //             leaf.updateMatrix();
            //             leaves.merge(leaf.geometry,leaf.material);
            //         }
            //     }
            // }

            //方案三：贴图
            const greenImg = greenbeltImg;
            //开启阵列，允许图片重复
            greenImg.wrapS = THREE.RepeatWrapping;greenImg.wrapT = THREE.RepeatWrapping;
            //u和v方向的重复次数
            greenImg.repeat.set(10,1);

            var group = new THREE.Group();
            let greenLeft = createMesh(new THREE.BoxGeometry(150,10,5),new THREE.MeshLambertMaterial({map:greenImg}));
            greenLeft.position.set(-75,5,0);
            greenLeft.castShadow = true;
            let greenLeft_bottom = createMesh(new THREE.BoxGeometry(152,3,8),new THREE.MeshLambertMaterial({color:'#c0c0c0'}))
            greenLeft_bottom.position.set(greenLeft.position.x,1.5,0);
            greenLeft_bottom.castShadow = true;

            let greenRight = createMesh(new THREE.BoxGeometry(120,10,5),new THREE.MeshLambertMaterial({map:greenImg}));
            greenRight.position.set(90,5,0);
            greenRight.castShadow = true;
            let greenRight_bottom = createMesh(new THREE.BoxGeometry(122,3,8),new THREE.MeshLambertMaterial({color:'#c0c0c0'}))
            greenRight_bottom.position.set(greenRight.position.x,1.5,0);
            greenRight_bottom.castShadow = true;

            group.add(greenLeft)
            group.add(greenLeft_bottom)
            group.add(greenRight)
            group.add(greenRight_bottom)
            return group
            // return createMesh(leaves,material)
        }
    }
})();
let trees = (function () {
    return {
        data:{
            trunk:{
                material:new THREE.MeshLambertMaterial({color:'#8c5a32'})
            },
            leaf:{
                material:new THREE.MeshLambertMaterial({color:'#006400'})
            }
        },
        init:function () {
            let group = new THREE.Group();
            //房子前面的树
            group.add(this.tree(50,0,50));
            group.add(this.tree(-20,0,50));
            group.add(this.tree(-70,0,50));
            group.add(this.tree(-110,0,50));

            // 右侧的树
            group.add(this.tree(145,0,50));
            group.add(this.tree(145,0,0));
            group.add(this.tree(145,0,-50));
            group.add(this.tree(145,0,-100));
            group.add(this.tree(145,0,-145));

            // 左侧的树
            group.add(this.tree(-145,0,50));
            group.add(this.tree(-145,0,0));
            group.add(this.tree(-145,0,-50));
            group.add(this.tree(-145,0,-100));
            group.add(this.tree(-145,0,-145));

            group.position.set(0,0,0);
            scene.add(group)
        },
        tree(x,y,z){
            let _that = this;
            let group= new THREE.Group();
            //创建树根
            let points = [
                [
                    new THREE.Vector3(-1,0,0),
                    new THREE.Vector3(-2,10,0),
                    new THREE.Vector3(-1,15,-2),
                    new THREE.Vector3(1,30,2),
                ],
                [
                    new THREE.Vector3(1,0,-2),
                    new THREE.Vector3(0,15,0),
                    new THREE.Vector3(0,30,0),
                ],
                [
                    new THREE.Vector3(1,0,2),
                    new THREE.Vector3(-2,15,0),
                    new THREE.Vector3(0,30,0),
                ]
            ]
            points.map(function (item) {
                let path = new THREE.CatmullRomCurve3(item);
                group.add( createMesh(new THREE.TubeGeometry(path,12,2,6),_that.data.trunk.material))
            })

            //创建树叶
            let leaves = [
                {size:10,x:0,y:30,z:0,rotationX:Math.PI*0.5},
                {size:8,x:-10,y:25,z:0},
                {size:8,x:0,y:20,z:5},
                {size:8,x:0,y:15,z:-5},
            ]
            leaves.map(function (item) {
                let leaf = createMesh(new THREE.IcosahedronGeometry(item.size,item.surface),_that.data.leaf.material);
                leaf.position.set(item.x,item.y,item.z);
                leaf.rotation.set(item.rotationX||1,item.rotationY||1,item.rotationZ||1);
                group.add(leaf)
            })
            group.position.set(x||0,y||0,z||0);

            return  group

        }
    }
})();
let road = (function () {
    return {
        data:{},
        init:function () {
            let group = new THREE.Group();
            group.add(this.createRoad(0,1,125));
            scene.add(group);
        },
        createRoad:function (x,y,z) {
            let villaRoadImg = roadImg;
            // villaRoadImg.wrapS = THREE.RepeatWrapping;
            // villaRoadImg.wrapT = THREE.RepeatWrapping;
            villaRoadImg.rotation = Math.PI*0.5;
            let road = createMesh(new THREE.PlaneGeometry(300,50),
                new THREE.MeshLambertMaterial({map:roadImg,side:THREE.DoubleSide}));
            road.position.set(x,y,z);
            road.rotation.set(Math.PI*0.5,0,0);
            return road
        }
    }
})();
let carPark = (function () {
    return {
        init:function () {
            let group = new THREE.Group();
            //房子右侧
            group.add(this.createCarPark(100,0.7,-120,Math.PI*0.5));
            group.add(this.createCarPark(100,0.7,-85,Math.PI*0.5));
            group.add(this.createCarPark(100,0.7,-50,Math.PI*0.5));
            group.add(this.createCarPark(100,0.7,-15,Math.PI*0.5));
            //房子后面
            group.add(this.createCarPark(30,0.7,-120,-Math.PI));
            group.add(this.createCarPark(-5,0.7,-120,-Math.PI));
            group.add(this.createCarPark(-40,0.7,-120,-Math.PI));
            group.position.set(0,0,0);

            scene.add(group)

        },
        createCarPark:function (x,y,z,rotationY) {
            let lineArr = new Array();
            lineArr.push(-20,0,-20);
            lineArr.push(-10,0,-20);
            lineArr.push(-15,0,-20);
            lineArr.push(-15,0,20);
            lineArr.push(15,0,20);
            lineArr.push(15,0,-20);
            lineArr.push(20,0,-20);
            lineArr.push(10,0,-20);

            let geo = new THREE.BufferGeometry();
            let mat = new THREE.LineBasicMaterial({lineWidth:100});

            geo.addAttribute('position',new THREE.Float32BufferAttribute(lineArr,3));
            geo.addAttribute('color',new THREE.Float32BufferAttribute('#fff',3));

            geo.computeBoundingSphere();

            let carPark = new THREE.Line(geo,mat);
            carPark.position.set(x,y,z);
            carPark.rotation.y = rotationY||0;

            return carPark

        }
    }
})();
let garden = (function () {
    return {
        init:function () {
            let group = new THREE.Group();

            //栅栏
            group.add(this.createFence(false,50,10,-100,5,30,fenceImg_front,4));
            group.add(this.createFence(false,50,10,-100,5,-70,fenceImg_front,4));
            group.add(this.createFence(true,100,10,-75,5,-20,fenceImg_side,8));
            group.add(this.createFence(true,100,10,-125,5,-20,fenceImg_side,8));

            //植物
            group.add(this.createRegion(-85,1,20));
            group.add(this.createRegion(-100,1,20));
            group.add(this.createRegion(-115,1,20));

            group.add(this.createRegion(-85,1,0));
            group.add(this.createRegion(-100,1,0));
            group.add(this.createRegion(-115,1,0));

            group.add(this.createRegion(-85, 1,-20));
            group.add(this.createRegion(-100,1,-20));
            group.add(this.createRegion(-115,1,-20));

            group.add(this.createRegion(-85, 1,-40));
            group.add(this.createRegion(-100,1,-40));
            group.add(this.createRegion(-115,1,-40));

            group.add(this.createRegion(-85, 1,-60));
            group.add(this.createRegion(-100,1,-60));
            group.add(this.createRegion(-115,1,-60));
            group.position.set(0,0,0);

            scene.add(group);

        },
        createFence:function (isSide,x,y,positionX,positionY,positionZ,img,u) {
            img.wrapS = THREE.RepeatWrapping = true;
            img.wrapT = THREE.RepeatWrapping = true;
            img.repeat.set(u,1);
            let fence = createMesh(new THREE.PlaneGeometry(x,y),
                new THREE.MeshLambertMaterial({color:'#fff',side:THREE.DoubleSide,map:img,transparent:true}));
            if (isSide){fence.rotation.y = Math.PI*0.5}
            fence.position.set(positionX,positionY,positionZ);
            return fence
        },
        createRegion:function (x,y,z) {
            let group = new THREE.Group();
            //边框
            let outside = createMesh(new THREE.BoxGeometry(13,2,13));
            let inside = createMesh(new THREE.BoxGeometry(10,2,10));

            outside = new ThreeBSP(outside);
            inside = new ThreeBSP(inside);
            let frame = outside.subtract(inside);
            frame = frame.toMesh();
            frame.material = new THREE.MeshLambertMaterial({color:'#c0c0c0'});

            //泥土
            let soil = createMesh(new THREE.ParametricGeometry(this.cusFun,3,3),
                new THREE.MeshPhongMaterial({
                    specular:'#000',
                    color:'#7B2800',
                    shininess:40,
                    metal:true,
                    side:THREE.DoubleSide,
                }));
            soil.position.set(0,0.5,0)

            //花草
            let points = [
                new THREE.Vector3(0,0,0),
                new THREE.Vector3(-0.3,1,0),
                new THREE.Vector3(0.1,2,0.3),
            ]
            let path = new THREE.CatmullRomCurve3(points);
            const rhizome = createMesh(new THREE.TubeGeometry(path,2,0.1,8),new THREE.MeshLambertMaterial({color:'#006400',side:THREE.DoubleSide,}));
            let petal = createMesh(new THREE.IcosahedronGeometry(0.5),new THREE.MeshLambertMaterial({color:'#FF0080',side:THREE.DoubleSide}));
            petal.scale.set(1,1.5,1);
            petal.position.set(0.1,2,0.3)
            let leaf = createMesh(new THREE.PlaneGeometry(1,1),new THREE.MeshLambertMaterial({side:THREE.DoubleSide,map:flowerLeaf,transparent:true}));
            leaf.position.set(-0.7,1,0);
            leaf.rotation.set(Math.PI*0.5,0,-Math.PI*0.25);

            group.add(frame);
            group.add(soil);
            group.add(rhizome);
            group.add(petal);
            group.add(leaf);
            group.position.set(x,y,z);

            return group
        },
        //参数化缓冲几何体的函数调用
        cusFun:function (u,v,target) {
            var x,y,z;
            x = 10 * (u - 0.5);
            z = 10 * (v - 0.5);
            y = 2 * Math.sin(x/2) * Math.cos(z);
            target.set(x,y,z);
        }
    }
})();
let yardLight = (function () {
    return {
        init:function () {
            let group = new THREE.Group();
            group.add(this.createYardLight(60,5,-90));
            group.add(this.createYardLight(-60,5,-90));
            scene.add(group);
        },
        createYardLight:function (x,y,z) {
            let group = new THREE.Group();

            let lightMaterial = new THREE.MeshLambertMaterial({color:'#5C3317'})
            let lightBottom = createMesh(new THREE.BoxGeometry(3,10,3),lightMaterial);
            lightBottom.position.set(0,0,0);

            let lightTop = createMesh(new THREE.BoxGeometry(3,3,3),lightMaterial);
            lightTop.position.set(0,20,0);

            let light = createMesh(new THREE.BoxGeometry(2.8,13.5,2.8),new THREE.MeshBasicMaterial({color:'#fff'}));
            light.position.set(0,11.75,0);

            let lightPillar1 = createMesh(new THREE.BoxGeometry(0.5,13.5,0.5),lightMaterial);
            lightPillar1.position.set(1.25,11.75,1.25);
            let lightPillar2 = createMesh(new THREE.BoxGeometry(0.5,13.5,0.5),lightMaterial);
            lightPillar2.position.set(1.25,11.75,-1.25);
            let lightPillar3 = createMesh(new THREE.BoxGeometry(0.5,13.5,0.5),lightMaterial);
            lightPillar3.position.set(-1.25,11.75,1.25);
            let lightPillar4 = createMesh(new THREE.BoxGeometry(0.5,13.5,0.5),lightMaterial);
            lightPillar4.position.set(-1.25,11.75,-1.25);

            // let _pointLight = new THREE.PointLight('#fff',0.1);

            group.add(lightBottom);
            group.add(lightTop);
            group.add(light);
            // group.add(_pointLight);
            group.add(lightPillar1);
            group.add(lightPillar2);
            group.add(lightPillar3);
            group.add(lightPillar4);

            group.position.set(x||0,y||0,z||0);

            return group;
        }
    }
})()

app.loadingProgress = 100;
