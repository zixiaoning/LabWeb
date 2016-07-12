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

        //
        function animate (offset) {
            if (offset == 0) {
                return;
            }
            animated = true;
            var time = 300;
            var inteval = 10;
            var speed = offset/(time/inteval);
            var left = parseInt(list.style.left) + offset;

            var go = function (){
                if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                    list.style.left = parseInt(list.style.left) + speed + 'px';
                    setTimeout(go, inteval);
                }
                else {
                    list.style.left = left + 'px';
                    if(left>0){
                        list.style.left = -1000 * len + 'px';
                    }
                    if(left<(-1000 * len)) {
                        list.style.left = '-1000px';
                    }
                    animated = false;
                }
            }
            go();
        }

        function showButton() {
            for (var i = 0; i < buttons.length ; i++) {
                if( buttons[i].className == 'on'){
                    buttons[i].className = '';
                    break;
                }
            }
            buttons[index - 1].className = 'on';
        }

        function play() {
            timer = setTimeout(function () {
                next.onclick();
                play();
            }, interval);
        }
        function stop() {
            clearTimeout(timer);
        }

        next.onclick = function () {
            if (animated) {
                return;
            }
            if (index == 4) {
                index = 1;
            }
            else {
                index += 1;
            }
            animate(-1000);
            showButton();
        }
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

        lunfan.onmouseover = stop;
        lunfan.onmouseout = play;

        play();

    }
