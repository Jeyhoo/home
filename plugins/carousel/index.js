/**
 * 轮播图工具
 * @params {object} option 初始化配置项，不写则启动默认配置
 * 默认配置说明 
 * type [ "fade"(淡入淡出) | "stack"(堆叠) ] 轮播图模式
 * el 元素绑定
 * indexGroup 索引按钮组
 * prev 上一个
 * next 下一个
 * auto 自动轮播
 * speed 轮播速度
 */
class Carousel{
    constructor(option = {}){
        this.type = option.type || "fade";//轮播图模式

        this.index = 0; //当前索引

        this._el = document.getElementsByClassName("carousel-container"); //轮播图Dom节点
        this.el = option.el || this._el.length ? this._el[0] : null;
        this.els = this.el ? Array.from(this.el.children) : null;

        this._indexGroup = document.getElementsByClassName("carousel-indexGroup"); //索引按钮组
        this.indexGroup = option.indexGroup || this._indexGroup.length ? this._indexGroup[0] : null;
        this.indexGroupEls = null;

        this._btns = document.getElementsByClassName("carousel-btns"); //按钮：上一个，下一个
        this.prev = option.prev || this._btns.length ? this._btns[0] : null;
        this.next = option.next || this._btns.length ? this._btns[1] : null;

        this.length = this.el ? this.el.children.length : null;   //轮播图数据长度

        this.auto = typeof option.auto != "undefined" ? option.auto : true; //自动轮播

        this.speed = option.speed || 3000; //轮播速度

        this.timer = null;

        console.log("构造器完毕")
    }

    // 轮播图初始化
    init(){
        // 检查绑定元素
        if(!this.el){
            throw new Error("[Error] 轮播图初始化错误，检查不到轮播内容对应的元素，请手动指定")
        }

        // 初始化按钮组索引，并为索引按钮组绑定事件
        if(this.indexGroup){
            let indexGroupHtml = "";
            for(let i = 0 ; i < this.length ; i ++){
                console.log(i)
                indexGroupHtml += `<li></li>`
            }
            this.indexGroup.innerHTML = indexGroupHtml;
            this.indexGroupEls = Array.from(this.indexGroup.children);

            Array.from(this.indexGroup.children).map((item,index)=>{
                item.addEventListener("click",()=>{
                    this.index = index;
                    this.goto();
                    this.destory();
                    this.doAuto();
                })
            })
        }

        //模式初始化
        this.el.classList.add(this.type);
        switch(this.type){
            case "fade" :{
                
            }
            case "stack" :{

            }
            default :{}
        }

        // 先执行一次，然后启动轮播
        this.goto();
        if(this.auto){
            this.doAuto();
        }
    }

    // 轮播图销毁
    // 优化空间--检测到轮播图不存在自动销毁
    destory(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }else{
            throw new Error("[Error] 轮播图销毁失败，请先进行初始化")
        }
    }

    //轮播图定时器逻辑
    doAuto(){
        if(!this.timer){
            this.timer = setInterval(()=>{
                this.doNext();
            },this.speed)
        }else{
            throw new Error("[Error] 自动轮播开启失败，意外存在轮播器")
        }


        //劫持speed属性更新，注销原有定时器，并重置定时器
        Object.defineProperty(this,"speed",{
            //coding
            // get(){
            //     //
            // },
            // set(){
            //     //
            // }
        })
    }

    //下一张
    doNext(){
        if(this.index < this.length-1){
            this.index++;
        }else{
            this.index = 0;
        }
        this.goto();
    }

    //上一张
    doPrev(){
        if(this.index > 0){
            this.index--;
        }else{
            this.index = this.length-1;
        }
        this.goto();
    }

    //显示指定索引
    goto(){
        console.log(this.indexGroupEls)
        if(arguments.length){
            this.index = arguments[0];
        }
        // 重置所有的class后，高亮显示某一个class
        // 处理轮播内容
        this.els.map(item=>{
            item.classList.remove("active");
        })
        this.els[this.index].classList.add("active");

        // 处理索引按钮组
        if(this.indexGroupEls){
            this.indexGroupEls.map(item=>{
                item.classList.remove("active");
            })
            this.indexGroupEls[this.index].classList.add("active");
        }
    }
}