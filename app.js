const express = require('express');
require('./init/index')

const app = express();
// Express 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NODE:${PORT} 服务已启动`);
});
