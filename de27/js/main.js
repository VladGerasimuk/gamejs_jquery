// пока инпут не заполнен кнопка disabled
    function check() {
        if ($('#login').val() != '')     
        $('#submit').removeAttr('disabled');   
        else $('#submit').attr('disabled','disable');      
    }


let game = {
    pause: false,
    timer: 0,
    lifes: 3,
    login: '',
}

let background = {
    posx: 0,
}


$('#startGameForm').submit(function(event) {
    event.preventDefault();
    game.login = $('#login').val();
    localStorage.setItem('login',game.login);
    $('.playername').text(game.login);
    startgame();
});

function startgame() {
    $('#start').removeClass('visible');
    $('#game').addClass('visible');
    $('#gamelogic').addClass('visible');
    $('body').removeClass('animation'); 
    $('.coinscss').removeClass('animation');
    $('.coincss2').removeClass( 'animation');
    $('.coincss3').removeClass('animation');
    $('.meteorcss').removeClass('animation');
    $('.playercss').removeClass('animation');
    
    setInterval(function() {
        createCoin();
    },4000);

    setInterval(function() {
        createEnemy();
    },10000);

    setInterval(function() {
        if(!game.pause) {
            game.timer++;
        let minutes = Math.floor(game.timer/60);
        let secundes = game.timer - (minutes*60);
        
          if(minutes < 10) {
              minutes = "0" + minutes;
          }
          if(secundes < 10) {
              secundes = "0" + secundes
          }

          let timerValue = `${minutes}:${secundes}`
          $('.timer').text(timerValue);
        }
    },1000);

    const player = document.querySelector('.player');




    let keysbtn = [

    ];
    
    addEventListener('keyup', function(event) {
        keysbtn[event.which] = false
    });
    
    addEventListener('keydown', function(event) {
        keysbtn[event.which] = true;
        console.log(keysbtn);
        //вперед 68
        
            if(keysbtn[68] == true) {
            if(parseInt(player.style.left) >= parseInt($('body').css('width')) / 2.4
            ) {
            backgroundrender();}
             else {
                player.style.left = player.offsetLeft + 90 + "px";
            }       
        }
         
        //player.posx + parseInt($('.player').css('width')) < background.visiblex / 2
        //Вверх
         else if(keysbtn[87]) {
            player.style.top = player.offsetTop - 110 + "px";
            
        } else if(keysbtn[83]) {
            player.style.top = player.offsetTop + 110 + "px";
  
        } else if(keysbtn[32]) {
            //выстрел - space
            createBullet();
        }    else if(keysbtn[65]) {
            player.style.left = player.offsetLeft - 80  + "px"; }
    });

    function backgroundrender() {
        background.posx-=10;
        $('body').css('background-position-x', background.posx + 'px');
    }

    function createEnemy() {
        let enemy = document.createElement("div");
        enemy.className = "enemy";
        
        enemy.style.top = random(500, document.body.offsetHeight - 200) + "px";
        document.body.appendChild(enemy);
        let timerId = setInterval(function() {
    
            enemy.style.left = (enemy.offsetLeft - 140) + "px";
            if(enemy.offsetLeft + enemy.offsetWidth < 0) {
                enemy.remove();
                clearInterval(timerId);
                createEnemy();
                // отнимаем жизнь      
            }
        }, 100);
        enemy.dataset.timer = timerId;
    }

    //монетки leftC topC
    function createCoin() {
        let coin = document.createElement("div");
        coin.className = "coingame";
        coin.style.top = random(500, document.body.offsetHeight - 200) + "px";       
        coin.style.left = random(500, document.body.offsetWidth - 200) + "px";       
        document.body.appendChild(coin);
        let timerId = setInterval(function() {
            if(coin.offsetLeft + coin.offsetWidth < 0) {
                coin.remove();
                clearInterval(timerId);
                createCoin();
            }
        }, 100);
        coin.dataset.timer = timerId;
        
    }

    //рандом 
    function random(min, max) {
     let rand = min + Math.random() * (max + 1 - min);
     return Math.floor(rand);
    }


    function createBullet() {
        // Создаем блок для пули
        let bullet = document.createElement("div");
        // даем класс пули
        bullet.className = "bullet";
        // задаем начальное значение позиции пули
        bullet.style.top = player.offsetTop + 25 + "px";
        // добавляем пулю на игровое поле
        document.body.appendChild(bullet);
    
        // делаем движение пули
        bulletMove(bullet);
    }
  
    
    function bulletMove(bullet) {
        // создаем таймер для движения пули
        let timerId = setInterval(function() {
            // двигаем пулю вправо
            bullet.style.left = bullet.offsetLeft + 10 + "px";
            // проверяем попала ли пуля в мишень 
            isShot(bullet, timerId);
            
            if(bullet.offsetLeft > document.body.clientWidth) {
                bullet.remove();
                clearInterval(timerId);
            }
    
        }, 10);
    }
    
    function isShot(bullet, timer) {
        // Координаты верхней и нижней точки пули
        let topB = bullet.offsetTop;
        let bottomB = bullet.offsetTop + bullet.offsetHeight;
    
        let enemy = document.querySelector(".enemy");
        if(enemy != null) {
            // Координаты верхней и нижней точки противника
            let topE = enemy.offsetTop;
            let bottomE = enemy.offsetTop + enemy.offsetHeight;
    
            let leftB = bullet.offsetLeft;
            let leftE = enemy.offsetLeft;
    
            
            if(topB >= topE && topB <= bottomE && leftB >= leftE) {
                enemy.style.top = (topE - 100) + "px";
                enemy.style.left = (leftE - 100) + "px";
                clearInterval(enemy.dataset.timer);
                setTimeout(function() {
                    enemy.remove();
                    bullet.remove();
                    clearInterval(timer);
                }, 500)
            }
        }	
    
    }
    
   
    
    // Создание врага
    // <div class="enemy"></div>
    function createEnemy() {
        let enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.style.top = random(200, document.body.offsetHeight - 100) + "px";
        document.body.appendChild(enemy);
    
        let timerId = setInterval(function() {
    
            enemy.style.left = (enemy.offsetLeft - 10) + "px";
            if(enemy.offsetLeft + enemy.offsetWidth < 0) {
                enemy.remove();
                clearInterval(timerId);
                createEnemy();
                // отнимаем жизнь
               
            }
    
            
        }, 100);
        enemy.dataset.timer = timerId;
    }

}
