const DEFAULT_BOOKMARKS = [
    {
        groupName: '常用',
        list: [
            { href: "https://www.yuque.com/dashboard/books", name: "语雀" },
            { href: "https://www.zhihu.com/", name: "知乎" },
            { href: "https://juejin.im/", name: "掘金" },
            { href: "https://m.weibo.cn/?jumpfrom=wapv4&tip=1", name: "微博" },
            { href: "https://m.dxy.com/", name: "丁香医生" },
            { href: "https://m.douguo.com/?f=www", name: "豆果美食" },
        ]
    }, {
        groupName: '资讯',
        list: [
            { href: "https://wallstreetcn.com/news/global", name: "华尔街见闻" },
            { href: "http://m.qdaily.com/", name: "好奇心日报" },
            { href: "http://36kr.com/", name: "36 氪" },
            { href: "http://www.geekpark.net/", name: "极客公园" },
            { href: "https://www.huxiu.com/", name: "虎嗅网" },
            { href: "https://m.8btc.com/", name: "8比特" },
            { href: "https://m.feixiaohaozh.info/news/flash.html", name: "非小号" },
            { href: "https://news.futunn.com/mobile/market", name: "富途要闻" },
            { href: "https://xueqiu.com/#/", name: "雪球" },
        ]
    }, {
        groupName: '最新电影',
        list: [
            { href: "https://www.bilibili.com/", name: "bilibili" },
            { href: "https://www.renren.pro/", name: "人人影视" },
            { href: "http://xijing.tv/", name: "XiJing" },
        ]
    }, {
        groupName: '自学',
        list: [
            { href: "http://study.163.com/", name: "网易云课堂" },
            { href: "http://www.imooc.com/", name: "慕课网" },
            { href: "http://www.icourse163.org/", name: "中国大学MOOC" },
            { href: "https://ke.qq.com/", name: "腾讯课堂" },
            { href: "http://open.163.com/", name: "网易公开课" },
            { href: "https://www.coursera.org/", name: "Coursera" },
            { href: "http://www.howzhi.com/", name: "好知网" },
            { href: "https://leetcode-cn.com/explore/", name: "LeetCode" },
            { href: "https://www.yixi.tv/wx/h5/#/speech", name: "一席" },
        ]
    }, {
        groupName: '设计素材',
        list: [
            { href: "http://hao.uisdc.com/", name: "优设导航" },
            { href: "http://hao.shejidaren.com/", name: "设计导航" },
            { href: "http://www.niudana.com/", name: "牛大拿设计导航" },
            { href: "http://hao.psefan.com/", name: "饭团导航" }
        ]
    }, {
        groupName: '资源搜索',
        list: [
            { href: "https://www.nmme.cc/", name: "橘子盘搜" },
            { href: "https://www.panc.cc/", name: "胖次搜索" },
            { href: "https://www.ttyunsou.com/", name: "天天云搜" },
            { href: "http://www.58wangpan.com/", name: "58网盘搜索" },
            { href: "http://m.rufengso.net/", name: "如风搜" },
        ]
    }, {
        groupName: '精致导航',
        list: [
            { href: "http://m.ilxdh.com/", name: "龙轩导航" },
            { href: "http://gate.guokr.com/", name: "果壳任意门" },
            { href: "http://www.xiaolvji.com/", name: "效率集" },
            { href: "http://hao.199it.com/", name: "199IT大数据导航" }
        ]
    }, {
        groupName: '在线工具',
        list: [
            { href: "https://coolapk.com/apk/", name: "酷安网" },
            { href: "https://c.runoob.com/front-end/686", name: "随机密码生成器" },
            { href: "https://c.runoob.com/", name: "菜鸟工具" },
        ]
    }
];
/**
 * 搜索引擎
 * @type {{}}
 */
const SEARCH_ENGINES = [
    {
        "name": "百度",
        "url": "https://www.baidu.com/s?wd=%s"
    }, {
        "name": "必应",
        "url": "http://cn.bing.com/search?q=%s"
    }, {
        "name": "搜狗",
        "url": "http://m.sogou.com/web/searchList.jsp?keyword=%s"
    }, {
        "name": "知乎",
        "url": "https://www.zhihu.com/search?type=content&q=%s"
    }
];