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