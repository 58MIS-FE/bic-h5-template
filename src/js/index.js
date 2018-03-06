$(function(){
    window.onscroll = scroll
    function scroll(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop > 70) {
            $('.top__wrap__footer').css({
                display:"block"
            })
        }
        if(scrollTop < 70) {
            $('.top__wrap__footer').css({
                display:"none"
            })
        }

    }
    $('.iframe_btn_success').click(function(){
        var ifm = document.getElementById("ifr");
        var subWeb = document.frames ? document.frames["ifm"].document : ifm.contentDocument;
        var ifmConHeight =  $(subWeb.body).height() + 5;
        $('.iframe_box').height(ifmConHeight)
        $('.iframe_btn').hide()
    })


    //分享连接初始化
    var shareList = (function(){
        var id  = $('#id').val()
        var baseUrl = 'http://10.252.51.171:8888'
        return {
            init:function(){
                var data = {"code":"1","msg":"操作成功","ctime":1519986414059,"ciphertext":1,"data":{"id":"178157721524789248","categoryId":10010,"categoryIdFormat":null,"categoryName":null,"type":3,"title":"话证明你在认真工作","cover":"http://testv1.wos.58dns.org/kmLHgFeDcBkmk/meishi/1@3x.png","summary":"你有没有认真工作一句话就能知道，来吧！不要羞涩！看看你是不是再认真工作！","infoPublisher":"托尔斯泰","infoContent":"测试正文","activityStartTime":null,"activityEndTime":null,"linkUrl":"/h5tac/info/id?id=178157721524789248","sendRange":3,"allowShared":1,"publishState":0,"readedNum":522,"readedNumSimple":"522","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":2,"headSortNumber":7,"saleSortNumber":9,"createdTime":"2017-06-23 15:48:11","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":[{"id":"969156666924752896","categoryId":930000016821477379,"categoryIdFormat":null,"categoryName":null,"type":1,"title":"test","cover":"","summary":"testtesttesttesttest","infoPublisher":"","infoContent":"","activityStartTime":null,"activityEndTime":null,"linkUrl":"","sendRange":3,"allowShared":1,"publishState":0,"readedNum":470,"readedNumSimple":"470","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2018-03-01 18:27:00","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"969156596401725440","categoryId":930000016821477379,"categoryIdFormat":null,"categoryName":null,"type":1,"title":"test","cover":"","summary":"testtesttesttesttest","infoPublisher":"","infoContent":"","activityStartTime":null,"activityEndTime":null,"linkUrl":"","sendRange":3,"allowShared":1,"publishState":0,"readedNum":425,"readedNumSimple":"425","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2018-03-01 18:26:43","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"969156530173665280","categoryId":930000016821477379,"categoryIdFormat":null,"categoryName":null,"type":1,"title":"test","cover":"","summary":"testtesttesttesttest","infoPublisher":"","infoContent":"","activityStartTime":null,"activityEndTime":null,"linkUrl":"","sendRange":3,"allowShared":1,"publishState":0,"readedNum":133,"readedNumSimple":"133","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2018-03-01 18:26:28","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"969156361331957760","categoryId":930000016821477379,"categoryIdFormat":null,"categoryName":null,"type":1,"title":"Test","cover":"","summary":"testtetst","infoPublisher":"","infoContent":"","activityStartTime":null,"activityEndTime":null,"linkUrl":"","sendRange":3,"allowShared":1,"publishState":0,"readedNum":148,"readedNumSimple":"148","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2018-03-01 18:25:47","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"969156295275864064","categoryId":930000016821477379,"categoryIdFormat":null,"categoryName":null,"type":1,"title":"Test","cover":"","summary":"testtetst","infoPublisher":"","infoContent":"","activityStartTime":null,"activityEndTime":null,"linkUrl":"","sendRange":3,"allowShared":1,"publishState":0,"readedNum":217,"readedNumSimple":"217","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2018-03-01 18:25:32","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null}],"guessList":[{"id":"946315907544670208","categoryId":10010,"categoryIdFormat":null,"categoryName":null,"type":3,"title":"测试测试测试测试","cover":"","summary":"测试测试测试测试测试测试测试","infoPublisher":"测试测试测试","infoContent":"<p><img src=\"https://pic1.58cdn.com.cn/nowater/mis/n_v2a96e630939e945f090af25173747cd0c.png\"></p><p><br></p>","activityStartTime":null,"activityEndTime":null,"linkUrl":"/h5tac/info/id?id=946315907544670208","sendRange":3,"allowShared":1,"publishState":0,"readedNum":350,"readedNumSimple":"350","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2017-12-28 17:45:59","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"946308803769425920","categoryId":10010,"categoryIdFormat":null,"categoryName":null,"type":3,"title":"新员工入职","cover":"","summary":"1234444444444444","infoPublisher":"123","infoContent":"<p><img style=\"max-width:100%;\" src=\"https://pic1.58cdn.com.cn/nowater/mis/n_v2fab4317eef334f0d979099f26806c48b.jpg\"></p><p><br></p>","activityStartTime":null,"activityEndTime":null,"linkUrl":"/h5tac/info/id?id=946308803769425920","sendRange":3,"allowShared":1,"publishState":0,"readedNum":112,"readedNumSimple":"112","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":1,"saleSortNumber":1,"createdTime":"2017-12-28 17:17:45","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"946308668108857344","categoryId":10010,"categoryIdFormat":null,"categoryName":null,"type":3,"title":"新员工入职","cover":"","summary":"1234444444444444","infoPublisher":"123","infoContent":"<p><img style=\"max-width:100%;\" src=\"https://pic1.58cdn.com.cn/nowater/mis/n_v2fab4317eef334f0d979099f26806c48b.jpg\"></p><p><br></p>","activityStartTime":null,"activityEndTime":null,"linkUrl":"/h5tac/info/id?id=946308668108857344","sendRange":3,"allowShared":1,"publishState":0,"readedNum":169,"readedNumSimple":"169","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":1,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2017-12-28 17:17:13","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"939068890753818624","categoryId":10010,"categoryIdFormat":null,"categoryName":null,"type":3,"title":"老姚喊你领取“取暖费”啦","cover":"http://wos.58cdn.com.cn/GhEdCbAZyGn/meishi01/微信图片_20171208174533.png","summary":"这个冬天暖暖的，老姚喊你领取“取暖费”啦","infoPublisher":"58人力资源部","infoContent":"<p><img style=\"max-width:100%;\" src=\"https://pic1.58cdn.com.cn/nowater/mis/n_v20a7f1b162ebe4ee7ab27a4df52381642.jpg\"></p><p><br></p>","activityStartTime":null,"activityEndTime":null,"linkUrl":"/h5tac/info/id?id=939068890753818624","sendRange":3,"allowShared":1,"publishState":0,"readedNum":236,"readedNumSimple":"236","commentNum":2,"commentNumSimple":"2","sortNumber":0,"isToped":2,"headSortNumber":4,"saleSortNumber":2,"createdTime":"2017-12-08 17:47:26","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null},{"id":"936431313609580544","categoryId":10010,"categoryIdFormat":null,"categoryName":null,"type":1,"title":"更好的沟通","cover":"http://wos.58cdn.com.cn/GhEdCbAZyGn/meishi01/topic_djd_1201.png","summary":"","infoPublisher":"","infoContent":"","activityStartTime":null,"activityEndTime":null,"linkUrl":"","sendRange":3,"allowShared":1,"publishState":0,"readedNum":185,"readedNumSimple":"185","commentNum":0,"commentNumSimple":"0","sortNumber":0,"isToped":2,"headSortNumber":0,"saleSortNumber":0,"createdTime":"2017-12-01 11:06:38","createdTimeSimple":null,"activityStatus":null,"comments":null,"recommendsList":null,"guessList":null}]},"extData":null},
                data = data.data,
                  // guessList = list(data.guessList),
                  // recommendsList = list(data.recommendsList)
                  guessList = list(data.guessList),
                  recommendsList = list(data.recommendsList)
                  $('.guess_List').html(guessList)
                  $('.recommends_List').html(recommendsList)
                $.ajax({
                    url: baseUrl + "/h5tac/topics/hot?id="+id,
                    methods:"GET",
                    data:{
                        categoryId:$('#categoryId').val(),
                        bspId:$('#bspId').val()
                    },
                    success:function(data){
                        if(data.code == '1'){
                              var data = data.data,
                                guessList = list(data.guessList),
                                recommendsList = list(data.recommendsList)
                                $('.guess_List').html(guessList)
                                $('.recommends_List').html(recommendsList)
                        }
                    }

                })
            }
        }
    })()
    shareList.init()

    //拼接list
    function list (data) {
        if(data.length > 0 ){
            var str = ''
            $.each(data,function(index,item){
             str+= `
                <li class="recommond__item">
                <div class="recommond__left">
                  <img src="${item.cover}" alt="" class='recommond__left__img'>
                </div>
                <div class="recommond__right">
                  <p class="recommond__right__title">${item.title}</p>
                  <p class="recommond__right__detail">
                    <span class="recommond__right__detail__span">${item.categoryName}</span>
                    <span class="recommond__right__detail__span">阅读 ${item.readedNum}</span>
                    <a href='' class="recommond__right__detail__application">打开应用</a>
                  </p>
                </div>
              </li>
                `
            })
            return str
        }
    }
});
