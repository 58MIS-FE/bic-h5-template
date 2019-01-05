## BIC-静态页面移动端脚手架 

### 对设计要求 

1.图片 icon 最好是3倍图 
2.设计稿为 375px 

---
### 使用场景 

适用于不使用前端自动化工具的项目，将纯手工打造的以px来布局的css文件批量转换成rem布局的css。

---

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

##### 注意: Chrome最小12px 11px转换rem的时候在ipone5下会发现字体无法转换 但是在手机上没有问题. 
更多详情请了解 
<a href='https://www.npmjs.com/package/gulp-px3rem'>gulp-px3rem</a> 
<a href='https://www.cnblogs.com/yanxinhua/p/6816141.html'>css雪碧图</a>



## npm run 

```
    "build:css": "gulp px2rem",
    "build:img": "gulp spritesmith",
    "build": "gulp build",
    "dev": "gulp",
    "start": "gulp",
 
```




