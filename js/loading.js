// init
let loadingProgress = 0;

function setLoadingProgress(value){
    try{
        loadingProgress = value || loadingProgress;
        if(value >= 100){
            value = 100;
            const loadingDom = document.querySelector(".loading");
            loadingDom.classList.add("finished");
            document.querySelector(".start").addEventListener("click",()=>{
                loadingDom.classList.add("hide");
                setTimeout(()=>{
                    loadingDom.remove();
                    setMouseTips();
                },1000)
            })
        }
    }catch(e){
        console.log("[loading]存在问题",e)
    }
}

function getLoadingProgress(){
    return loadingProgress
}