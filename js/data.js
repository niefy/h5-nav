const DEFAULT_BOOKMARKS = [{
    category: '资讯',
    groups: [{
        groupName: '常用',
        list: [
            {href: "https://www.zhihu.com/", name: "知乎"},
            {href: "https://juejin.im/", name: "掘金"},
            {href: "https://m.weibo.cn/?jumpfrom=wapv4&tip=1", name: "微博"},
            {href: "https://xueqiu.com/#/", name: "雪球"},
            {href: "https://news.futunn.com/mobile/market", name: "富途要闻"},
            {href:"https://c.runoob.com/front-end/686",name:"随机密码生成器"},
            {href:"https://m.dxy.com/column",name:"丁香医生"},
            {href:"http://drugs.dxy.cn/index.htm",name:"丁香园用药助手"},
            {href:"https://m.douguo.com/?f=www",name:"豆果美食"},
            {href:"https://coolapk.com/apk/",name:"酷安网"},
            {href:"https://leetcode-cn.com/explore/",name:"LeetCode"},
            {href:"https://edition.cnn.com/world",name:"CNN新闻"},
            {href:"http://m.xinhuanet.com/",name:"新华网"},
            {href:"http://m.huanqiu.com/",name:"环球网"},
            {href:"http://note.youdao.com/wap/index.html#/home/recent",name:"有道云笔记"},
            {href:"https://h5.m.taobao.com/?sprefer=sypc00",name:"淘宝"},
            
        ]
    }, {
        groupName: 'IT资讯',
        list: [
            {href: "http://www.cnbeta.com/", name: "cnBeta"},
            {href: "http://m.qdaily.com/", name: "好奇心日报"},
            {href: "http://www.ifanr.com/", name: "爱范儿"},
            {href: "http://36kr.com/", name: "36 氪"},
            {href: "http://www.geekpark.net/", name: "极客公园"},
            {href: "https://www.huxiu.com/", name: "虎嗅网"},
            {href: "http://www.leiphone.com/", name: "雷锋网"},
            {href: "http://tech.sina.com.cn/", name: "新浪科技"},
            {href: "http://tech.qq.com/", name: "腾讯科技"},
            {href: "http://tech.ifeng.com/", name: "凤凰科技"},
            {href: "http://www.zol.com.cn/", name: "中关村在线"},
            {href: "http://news.mydrivers.com/", name: "驱动之家"},
            {href: "http://www.ithome.com/", name: "IT之家"},
            {href: "http://www.tmtpost.com/", name: "钛媒体"},
            {href: "http://www.cnetnews.com.cn/", name: "CNET科技资讯"},
            {href: "http://www.iheima.com/", name: "i黑马"},
            {href: "http://www.pingwest.com/", name: "品玩"},
            {href: "https://madbrief.com/", name: "疯狂简报"}
        ]
    }]
},{
    category: '学习',
    groups: [{
        groupName: 'IT',
        list: [
            {href:"http://study.163.com/",name:"网易云课堂"},
            {href:"http://www.imooc.com/",name:"慕课网"},
            {href:"http://www.ycku.com/",name:"瓢城Web俱乐部"},
            {href:"http://doyoudo.com",name:"doyoudo"},
            {href:"http://www.icourse163.org/",name:"中国大学MOOC"},
            {href:"https://www.shiyanlou.com/courses/",name:"实验楼"},
            {href:"https://ke.qq.com/",name:"腾讯课堂"},
            {href:"http://open.163.com/",name:"网易公开课"},
            {href:"http://www.jisuanke.com/",name:"计蒜客"},
            {href:"http://mooc.guokr.com/",name:"MOOC学院"},
            {href:"http://www.51zxw.net/",name:"我要自学网"},
            {href:"http://www.duobei.com/",name:"多贝"},
            {href:"https://www.coursera.org/",name:"Coursera"},
            {href:"http://www.icourses.cn/home/",name:"爱课程"},
            {href:"http://oeasy.org/",name:"Oeasy系列"},
            {href:"http://www.ibeifeng.com/",name:"北风网"},
            {href:"http://www.howzhi.com/",name:"好知网"},
            {href:"http://www.wanmen.org/",name:"万门大学"},
            {href:"http://www.yun.lu/",name:"云路课堂"},
            {href:"http://www.haoxue.com/",name:"好学网"},
            {href:"http://www.gogoup.com/course/list",name:"高高手"}
        ]
    }, {
        groupName: '教育学习',
        list: [
            {href:"http://www.1nami.com/",name:"1纳米学习导航"},
            {href:"http://kbs.cnki.net/",name:"学术网站大全"},
            {href:"http://123.paomianba.com/",name:"泡面吧"},
            {href:"http://dh.xdf.cn/",name:"新东方教育导航"},
            {href:"http://www.yywz123.com/",name:"英语学习大全"}
        ]
    },{
        groupName: '设计素材',
        list: [
            {href:"http://hao.uisdc.com/",name:"设计师网址导航1"},
            {href:"http://www.userinterface.com.cn/",name:"设计师网址导航2"},
            {href:"http://hao.xueui.cn/",name:"ui设计导航"},
            {href:"http://hao.shejidaren.com/",name:"设计导航"},
            {href:"http://www.niudana.com/",name:"牛大拿设计导航"},
            {href:"http://hao.psefan.com/",name:"饭团导航"}
        ]
    }]
},{
    category: '影视',
    groups: [{
        groupName: '最新电影',
        list: [
            {href:"http://ifkdy.com/",name:"疯狂电影搜索"},
            {href:"http://goudidiao.com/",name:"vip视频解析"},
            {href:"http://xlyy100.com/",name:"降龙影院"},
            {href:"http://www.pniao.com/",name:"胖鸟电影"},
            {href:"http://www.xunyingwang.com/",name:"迅影网"},
            {href:"http://neets.cc/",name:"neets"},
            {href:"http://www.dygod.net/",name:"电影天堂"},
            {href:"http://www.bd-film.com/",name:"BD影视"},
            {href:"https://www.lsjdyw.net/",name:"老司机电影网"},
            {href:"http://www.66ys.tv/",name:"66影视"},
            {href:"http://www.ck180.net/",name:"CK电影部落"},
            {href:"http://www.loldytt.com/",name:"LOL电影天堂"},
            {href:"http://qukantv.net/",name:"去看TV网"},
            {href:"http://www.zhuimj.cn/",name:"追美剧网"},
            {href:"http://www.lbldy.com/",name:"龙部落"},
            {href:"http://www.dygang.net/",name:"电影港"},
            {href:"http://www.piaohua.com/",name:"飘花电影"},
            {href:"http://www.xiaohx.net/",name:"小浣熊"},
            {href:"http://www.yugaopian.cn/",name:"预告片世界"},
            {href:"http://www.kankanwu.com/",name:"看看屋"},
        ]
    }]
},{
    category: '工具',
    groups: [{
        groupName: '便携APP',
        list: [
            {href:"https://c.runoob.com/front-end/686",name:"密码生成"},
            {href:"http://www.wandoujia.com/award",name:"豌豆荚设计奖"},
            {href:"http://app.mi.com/subjectList",name:"小米专题"},
            {href:"http://www.anzhi.com/subjects_1.html",name:"安智专题"},
            {href:"http://news.d.cn/special.html",name:"当乐手游专题"},
            {href:"http://apk.gfan.com/topics-1.shtml",name:"机锋精选专题"},
            {href:"http://www.appchina.com/column_list/1",name:"汇说专栏"},
            {href:"http://zuimeia.com/",name:"最美应用"},
            {href:"http://bbs.zhiyoo.com/",name:"智友论坛"},
            {href:"https://forum.xda-developers.com/",name:"XDA社区"},
            {href:"https://sspai.com/",name:"少数派"},
            {href:"http://www.appinn.com/",name:"小众软件"},
            {href:"http://www.appnz.com/",name:"爱屁屁"},
            {href:"http://pinapps.in/",name:"Pinapps"},
            {href:"http://appdp.com/",name:"APP每日推送"},
            {href:"http://app.dgtle.com/",name:"数字尾巴"},
            {href:"http://www.qdaily.com/tags/1288.html",name:"好奇心日报"},
            {href:"http://next.36kr.com/posts",name:"NEXT"},
            {href:"http://www.wooaii.com/",name:"我爱玩应用"}
        ]
    }, {
        groupName: '网盘搜索',
        list: [
            {href:"http://www.quzhuanpan.com/",name:"去转盘网"},
            {href:"https://www.panc.cc/",name:"胖次搜索"},
            {href:"https://www.ttyunsou.com/",name:"天天云搜"},
            {href:"http://wangpan007.com/",name:"网盘007"},
            {href:"http://www.tuoniao.me/",name:"鸵鸟搜索"},
            {href:"http://www.58wangpan.com/",name:"58网盘搜索"},
            {href:"http://www.biliworld.com/",name:"哔哩搜索"},
            {href:"http://www.panduoduo.net/",name:"盘多多"},
            {href:"http://www.wodepan.com/",name:"我的盘"},
            {href:"http://www.sobaidupan.com/",name:"搜百度盘"},
            {href:"http://www.tebaidu.com/",name:"特百度"},
            {href:"http://wangpan.renrensousuo.com/",name:"众人搜索"}
        ]
    },{
        groupName: '精致导航',
        list: [
            {href:"http://ilxdh.com/",name:"龙轩导航"},
            {href:"https://www.chaidu.com/",name:"柴都导航"},
            {href:"http://www.gitnavi.com/",name:"GitNavi"},
            {href:"http://byr.wiki/",name:"北邮人导航"},
            {href:"http://mwlmt.cc/d/",name:"五花八门导航"},
            {href:"http://gate.guokr.com/",name:"果壳任意门"},
            {href:"http://qianshan.co/",name:"千山导航"},
            {href:"http://www.xiaolvji.com/",name:"效率集"},
            {href:"http://www.miguyu.com/",name:"咪咕鱼导航"},
            {href:"http://hao.199it.com/",name:"大数据导航"},
            {href:"http://www.haoyonghaowan.com/",name:"好用好玩导航"},
            {href:"http://www.24kdh.com/",name:"24K导航"},
            {href:"http://www.lian81.com/",name:"超链网"},
            {href:"http://wxbbx.jh1z.com/",name:"微信百宝箱"}
        ]
    }]
}];
/**
 * 搜索引擎
 * @type {{}}
 */
const SEARCH_ENGINES={
    '百度':'https://www.baidu.com/s?wd=%s',
    '必应':'http://cn.bing.com/search?q=%s',
    '搜狗':'http://m.sogou.com/web/searchList.jsp?keyword=%s'
};