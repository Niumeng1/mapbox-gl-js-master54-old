


    class Go3D{


    constructor (d3options){


        var dOptions = this.loadjs_css(d3options);
        return dOptions;


    };
    loadjs_css(d3options){
        //动态加载css，js
        var loadFile = (function () {
            var loadJS = function(url, callback){
                var script = document.createElement("script");
                script.type = "text/javascript";
                if(script.readyState){ // IE
                    script.onreadystatechange = function(){
                        if(script.readyState == "loaded" || script.readyState == "complete"){
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                }else{ // FF, Chrome, Opera, ...
                    script.onload = function(){
                        callback();
                    };
                }
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            }
            var loadCSS = function (args) {
                var cssfiles=new Array();
                cssfiles=cssfiles.concat(args);
                for (var i=0, len=cssfiles.length; i<len; i++) {
                    var css = document.createElement('link');
                    css.rel = "stylesheet";
                    css.href = cssfiles[i];
                    document.getElementsByTagName('head')[0].appendChild(css);
                }
            }

            return{
                loadJS:loadJS,
                loadCSS:loadCSS

            }
        })();
        let  map3dConfig = {  //配置文件
            cssFiles:[
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/gvi-gl/Build/Cesium/Widgets/widgets.css",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/css/font-awesome-4.7.0/css/font-awesome.min.css",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/css/gvitech_map3d.css",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/infobox/infobox.css"
            ],
            jsFiles:[
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/gvi-gl/Build/Cesium/Cesium.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/viewerCesiumNavigationMixin.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/infobox/infobox.min.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/QueryExtend.min.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/echarts/echarts.min.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/common/scale.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/common/3dtiles.js",
                "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/3dapi_new.js"
            ],
            tilesPath:[
                {url:"EzServer3D",name:"bjted",alias:"三维地形"},
                {url:"EzServer3D",name:"0309jza",alias:"三维瓦片"},
                {url:"EzServer3D",name:"0309jz01",alias:"三维瓦片"},
                {url:"EzServer3D",name:"0309jz02",alias:"三维瓦片"},
            ],
            terrainPath:{url:"http://172.24.254.222:9000",name:"bjted5"},
            wmtsPath:{	url:"http://172.24.254.222:9000",
                name:"3d",
                style:"default",
                tileMatrixSetID:"GoogleCRS84Quad",
                maximumLevel:19,
                format:"image/png"},
            zoom:{
                0:1579567,
                1:794483,
                2:397713,
                3:198898,
                4:99452,
                5:49725,
                6:24863,
                7:12432,
                8:6216,
                9:3108,
                10:1554,
                11:777,
                12:389
            },
            locateObj:{longitude:116.39072,latitude:39.91652,z:20000},//还原点位置
            CoorTrans_TwoToThree:"http://172.24.254.222:8088/bx_WebServices.asmx/CoorTrans_TwoToThree?jsoncallback=?",
            CoorTrans_ThreeToTwo:"http://172.24.254.222:8088/bx_WebServices.asmx/CoorTrans_ThreeToTwo?jsoncallback=?"
        };
        loadFile.loadCSS(map3dConfig.cssFiles);
        loadFile.loadJS("http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/gvi-gl/Build/Cesium/Cesium.js",function(){
            loadFile.loadJS("http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/viewerCesiumNavigationMixin.js",function(){
                loadFile.loadJS(  "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/infobox/infobox.min.js",function(){
                    loadFile.loadJS("http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/cesiumExtend/QueryExtend.min.js",function(){
                        loadFile.loadJS("http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/echarts/echarts.min.js",function(){
                            loadFile.loadJS( "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/common/scale.js",function(){
                                loadFile.loadJS( "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/common/3dtiles.js",function(){
                                    loadFile.loadJS( "http://172.24.254.94/TileServer/dmap3.0/GvitechWebGL_BJRMS/js/3dapi_new.js",function(){
                                        console.log(d3options);
                                        console.info(d3options);
                                        //d3options =d3options||{};
                                        var plugin,bili,postionX,postionY,zoom,bindClick;
                                        if(d3options){
                                            plugin = d3options['plugin']||"plugin",
                                                bili = d3options['bili']||undefined,
                                                postionX = d3options['postion'][0]||503544.40088939667,
                                                postionY = d3options['postion'][1]||313921.37168598175,
                                                zoom = d3options['zoom']||10;
                                            bindClick = d3options['bindClick']||false;
                                        }else{
                                            plugin = "plugin",
                                                bili = "bili",
                                                postionX =503544.40088939667,
                                                postionY = 313921.37168598175,
                                                zoom = 10;
                                            bindClick=false;
                                        }

                                        DCIMap3d.init(plugin);
                                        //定位，x:503544.40088939667，y：313921.37168598175，zoom：10
                                        DCIMap3d.setPostion(postionX,postionY).then(function (data) {
                                            if(data){
                                                //获取定位
                                                DCIMap3d.getPostion().then(function(data){
                                                    console.log(data);
                                                });
                                            }
                                        });
                                        //设置级别
                                        DCIMap3d.setZoom(zoom);
                                        //获取级别
                                        console.log("getZoom",DCIMap3d.getZoom());
                                        if(bindClick==true){
                                            this.go3DBindClick();
                                        }
                                        return DCIMap3d;
                                    });
                                });
                            });
                        });

                    })
                });
            });
        });
    }

}
module.exports = Go3D;
