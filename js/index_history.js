window.addEventListener("load",()=>{
    //加载地球
    const ROOT_PATH = "images/index_history"
    let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        globe: {
            baseTexture: ROOT_PATH + '/world.topo.bathy.200401.jpg',
            heightTexture: ROOT_PATH + '/bathymetry_bw_composite_4k.jpg',
            displacementScale: 0.2,
            // shading: 'realistic',
            // environment: ROOT_PATH + '/starfield.jpg',
            realisticMaterial: {
            // roughness: ROOT_PATH + '/data-1497599804873-H1SHkG-mZ.jpg',
            // metalness: ROOT_PATH + '/data-1497599800643-BJbHyGWQW.jpg',
            textureTiling: [8, 4]
            },
            postEffect: {
                enable: true
            },
            viewControl: {
                autoRotate: true,
                autoRotateDirection:"ccw",
                autoRotateSpeed:50,
                autoRotateAfterStill:0.5,
                distance:200
            },
            light: {
                main: {
                    intensity: 2,
                    shadow: true
                },
                ambientCubemap: {
                    // texture: ROOT_PATH + '/pisa.hdr',
                    exposure: 2,
                    diffuseIntensity: 2,
                    specularIntensity: 2
                }
            }
        }
    };
    
    echarts.init(document.getElementById("earth")).setOption(option);

    //加载轮播图
    let carousel = new Carousel({
        type:"stack"
    });
    carousel.init();
})