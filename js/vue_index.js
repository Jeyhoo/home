const app = new Vue({
    el:'#app',
    data:{
        time:null,
        interval:null,
        themes:{
            list:[
                {
                    title:'纵横历史',
                    detail:'横纵历史与今日，跨越过去与未来。',
                    url:'../history/index.html',
                    img1:'./images/index/history1.png',
                    img2:'./images/index/history2.png',
                },
                {
                    title:'坦克守护者',
                    detail:'都市警察，惩恶扬善',
                    url:'../tank/index.html#/main',
                    img1:'./images/index/tank1.png',
                    img2:'./images/index/tank2.png',
                },
                {
                    title:'智能厨房',
                    detail:'今天吃点啥？',
                    img1:'./images/index/building.png',
                },
                
            ],
        }
    },
    computed:{
        hourDeg(){
            return 50 + 260 * getTimePercent()
        },
        isDayTime(){
            return 0.25 < getTimePercent() && getTimePercent() < 0.75
        }
    },
    mounted(){
        let that = this;

        that.interval = setInterval(function () {
            that.time = getTime('HH:MM:SS');
        },1000)

        setTimeout(()=>{
            setLoadingProgress(100)
        },3000)

    },
    methods:{

    },
    watch:{
        time(newValue,oldValue){

        },
    },
    beforeDestroy(){
        let that = this;
        clearInterval(that.interval)
    }
})

//