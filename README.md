### 安装方法

```

下载源码git clone https://github.com/laibin8848/starter-cli.git

执行 npm install
npm install 后会自动编译
执行 npm link 让starter-cli在全局可以，接下来你就可以在任意目录愉快地使用命令行啦

首先在github上创建一个公开的项目地址如https://github.com/用户名/仓库名.git
执行命令starter-cli config set user 你的用户名
执行命令starter-cli config set registry 你的仓库名
然后就可以在任意目录上创建你的项目了
starter-cli init project_name

创建好项目后 cd project_name

执行npm install，一个新的项目就可以运行了，网站DEMO： https://laibin8848.github.io/vue3admin

在项目根目录，还可以执行快捷操作，动态添加/移除一个新的模块
starter-cli page add blog
starter-cli page rm blog

详见 starter-cli -h

功能还在持续完善优化中。。。

```

### 你可以将这个脚手架变成自己的


```
git clone https://github.com/laibin8848/starter-cli.git 下载CLI源码

自定义你喜欢的一个脚手架名称，如haha-cli

修改package.json文件里的

"command": "haha-cli",
"bin": {
    "haha-cli": "./bin/www"
},

然后再npm publish到npmjs上，你自己的脚手架就做好了

首先在github上创建一个公开的项目地址如https://github.com/用户名/仓库名.git
执行命令haha-cli config set user 你的用户名
执行命令haha-cli config set registry 你的仓库名
然后就可以在任意目录上创建你的项目了
haha-cli init project_name

用这种方式已经生成一个在用cli，详见https://www.npmjs.com/package/yuey-cli

```

