var blogDetail = new Vue({
  el: "#blog_detail",
  data: {
    blogDetailList: {}
  },
  computed: {

  },
  created() {
    // 拿到当前文章的id
    let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : '';
    if (searchUrlParams == "") {
      return
    }
    let bid = -1;
    for (let i = 0; i < searchUrlParams.length ; i ++){
      if (searchUrlParams[i].split('=')[0] == "bid") {
        try{
          bid = parseInt (searchUrlParams[i].split('=')[1])
        }catch (e) {
          console.log(e)
        }
      }
    }
    axios({
      method: 'get',
      url: '/queryBlogById?bid=' + bid
    }).then(function (resp) {
      let result = resp.data.data;
      blogDetail.blogDetailList = result[0];
    }).catch(function (resp) {
      console.log(resp)
    })
  }
});

var sendComment = new Vue({
  el: "#send_comment",
  data: {
      vcode: '',
      rightCode: ''
  },
  computed: {
    sendComment() {
      return function () {
        // 拿到用户输入的验证码消息
        let code = document.getElementById("comment_code").value;
        if (code !== sendComment.rightCode) {
          alert("验证码错误");
          this.changeCode();
          return;
        }
        // 拿到当前博客的id，在上传评论时，定位到具体的博客
        let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : '';
        if (searchUrlParams == "") {
          return
        }
        let bid = -1;
        for (let i = 0; i < searchUrlParams.length ; i ++){
          if (searchUrlParams[i].split('=')[0] == "bid") {
            try{
              bid = parseInt (searchUrlParams[i].split('=')[1])
            }catch (e) {
              console.log(e)
            }
          }
        }

        let reply = document.getElementById('comment_reply').value;
        let content = document.getElementById('comment_content').value;
        let email = document.getElementById('comment_email').value;
        let name = document.getElementById('comment_name').value;
        let replyName = document.getElementById('comment_reply_name').value;

        // console.log('reply' +reply, 'content' + content,'email' + email,'name'+ name)

        axios({
          method: 'get',
          url: '/addComment?bid=' + bid + "&parent=" + reply + '&userName=' + name + '&email=' + email + "&content="
              + content + "&parentName=" + replyName
        }).then(function (resp){
          // console.log(resp)
          alert(resp.data.msg)
        })


      }
    },
    changeCode() {
      return function () {
        axios({
          method: 'get',
          url: '/queryRandomCode'
        }).then(function (resp) {
          sendComment.vcode = resp.data.data.data;
          sendComment.rightCode = resp.data.data.text ;
        }).catch(function (resp) {
          cosole.log(resp)
        })
      }
    }
  },
  created() {
    this.changeCode();
  }
});

var blogComments = new Vue({
  el: "#blog_comments",
  data: {
    total: 100,
    comments: [
      {
        name: 'panda',
        id: '1',
        ctime: '4567812',
        comments: '带回家啊分开来的',
        options: ''
      }
    ]
  },
  computed: {
    reply() {
      return function (commentId, userName) {
        document.getElementById("comment_reply").value = commentId;
        document.getElementById("comment_reply_name").value = userName;
        // 点击回复时，页面内跳转到评论区域
        location.href = '#send_comment';
      }
    },

  },
  created() {
    // 拿到当前博客的id，在上传评论时，定位到具体的博客
    let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : '';
    if (searchUrlParams == "") {
      return
    }
    let bid = -1;
    for (let i = 0; i < searchUrlParams.length ; i ++){
      if (searchUrlParams[i].split('=')[0] == "bid") {
        try{
          bid = parseInt (searchUrlParams[i].split('=')[1])
        }catch (e) {
          console.log(e)
        }
      }
    }
    axios({
      method: 'get',
      url: "/queryCommentsByBlogId?bid=" + bid
    }).then(function (resp) {
      blogComments.comments = resp.data.data;
      // console.log(blogComments.comments);
      for (let i = 0; i < blogComments.comments.length; i ++) {
        if (blogComments.comments[i].parent > -1) {
          blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name
        }
        blogComments.comments[i].date = new Date(blogComments.comments[i].ctime * 1000).toLocaleString()
      }
      console.log(blogComments.comments);
    });
    // 发送请求获得当前博客的留言总数
    axios({
      method: 'get',
      url: '/queryCommentsCountByBlogId?bid='+ bid
    }).then(function (resp) {
      blogComments.total = resp.data.data[0].count
    }).then(function (resp) {
      console.log('请求留言总数出错')
    })
  }
});
