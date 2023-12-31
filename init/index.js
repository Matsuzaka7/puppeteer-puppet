const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
let devProcess; // 保存子进程引用

// 检测./FrontApp文件夹是否包含node_modules
const frontAppPath = path.join(__dirname, '../FrontApp');
const nodeModulesPath = path.join(frontAppPath, 'node_modules');

// 设置环境变量，将项目内部的 .bin 目录添加到系统 PATH 中
process.env.PATH = `${process.env.PATH}:${path.join(__dirname, 'FrontApp', 'node_modules', '.bin')}`;

if (!fs.existsSync(nodeModulesPath)) {
  console.log('正在初始化项目...');
  const installProcess = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: frontAppPath });
  installProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  installProcess.stderr.on('data', (data) => {
    console.error(`install ERROR: ${data}`);
  });

  installProcess.on('close', (code) => {
    if (code === 0) {
      console.log('初始化完成');
      // 开启子线程执行npm run dev
      startDevServer();
    } else {
      console.error(`install ERROR: ${code}`);
      // 在这里处理错误，例如抛出异常或返回适当的状态码
      console.error('初始化失败，程序退出');
      process.exit(1); // 1 表示异常退出
    }
  });
} else {
  startDevServer();
}

function startDevServer() {
  console.log('正在执行启动前端');
  devProcess = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], { cwd: frontAppPath });
  devProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  devProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  devProcess.on('close', (code) => {
    if (code === 0) {
      console.log('dev 完成');
    } else {
      console.error(`dev 退出码 ${code}`);
      // 在这里处理错误，例如抛出异常或返回适当的状态码
      console.error('dev 失败，程序退出');
      process.exit(1); // 1 表示异常退出
    }
  });
}

// Graceful Shutdown
process.on('exit', () => {
  // 在这里关闭子进程
  if (devProcess) {
    devProcess.kill();
  }
});
