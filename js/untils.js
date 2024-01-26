function getTimePercent(isTest,isAuto) {
    let now = new Date();
    let HH = now.getHours();
    let MM = now.getMinutes()/60;
    let SS = now.getSeconds()/3600;
    // return (HH+MM+SS)/24
    if(isAuto){
        if(COMMON.sunAnimationAutoCount <= 1){
            COMMON.sunAnimationAutoCount += 0.001;
        }else{
            COMMON.sunAnimationAutoCount = 0;
        }
        return COMMON.sunAnimationAutoCount
    }
    if (isTest){
        return 0.15
    } else{
        return (HH+MM+SS)/24
    }
}

function getTime(type) {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let HH = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
    let MM = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    let SS = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return type.replace('yyyy',yyyy).replace('mm',mm).replace('dd',dd).replace('HH',HH).replace('MM',MM).replace('SS',SS)
}
console.log(app);


//设置鼠标滚动提示
function setMouseTips(isDispose){
    if(isDispose){
        clearInterval(window.tipsInterval)
        return
    }
    let index = 0;
    let mouseTipDom = document.querySelector(".mouse-box")
    if(!window.tipsInterval){
        window.tipsInterval = setInterval(()=>{
            if(window.showThemeIndex){
                if(index <= 7){
                    index ++;
                }else{
                    index = 0;
                    mouseTipDom.className = "mouse-box"
                }
                mouseTipDom.classList.add("i"+index);
            }else{
                index = 0;
                mouseTipDom.className = "mouse-box"
            }
        },2000)
    }else{

    }
}