const cameraFollowMouseOption = {
    cameraX:[100,200],
    cameraZ:[50,300],
}

function animate(elapsed,delta) {
    if (elapsed <= COMMON.initDur){
        sunAnimation(elapsed,delta);
    }else {
        sunAnimation();
    }

    cameraFollowMouse()
}

//根据鼠标移动计算相机位置
function cameraFollowMouse(){
    //计算鼠标和屏幕的占比
    const xProportion = window.mousePositionX / window.innerWidth;
    const zProportion = window.mousePositionY / window.innerHeight;
    //计算范围差值
    const xDiff = cameraFollowMouseOption.cameraX[1] - cameraFollowMouseOption.cameraX[0];
    const zDiff = cameraFollowMouseOption.cameraX[1] - cameraFollowMouseOption.cameraX[0];
    //计算相机位置
    const x = cameraFollowMouseOption.cameraX[0] + ( xDiff * xProportion );
    const z = cameraFollowMouseOption.cameraZ[0] + ( zDiff * zProportion );
    //重置相机位置
    camera.position.set(x,80,z);
    camera.lookAt(scene.position);
}

function sunAnimation(elapsed,delta) {
    let initTimePercent = !elapsed?1:elapsed/COMMON.initDur;
    let timePercent = getTimePercent(true,true);
    //太阳--位置
    sun.position.x = Sun.position.minX + ((Math.abs(Sun.position.minX) + Math.abs(Sun.position.maxX) ) * timePercent) * initTimePercent;
    sun.position.y = Math.sin( Math.PI * (initTimePercent * timePercent) ) * (Sun.position.maxY - Sun.position.minY) + Sun.position.minY;

    //环境颜色，，，，太阳光强
    //判断帧所在时间点 处于 当前时间的进度
    let initTimePercent2 = timePercent*initTimePercent;
    if (initTimePercent2 <= Ambient.dayTimeInterval[0]) {
        //太阳升起=====****
        let percent = initTimePercent2/Ambient.dayTimeInterval[0];
        let rDiffer = (Ambient.dayColor.r - Ambient.nightColor.r)/255;
        let gDiffer = (Ambient.dayColor.g - Ambient.nightColor.g)/255;
        let bDiffer = (Ambient.dayColor.b - Ambient.nightColor.b)/255;
        //环境变亮
        ambientLight.color.r = Ambient.nightColor.r/255 + percent * rDiffer;
        ambientLight.color.g = Ambient.nightColor.g/255 + percent * gDiffer;
        ambientLight.color.b = Ambient.nightColor.b/255 + percent * bDiffer;
        //太阳变亮
        sun.intensity = Sun.intensity * percent;
        //街灯亮起
        // scene.getObjectByName('streetLamp_spotLight',true).intensity = streetLampConfig.spotLight.intensity;
        // scene.getObjectByName('streetLamp_pointLight',true).intensity = streetLampConfig.spotLight.intensity;
    }else if(initTimePercent2 >= Ambient.dayTimeInterval[1]){
        //太阳落山=====****
        let percent = (initTimePercent2 - Ambient.dayTimeInterval[1])/(1-Ambient.dayTimeInterval[1]);
        let rDiffer = (Ambient.dayColor.r - Ambient.nightColor.r)/255;
        let gDiffer = (Ambient.dayColor.g - Ambient.nightColor.g)/255;
        let bDiffer = (Ambient.dayColor.b - Ambient.nightColor.b)/255;
        //环境变暗
        ambientLight.color.r = Ambient.dayColor.r/255 - percent * rDiffer;
        ambientLight.color.g = Ambient.dayColor.g/255 - percent * gDiffer;
        ambientLight.color.b = Ambient.dayColor.b/255 - percent * bDiffer;
        //太阳变暗
        sun.intensity = Sun.intensity * (1-percent);
        // scene.getObjectByName('streetLamp_spotLight',true).intensity = streetLampConfig.spotLight.intensity;
        // scene.getObjectByName('streetLamp_pointLight',true).intensity = streetLampConfig.spotLight.intensity;
    }else{
        // scene.getObjectByName('streetLamp_spotLight',true).intensity = 0;
        // scene.getObjectByName('streetLamp_pointLight',true).intensity = 0;
    }
}

app.loadingProgress = 70
