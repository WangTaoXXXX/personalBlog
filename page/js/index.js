var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: ""
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created () {
        // 请求数据给content赋值
      axios({
        method: 'get',
        url: '/queryEveryDay'
      }).then(function (result) {
          // 这里是重点： everyDay.content !== this.content
          everyDay.content = result.data.data[0].content;
      }).catch(function (result) {
          console.log("请求失败")
      })
    }
});

var articleList = new Vue({
    el: "#article_list",
    data: {
        pageNumList: [],
        page: 1,
        pageSize: 5,
        count: 100,
        articleList: [{
            title: "四联杀幽门螺杆菌第三天",
            content: "前段时间总是干呕嗳气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。首次医院门诊，医生说是可能是胃动力不足消化不良，给开 了点儿中成药，没要。问医生是否可以做一下钡餐或胃镜检查一下，于是预约了第二天的胃镜。第一次做胃镜，很顺利。胃镜报告显示 胃角C2慢性萎缩性胃炎。几天后活检的病理结果显示慢性萎缩性胃炎，中度萎缩，中度炎症，中度活动，中度肠上皮化生，HP++……好...",
            date: "2018-10-1",
            views: "210",
            tags: "test1 text2",
            id: "1",
            link: ""
        }]
    },
    computed: {
        jumpTo() {
          return function (page) {
            // this.page = page;
            this.getPage(page, this.pageSize)
          }
        },
        getPage() {
            return (page, pageSize) => {
              let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : '';
              let tag = '';
              for (let i = 0; i < searchUrlParams.length ; i ++){
                if (searchUrlParams[i].split('=')[0] == "tag") {
                  try{
                    tag = searchUrlParams[i].split('=')[1]
                  }catch (e) {
                    console.log(e)
                  }
                }
              }
              if (tag == '') { // 不是根据标签进行查询博客的情况
                axios({
                  method: 'get',
                  // 因为数据库的数据起始数是零，
                  url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                }).then(function (resp) {
                  let result = resp.data.data;
                  let list = [];
                  for (let i = 0; i < result.length; i ++) {
                    let temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.date = result[i].ctime;
                    temp.id = result[i].id;
                    temp.link = '/blog_detail.html?bid=' + result[i].id;
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    list.push(temp)
                  }
                  articleList.articleList = list;
                  articleList.page = page;
                }).catch(function (resp) {
                  console.log('请求出错')
                });

                // 请求博客的总页数
                axios({
                  method: 'get',
                  url: "/queryBlogCount",
                }).then(function (resp) {
                  articleList.count = resp.data.data[0].count;
                  articleList.generatePageTool;

                }).catch(function (resp) {
                  console.log(resp)
                });
              }else {
                axios({
                  method: 'get',
                  url: '/queryByTag?page=' + (page - 1)  + "&pageSize=" + pageSize + "&tag=" + tag
                }).then(function (resp) {
                  let result = resp.data.data;
                  let list = [];
                  for (let i = 0 ; i < result.length; i ++) {
                    let temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.date = result[i].ctime;
                    temp.id = result[i].id;
                    temp.link = '/blog_detail.html?bid=' + result[i].id;
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    list.push(temp)
                  }
                  articleList.articleList = list;
                  articleList.page = page;
                }).catch(function (resp) {
                  console.log(resp)
                })

                // 请求博客的总页数
                axios({
                  method: 'get',
                  url: "/queryByTagCount?tag=" + tag,
                }).then(function (resp) {
                  console.log(resp)
                  articleList.count = resp.data.data[0].count;
                  articleList.generatePageTool;

                }).catch(function (resp) {
                  console.log(resp)
                });
              }
            }
        },
        // 生成翻页工具
        generatePageTool() {
          let nowPage = this.page;
          let pageSize = this.pageSize;
          let totalCount = this.count;
          let result = [];
          result.push({text: "<<", page: 1});
          result.push({text: nowPage, page: nowPage});
          if (nowPage > 2) {
            result.push({text:nowPage - 2, page: nowPage -2})
          }

          if (nowPage > 1) {
            result.push({text: nowPage -1, page: nowPage -1})
          }

          if (nowPage + 1 <= (totalCount + pageSize -1)/pageSize ) {
            result.push({text: nowPage + 1, page: nowPage + 1});
          }

          if (nowPage + 2 <= (totalCount + pageSize -1)/pageSize ) {
            result.push({text: nowPage + 2, page: nowPage + 2});
          }

          result.push({text:'>>', page: Math.floor(parseInt( (totalCount + pageSize -1) / pageSize))});
          this.pageNumList = result;
          return result
        }

    },
    created() {
        this.getPage(this.page, this.pageSize)
    },
    methods: {
        getP(tag) {
          console.log(tag)
        }
    }
});
