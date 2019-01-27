var randomTags = new Vue({
    el: "#randomTags",
    data: {
        tags: ["asd","dfasfas","fadsfafawfds","afhewiuyfubsdfwfdaefasdf","safdasf","qefsa","fafe"]
    },
    computed: {
        randomColor() {
            return function (){
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb("+ red +","+ green + "," + blue + ")"
            }
        },
        randomSize: function() {
            return function () {
                var size = (Math.random()*20 + 12) + "px";
                return size
            }
        }
    },
    created() {
        axios({
          method: 'get',
          url: '/queryRandomTags'
        }).then(function (resp) {
          let result = [];
          for(let i = 0; i < resp.data.data.length; i ++) {
            result.push({
              text: resp.data.data[i].tag,
              link: '/?tag=' + resp.data.data[i].tag
            })
          }
          randomTags.tags = result
        }).catch(function (resp) {
          console.log(resp)
        })
    },
  methods: {
      getP(tags) {

      }
  }
});

var newHot = new Vue({
    el: "#new_hot",
    data: {
      hotList: [{
          title: "查看你的AWS服务器已使用流量",
          link: "http://www.baidu.com"
      }]
    },
    created() {
      axios({
        method: 'get',
        url: '/queryHotBlog'
      }).then(function (resp) {
        let result = [];
        for (let i = 0; i < resp.data.data.length; i ++) {
          let temp = {};
          temp.title = resp.data.data[i].title;
          temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
          result.push(temp)
        }
        newHot.hotList = result;
      }).catch(function (resp) {
        console.log(resp)
      })
    }
});

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: [{
            name: "这是用户名",
            date: "2018-10-10",
            comment: "是否还微风胡椒粉发的我"
        },{
            name: "这是用户名",
            date: "2018-10-10",
            comment: "是否还微风胡椒粉发的我"
        },{
            name: "这是用户名",
            date: "2018-10-10",
            comment: "是否还微风胡椒粉发的我"
        },{
            name: "这是用户名",
            date: "2018-10-10",
            comment: "是否还微风胡椒粉发的我"
        }]
    },
    created() {
      axios({
        method: 'get',
        url: '/queryNewComments'
      }).then(function (resp) {
        let result = [];
        for (let i = 0; i < resp.data.data.length; i ++) {
          let temp = {};
          temp.name = resp.data.data[i].user_name;
          temp.date = new Date(resp.data.data[i].ctime * 1000).toLocaleString();
          temp.comment = resp.data.data[i].comments;
          result.push(temp)
        }
        newComments.commentList = result

      })
    }

});
