### 想了解可以多看一下我
### 执行安装脚手架

npm install yuey-cli -g

也可以执行命令npx i yuey-cli init project_name直接创建项目

### 默认的下载模板

```
现在默认的下载模板是一个vite,vue3,element plus组合的面向B端的后台管理系统，你可以通过这个脚手架快速创建一个VUE后台管理系统，你同时也可以设置自己的模板地址，用于自己团队快速创建项目。

默认的管理后台管理还在完善中，敬请期待。。。

```

### 设置自己的下载模板

```

首先在github上创建一个公开的项目地址如https://github.com/用户名/仓库名.git
执行命令yuey-cli config set user 你的用户名
执行命令yuey-cli config set registry 你的仓库名
然后就可以在任意目录上创建你的项目了
yuey-cli init project_name

