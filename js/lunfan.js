/**
 * Created by lenovo on 2016/7/12.
 */
window.onload = function () {
        //获取轮番页面的信息
        var lunfan = document.getElementById('lunfan');
        var list = document.getElementById('list');
        var buttons = document.getElementById('buttons').getElementsByTagName('span');
        var prev = document.getElementById('prev');
        var next = document.getElementById('next');
        var index = 1;
        var len = 4;
        var animated = false;
        var interval = 3000;
        var timer;

        //offset移动的距离
        function animate (offset) {
            if (offset == 0) {
                return;
            }
            animated = true;
            var time = 300;//时间300秒
            var inteval = 10;//越小移动的越慢
            var speed = offset/(time/inteval);//移动的速度
            var left = parseInt(list.style.left) + offset;//移动后距离左边的距离
            //定时移动过程
            var go = function (){
                if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                    list.style.left = parseInt(list.style.left) + speed + 'px';
                    setTimeout(go, inteval);
                }
                else {
                    list.style.left = left + 'px';
                    if(left>0){//left>0移动到右边
                        list.style.left = -1000 * len + 'px';
                    }
                    if(left<(-1000 * len)) {//图片翻到最左端
                        //list.style.left = '-1000px';
                        list.style.left = '0px';//
                    }
                    animated = false;
                }
            }
            go();
        }
        //on 圆点的样式
        function showButton() {
            for (var i = 0; i < buttons.length ; i++) {
                if( buttons[i].className == 'on'){
                    buttons[i].className = '';
                    break;
                }
            }
            buttons[index - 1].className = 'on';
        }
        //向右翻页 ，图片移动&圆点样式改变
        next.onclick = function () {
            if (animated) {
                return;
            }
            //记录对应的圆点的下表index
            if (index == 4) {
                index = 1;
            }
            else {
                index += 1;
            }
            animate(-1000);//图片移动
            showButton();//显示对应的圆点
        }
        //向左翻页 ，图片移动&圆点样式改变
        prev.onclick = function () {
            if (animated) {
                return;
            }
            if (index == 1) {
                index = 4;
            }
            else {
                index -= 1;
            }
            animate(1000);
            showButton();
        }
        //随机点击圆点，翻动页面，并显示圆点样式
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                if (animated) {
                    return;
                }
                if(this.className == 'on') {
                    return;
                }
                var myIndex = parseInt(this.getAttribute('index'));
                var offset = -1000 * (myIndex - index);

                animate(offset);
                index = myIndex;
                showButton();
            }
        }
        //鼠标影响页面翻动
         function play() {
             timer = setTimeout(function () {
                 next.onclick();
                 play();
             }, interval);
         }
         function stop() {
             clearTimeout(timer);
         }
         lunfan.onmouseover = stop;
         lunfan.onmouseout = play;
        play();

    }
