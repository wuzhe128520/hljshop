说明:
    index.html 家居馆
    vrhouse.html vr家装
    housedetail.html vr家装详情
    housecase.html  案例
    case-detail.html 案例详情
    image-before-download.html  图片确认下载页
    images.html                 图库
    imagedetail.html            图库详情
    imagescale.html             图片放大


1、在js代码中用到的class，不要写任何样式，类名统一以"js_class"的形式命名，只用来jQuery的选择，绑定事件等。
    css的选择器，一般用class，尽量少用id选择器，除非是公用的组件。
2、在用jQuery绑定事件的时候，事件名必须带上命名空间，如click事件:"click.login"