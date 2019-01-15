## BIC-静态页面移动端脚手架

### 设计稿要求

1. 图片 icon 最好是3倍图  
2. 设计稿为 375px

---
### 涵盖功能

适用于不使用前端自动化工具的项目，涵盖功能：
 1. 移动端适配，px单位自动转换rem
 2. 本地服务代理proxy，调试地址可跨域
 3. 雪碧图
 4. 静态资源压缩
 5. 资源路径替换
 6. ES6支持

---
### 使用细则

##### 1、px转换rem
根据gulp-px3rem 对px进行转换成rem 适配大部分机型

text.css
```
.demo{
    width: 150px;
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
}

```
转换成

```
.selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr="2"] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr="3"] .selector {
    height: 96px;
    font-size: 42px;
}


```

<table>
        <tr>
            <th>转换参数</th>
            <th>含义</th>
        </tr>
        <tr>
            <th>no</th>
            <th>不转化</th>
        </tr>
        <tr>
            <th>px</th>
            <th>3dpr情况</th>
        </tr>
</table>

**注意: Chrome最小12px 11px转换rem的时候在ipone5下会发现字体无法转换 但是在手机上没有问题.**  
更多了解戳这里：<a href='https://www.npmjs.com/package/gulp-px3rem'>gulp-px3rem</a>

##### 2、雪碧图
将需要合并的图片放在image/sprite/目录中，本地服务开启后，会自动监控改目录下的变动，从而更新font目录下用于记录雪碧图样式的icon.css文件  
更多了解戳这里：<a href='https://www.cnblogs.com/yanxinhua/p/6816141.html'>css雪碧图</a>

##### 3、资源路径替换
```
resourcePath: { // 修改资源路径
  css: 'https://c.58cdn.com.cn/fanglearning/app',
  js: '',
  image: 'https://img.58cdn.com.cn/fanglearning/app'
},
```
在配置文件config/index.js中，可以配置打包时需要替换的资源路径

---
### 配置文件
```
{
   port : 9091,  // 本地服务端口
   host : '',  //本地服务地址
   srcPath : path.join(__dirname, '../src'),
   uglifyMap: { //静态资源是否压缩
     css: false,
     js: false
   },
   resourcePath: { // 资源路径替换
     css: 'https://c.58cdn.com.cn/fanglearning/app',
     js: '',
     image: 'https://img.58cdn.com.cn/fanglearning/app'
   },
   proxy: {  // 代理配置
    '/api': {
        target: 'http://10.48.210.13:11083',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
  },
}
```

## 安装运行
##### 推荐
安装功能脚手架mis-cli,其中已经集成了改脚手架，如图所示

##### 克隆项目
```
git clone https://github.com/58MIS-FE/mis-h5-rem.git
```
