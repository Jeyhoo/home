// init
let loadingProgress = 0;

function setLoadingProgress(value){
    try{
        loadingProgress = value || loadingProgress;
        if(value >= 100){
            //加载完成
            value = 100;
            const loadingDom = document.querySelector(".loading");
            loadingDom.classList.add("finished");
            //点击开始
            document.querySelector(".start").addEventListener("click",()=>{
                start(loadingDom)
            })
        }
    }catch(e){
        console.log("[loading]存在问题",e)
    }
}

function getLoadingProgress(){
    return loadingProgress
}

//开始函数
function start(loadingDom){
    //隐藏loading
    loadingDom.classList.add("hide");
    //删除loading
    setTimeout(()=>{
        loadingDom.remove();
        setMouseTips();
    },1000)
}