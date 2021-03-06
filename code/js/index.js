$(
    function () {
        var btn=new Vue(
            {
                el:"#signPart",
                data:{
                    loading:false,
                    signed:false
                }
            }
        )
        checkSign();
        function checkSign()
        {
            $.ajax({
                type:"POST",
                dataType:"json",
                data:{},
                url:"interface/getStatus.php",
                success:function (res) {
                    if(res.content=="已经签到")
                    {
                        btn.signed=true;
                    }
                    else if(res.content=="没有签到")
                    {
                        btn.loading=false;
                        btn.signed=false;
                    }
                },
                error:function () {
                    alert("请求失败");
                }
            })
        }
        $("#sign").click(
            function () {
                if(!btn.signed)
                {
                    btn.loading=true;
                    $.ajax({
                        type:"POST",
                        dataType:"json",
                        data:{},
                        url:"interface/signPost.php",
                        success:function (res) {
                            if(res.content=="签到成功") {
                                btn.signed = true;
                                window.location.reload();
                            }else if(res.content=="已签到") {
                                btn.signed = true;
                                alert("已签到");
                            }else if(res.content=="非签到时段") {
                                btn.loading=false;
                                btn.signed=false;
                                alert("非签到时段！");
                            }else{
                                btn.loading=false;
                                btn.signed=false;
                                alert(res.content);
                            }

                        },
                        error:function () {
                            alert("请求失败");
                        }
                    })
                }
            }
        )
    }
)