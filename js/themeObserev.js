window.addEventListener("load",()=>{
    const themeIndexDom = document.querySelector(".index");
    //创建交叉观察器来观察每一个dom元素
    const ob = new IntersectionObserver(entries=>{
        //遍历所有元素，检查是否和视口相交
        for(const entry of entries){
            entry.target.classList.toggle("show",entry.isIntersecting);
            if(entry.target == themeIndexDom){
                if(entry.isIntersecting){
                    window.showThemeIndex = true;
                }else{
                    window.showThemeIndex = false;
                }
            }
        }
    },{
        root:document.querySelector(".theme"),
        threshold:0.3
    });

    //挂载观察器
    document.querySelectorAll(".theme li .item").forEach(el=>{
        ob.observe(el);
    })
})
