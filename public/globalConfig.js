const HOST_IND = 2, // 切换服务器
    HOST = [
      "http://47.111.12.25:8888/", // 正式服务器
      "http://192.168.43.59:8888/", //zhudaichao 德华
      "http://47.103.35.83:8888/", //zhudaichao 德华外网
      "http://47.103.35.83:8888/", //other server
      "http://172.16.159.119:9999/", //高级版测试服
      "http://www.binbind.com/", //高级版正式服(外)
      "http://www.binbind.com/aplusvip/", //高级版正式服(外)
      "https://www.aplusvip.apluswiki.com/", //高级版服(测试)
      "http://172.16.159.110:8080/", // 测试服务器
        // 德华
      "http://192.168.0.149:9999/aplusvip/", // 德华
      "http://192.168.0.149:8080/", // 德华2
      "http://192.168.0.161:9999/aplusvip/", // 蔡家
      "http://192.168.0.107:9999/aplusvip/", // 红
      "http://172.16.159.110:8080/",
      "/" // 代理
    ],
    HOST_CATALOG_API = "",// api目录
    HOST_CATALOG_IMG = "https://hzbjsaas.oss-cn-hangzhou.aliyuncs.com"; // 图片资源目录

if (HOST_IND !== 0) {
    console.log(
        "%c当前HOST在测试环境：" + HOST[HOST_IND],
        "background: #000;color:#ffff00;padding: 2px"
    );
}

export default {
    HOST: HOST[HOST_IND],
    HOST_API: HOST[HOST_IND]+HOST_CATALOG_API,
    HOST_IMG: HOST_CATALOG_IMG
};
