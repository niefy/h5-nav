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
            {href:"https://m.douguo.com/?f=www",name:"豆果美食"},
            {href:"https://coolapk.com/apk/",name:"酷安网"},
            {href:"https://edition.cnn.com/world",name:"CNN新闻"},
            {href:"http://m.xinhuanet.com/",name:"新华网"},
            {href:"http://m.huanqiu.com/",name:"环球网"}
            
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
            {href: "http://www.iheima.com/", name: "i黑马"},
            {href: "http://www.pingwest.com/", name: "品玩"}
        ]
    },{
        groupName: '最新电影',
        list: [
            {href:"http://ifkdy.com/",name:"疯狂电影搜索"},
            {href:"http://www.ck180.net/",name:"CK电影部落"},
            {href:"http://qukantv.net/",name:"去看TV网"},
            {href:"http://www.zhuimj.cn/",name:"追美剧网"},
            {href:"http://m.kankanwu.com/",name:"看看屋"},
        ]
    }]
    
},{
    category: '学习',
    groups: [{
        groupName: '自学',
        list: [
            {href:"http://study.163.com/",name:"网易云课堂"},
            {href:"http://www.imooc.com/",name:"慕课网"},
            {href:"http://www.icourse163.org/",name:"中国大学MOOC"},
            {href:"https://ke.qq.com/",name:"腾讯课堂"},
            {href:"http://open.163.com/",name:"网易公开课"},
            {href:"https://www.coursera.org/",name:"Coursera"},
            {href:"http://www.howzhi.com/",name:"好知网"},
            {href:"https://leetcode-cn.com/explore/",name:"LeetCode"},
            {href:"http://cn.epubee.com/files.aspx",name:"EPUBEE"},
        ]
    },{
        groupName: '设计素材',
        list: [
            {href:"http://hao.uisdc.com/",name:"优设导航"},
            {href:"http://hao.shejidaren.com/",name:"设计导航"},
            {href:"http://www.niudana.com/",name:"牛大拿设计导航"},
            {href:"http://hao.psefan.com/",name:"饭团导航"}
        ]
    }]
},{
    category: '工具',
    groups: [{
        groupName: '网盘搜索',
        list: [
            {href:"http://www.quzhuanpan.com/",name:"去转盘网"},
            {href:"https://www.panc.cc/",name:"胖次搜索"},
            {href:"https://www.ttyunsou.com/",name:"天天云搜"},
            {href:"http://www.58wangpan.com/",name:"58网盘搜索"},
            {href:"http://m.rufengso.net/",name:"如风搜"}
        ]
    },{
        groupName: '精致导航',
        list: [
            {href:"http://ilxdh.com/",name:"龙轩导航"},
            {href:"http://gate.guokr.com/",name:"果壳任意门"},
            {href:"http://www.xiaolvji.com/",name:"效率集"},
            {href:"http://hao.199it.com/",name:"199IT大数据导航"}
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
    '搜狗':'http://m.sogou.com/web/searchList.jsp?keyword=%s',
    '知乎':'https://www.zhihu.com/search?type=content&q=%s'
};