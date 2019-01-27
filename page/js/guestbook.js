var blogComments = new Vue({
  el: "#blog_comments",
  data: {
    total: 0,
    comments: [
      {
        name: '',
        id: '',
        ctime: '',
        comments: '',
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
    let bid = -2;
    axios({
      method: 'get',
      url: "/queryCommentsByBlogId?bid=" + bid
    }).then(function (resp) {
      // console.log(resp)
      blogComments.comments = resp.data.data;
      for (let i = 0; i < blogComments.comments.length; i ++) {
        if (blogComments.comments[i].parent > -1) {
          blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name
        }
      }
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

var sendComment = new Vue({
  el: "#send_comment",
  data: {
    vcode: '',
    rightCode: ''
  },
  computed: {
    sendComment() {
      return function () {
        console.log(11)
        // 拿到用户输入的验证码消息
        let code = document.getElementById("comment_code").value;
        if (code !== sendComment.rightCode) {
          alert("验证码错误");
          this.changeCode();
          return;
        }
        let bid = -2;

        let reply = document.getElementById('comment_reply').value;
        let content = document.getElementById('comment_content').value;
        let email = document.getElementById('comment_email').value;
        let name = document.getElementById('comment_name').value;
        let replyName = document.getElementById('comment_reply_name').value;


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
