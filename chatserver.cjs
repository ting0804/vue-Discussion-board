const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

const userList = [];
const posts = [];

io.on('connection', (socket) => {
  // 使用者加入聊天室
  socket.on('JOIN_CHAT_ROOM', (user) => {
    console.log('User joined:', user);
    userList.push(user);
    io.emit('JOIN_CHAT_ROOM', user);
  });

  // 取得文章列表
  socket.on('GET_POSTS', () => {
    socket.emit('POSTS_LIST', posts);
  });

  // 新增文章
  socket.on('NEW_POST', (post) => {
  post.comments = post.comments || []; 
  posts.push(post);
  io.emit('NEW_POST', post);
});

  // 新增留言
  socket.on('NEW_COMMENT', ({ postId, comment }) => {
    const post = posts.find(p => p.id == postId);
    if (post) {
        comment.id = Date.now(); // 保底加 id
        post.comments.push(comment);
        io.emit('NEW_COMMENT', { postId, comment });
    }
    });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
