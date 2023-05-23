const grid=document.querySelector('.Area');
let speed=3;
let dir=1;
let dir1=-1;
var wrongFood=0;
var time=50;
var life=0;
var power_timer=0;
var last_time=0;
var seq_arr=[];
var seq_arr1=[];
var arr=[];
var arr1=[];
var powerupOn=0;
var poweraction=0;
var which;
var power;
var blink=1;
var sound=new Audio('sound.mp3');
var obst=0;
var x_pos;
var y_pos;
var x_pos1;
var y_pos1;
var px1=0;
var py1=0;
var py2=0;
var px2=0;
var direc=1;
var port=1;
var shield=0;
var shieldOn=0;
var shield_timer=0;
var shield_time=0
var posx=[];
var posy=[];
var obs_speed=0;




if(!localStorage.getItem('modeOn')){
    localStorage.setItem('modeOn','0');
}
var modeOn=localStorage.getItem('modeOn');
if(!localStorage.getItem('choice')){
    localStorage.setItem('choice','multiplayer');
}
var mode=localStorage.getItem('choice');

document.querySelector('#choice').innerHTML=mode;

openWelcome();
closeWelcome();
if(modeOn==1){
    document.querySelector('.keys').style.display='none';
    grid.style.height='70vmin';
    grid.style.width='70vmin';
}


let last={'x':0,'y':0};
let last1={'x':19,'y':19}
localStorage.setItem('score',0);
document.querySelector('#score').innerHTML=`SCORE : 0`;
document.querySelector('#timer').innerHTML=`Timer : 60`;

var words=['TRICHY','DELTA','LOVE','CATS','DOGS','HTML','CODE','TECH','TEAM','CARE','RATE']

const colour=['red','black','blue','green'];
var gamestatus=0;


if(window.screen.width<=800){
    console.log("hii")
    document.querySelector('.welcome').innerHTML='Touch anywhere to Play'
    addEventListener('touchstart',()=>{
        gamestatus=1;
        document.querySelector('.welcome').style.display='none';
    })

}else{
    document.querySelector('.welcome').innerHTML='Press Enter to Play'
    addEventListener('keyup',function(event){
        if(event.key=='Enter'){
        gamestatus=1;
        document.querySelector('.welcome').style.display='none';
        }
    })
}


if(!localStorage.getItem('hs')){
    localStorage.setItem('hs',0);
}
var hs=localStorage.getItem('hs');
document.querySelector('#Hiscore').innerHTML=`Highscore : ${hs}`;


if(!localStorage.getItem('high')){
    localStorage.setItem('high',0);
}
var high=localStorage.getItem('high');
document.querySelector('#Hiscore').innerHTML=`Highscore : ${high}`;


setInterval(() => {
    if(gamestatus==1){
        time--;
        power_timer++;
        obs_speed+=0.2;
        shield_timer++;
        speed+=0.05;
        
    }
    document.querySelector('#timer').innerHTML=`Timer : ${time}`;
},1000);

setInterval(()=>{
    if(gamestatus==1){
    obstacle()

}
},415+obs_speed)


var size=parseInt(prompt("Enter the size of grid (I recommend 20): ",20))
grid.style.gridTemplateColumns=`repeat(${size},1fr)`
grid.style.gridTemplateRows= `repeat(${size},1fr)`;
for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
        const cell=document.createElement('div');
        cell.dataset.x=j;
        cell.dataset.y=i;
        cell.classList.add('cell');
        grid.appendChild(cell);

    }
}



//varibles
let head={'x':0,'y':0};
let head1={'x':19,'y':19};
let segment=[head];
let segment1=[head1]

let lastframetime=0;

// fps
function fps(ctime){
  if(modeOn==0)  {
    let seg=segment.slice(1,segment.length);
    seg.forEach(s=>{
        if(segment[0].x==s.x && segment[0].y==s.y){
            life++;
        
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';

        if(powerupOn==1){
            powerupOn=0;
            if(document.querySelector('.shield')){
            document.querySelector('.shield').classList.remove('shield')}
            else{
                document.querySelector('.powerup').classList.remove('powerup')
            }
        }
        alert(`You ate yourself and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You ATE YOURself!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
            }
        })
    
    
    if((segment[0].x<0 || segment[0].x>(size-1))||(segment[0].y<0 || segment[0].y>(size-1))){
        life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';

        if(powerupOn==1){
            powerupOn=0;
            if(document.querySelector('.shield')){
            document.querySelector('.shield').classList.remove('shield')}
            else{
                document.querySelector('.powerup').classList.remove('powerup')
            }
        }

        alert(`You hit the wall and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You HIT the WALL !!GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;
    

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]


    }
    if(shield==0){
    segment.forEach(sn=>{
        if((sn.x==x_pos && sn.y==y_pos)||(sn.x==x_pos1 && sn.y==y_pos1)){
            life++;
                let li=document.querySelector(`.life${life}`);
                li.style.display='none';
                if(powerupOn==1){
                    powerupOn=0;
                    if(document.querySelector('.shield')){
                    document.querySelector('.shield').classList.remove('shield')}
                    else{
                        document.querySelector('.powerup').classList.remove('powerup')
                    }
                }
                alert(`OhhOhh You were hit by the spiky poisonous ball and lost a life !, Only ${3-life} lives`)
            if(life==3){
               if(!alert(`OhhOhh You were hit by the spiky poisonous ball !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
                window.location.reload();
                return;
            }}
            
            let p=document.querySelectorAll('.snake');
            p.forEach(s=>{
                s.classList.remove('snake')
            })
            dir=1;
            segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
        }
        
    })
}
    
    
if(wrongFood==1){
    wrongFood=0;
    life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';
        if(powerupOn==1){
            powerupOn=0;
            if(document.querySelector('.shield')){
            document.querySelector('.shield').classList.remove('shield')}
            else{
                document.querySelector('.powerup').classList.remove('powerup')
            }
        }
        alert(`You ate picked the wrong food and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You PICKED the wrong food !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;
    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
}}

if(modeOn==1){
    let seg=segment.slice(1,segment.length);
    let seg1=segment1.slice(1,segment1.length);
    seg.forEach(s=>{
        if(segment[0].x==s.x && segment[0].y==s.y){
            life++;
        
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';

        if(powerupOn==1){
            powerupOn=0;
            if(document.querySelector('.shield')){
            document.querySelector('.shield').classList.remove('shield')}
            else{
                document.querySelector('.powerup').classList.remove('powerup')
            }
        }
        alert(`Player1 ate themself and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You ATE YOURself!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    let q=document.querySelectorAll('.snake1')
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    q.forEach(s=>{
        s.classList.remove('snake1')
    })
    dir=1;
    dir1=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
    segment1=[{'x':1,'y':19},{'x':0,'y':19},{'x':0,'y':19}]
            }
        })
        seg1.forEach(s=>{
            if(segment1[0].x==s.x && segment1[0].y==s.y){
                life++;
            
            let li=document.querySelector(`.life${life}`);
            li.style.display='none';
    
            if(powerupOn==1){
                powerupOn=0;
                if(document.querySelector('.shield')){
                document.querySelector('.shield').classList.remove('shield')}
                else{
                    document.querySelector('.powerup').classList.remove('powerup')
                }
            }
            alert(`player2 ate themself and lost a life !, Only ${3-life} lives`)
        if(life==3){
           if(!alert(`OhhOhh You ATE YOURself!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
            window.location.reload();
            return;
        }}
        
        let p=document.querySelectorAll('.snake');
    let q=document.querySelectorAll('.snake1')
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    q.forEach(s=>{
        s.classList.remove('snake1')
    })
    dir=1;
    dir1=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
    segment1=[{'x':1,'y':19},{'x':0,'y':19},{'x':0,'y':19}]
                }
            })
    
    
    if((segment[0].x<0 || segment[0].x>(size-1)||segment1[0].x<0 || segment1[0].x>(size-1))||(segment[0].y<0 || segment[0].y>(size-1)||segment1[0].y<0 || segment1[0].y>(size-1))){
        life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';

        if(powerupOn==1){
            powerupOn=0;
            if(document.querySelector('.shield')){
            document.querySelector('.shield').classList.remove('shield')}
            else{
                document.querySelector('.powerup').classList.remove('powerup')
            }
        }

        alert(`You hit the wall and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You HIT the WALL !!GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    let p=document.querySelectorAll('.snake');
    let q=document.querySelectorAll('.snake1')
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    q.forEach(s=>{
        s.classList.remove('snake1')
    })
    dir=1;
    dir1=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
    segment1=[{'x':1,'y':19},{'x':0,'y':19},{'x':0,'y':19}]


    }
    if(shield==0){
    segment.forEach(sn=>{
        if((sn.x==x_pos && sn.y==y_pos)||(sn.x==x_pos1 && sn.y==y_pos1)){
            life++;
                let li=document.querySelector(`.life${life}`);
                li.style.display='none';
                if(powerupOn==1){
                    powerupOn=0;
                    if(document.querySelector('.shield')){
                    document.querySelector('.shield').classList.remove('shield')}
                    else{
                        document.querySelector('.powerup').classList.remove('powerup')
                    }
                }
                alert(`OhhOhh You were hit by the spiky poisonous ball and lost a life !, Only ${3-life} lives`)
            if(life==3){
               if(!alert(`OhhOhh You were hit by the spiky poisonous ball !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
                window.location.reload();
                return;
            }}
            let p=document.querySelectorAll('.snake');
            let q=document.querySelectorAll('.snake1')
            p.forEach(s=>{
                s.classList.remove('snake')
            })
            q.forEach(s=>{
                s.classList.remove('snake1')
            })
            dir=1;
            dir1=1;
        
            segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
            segment1=[{'x':1,'y':19},{'x':0,'y':19},{'x':0,'y':19}]
            
            
            
        }
        
    })
    segment1.forEach(sn=>{
        if((sn.x==x_pos && sn.y==y_pos)||(sn.x==x_pos1 && sn.y==y_pos1)){
            life++;
                let li=document.querySelector(`.life${life}`);
                li.style.display='none';
                if(powerupOn==1){
                    powerupOn=0;
                    if(document.querySelector('.shield')){
                    document.querySelector('.shield').classList.remove('shield')}
                    else{
                        document.querySelector('.powerup').classList.remove('powerup')
                    }
                }
                alert(`OhhOhh You were hit by the spiky poisonous ball and lost a life !, Only ${3-life} lives`)
            if(life==3){
               if(!alert(`OhhOhh You were hit by the spiky poisonous ball !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
                window.location.reload();
                return;
            }}
            let p=document.querySelectorAll('.snake');
    let q=document.querySelectorAll('.snake1')
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    q.forEach(s=>{
        s.classList.remove('snake1')
    })
    dir=1;
    dir1=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
    segment1=[{'x':1,'y':19},{'x':0,'y':19},{'x':0,'y':19}]
        
            
            
            
        }
        
    })

    

}
    
    
if(wrongFood==1){
    wrongFood=0;
    life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';
        if(powerupOn==1){
            powerupOn=0;
            if(document.querySelector('.shield')){
            document.querySelector('.shield').classList.remove('shield')}
            else{
                document.querySelector('.powerup').classList.remove('powerup')
            }
        }
        alert(`You ate picked the wrong food and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You PICKED the wrong food !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    let q=document.querySelectorAll('.snake1')
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    q.forEach(s=>{
        s.classList.remove('snake1')
    })
    dir=1;
    dir1=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
    segment1=[{'x':1,'y':19},{'x':0,'y':19},{'x':0,'y':19}]
}
}
if(time==0){
    document.querySelector('#timer').innerHTML=`Timer : 0`;
    if(!alert(`SORRY You have RUN OUT of TIME!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
     window.location.reload();
 }
 return;
}
    

    window.requestAnimationFrame(fps);
    
    if ((ctime-lastframetime)/1000 > 1/speed){
        lastframetime=ctime;
        if(gamestatus==1)
            main_logic();
    }
}


  




function main_logic(){
   
    
    portal();

    if(arr.length==0){
        port=0;
        posx=[];
        posy=[];
        let parent=document.querySelector('.foodBlocks');
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
        time=time+10;
        generateFood();
        //Incrementing body of snake
        last.x=segment[segment.length-1].x;
        last.y=segment[segment.length-1].y;
       segment.push(last)
        let add=grid.querySelector(`[data-x="${segment[segment.length-1].x}"][data-y="${segment[segment.length-1].y}"]`);
       segment.push(add);

       if(modeOn==1){
        last1.x=segment1[segment1.length-1].x;
        last1.y=segment1[segment1.length-1].y;
       segment1.push(last1)
        let add1=grid.querySelector(`[data-x="${segment1[segment1.length-1].x}"][data-y="${segment1[segment1.length-1].y}"]`);
       segment1.push(add1);

       }

       
    }
    
    else{
        
    let it=grid.querySelector(`[data-x="${segment[segment.length-1].x}"][data-y="${segment[segment.length-1].y}"]`);
    last=it;

    it.classList.remove('snake');

    if(modeOn==1){
        let it1=grid.querySelector(`[data-x="${segment1[segment1.length-1].x}"][data-y="${segment1[segment1.length-1].y}"]`);
    last1=it1;
    it1.classList.remove('snake1');

    }
    
}
    

    for(let i=segment.length-1;i>0;i--){
        segment[i].x=segment[i-1].x;
        segment[i].y=segment[i-1].y;}
    
    

    
    
    switch(dir){
        case 1:
            segment[0].x++;
            break;
        case -1:
            segment[0].x--;
            break;
        case 2:
            segment[0].y--;
            break;
        case -2:
            segment[0].y++;
            break;
    }
    
    
    segment.forEach((s,index)=>{
        let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        item.classList.add('snake');
        
    }
    )

    if(modeOn==1){
        for(let i=segment1.length-1;i>0;i--){
            segment1[i].x=segment1[i-1].x;
            segment1[i].y=segment1[i-1].y;}
        switch(dir1){
            case 1:
                segment1[0].x++;
                break;
            case -1:
                segment1[0].x--;
                break;
            case 2:
                segment1[0].y--;
                break;
            case -2:
                segment1[0].y++;
                break;
        }
        segment1.forEach((s,index)=>{
            let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
            item.classList.add('snake1');
            
        }
        )
    }
    
    powerup();
    shieldpower();
    
    checkScore(); 
    

}


fps()


updatingPosition();

function updatingPosition(){
    document.addEventListener("keydown", function(event) {
        if ((event.key == "ArrowLeft") && dir!=1){
           dir=-1;
        } else if ((event.key == "ArrowUp") && dir!=-2){
           dir=2;
        } else if ((event.key == "ArrowRight") && dir!=-1){
           dir=1;
        } else if ((event.key == "ArrowDown") && dir!=2){
           dir=-2;
        }
})

    document.addEventListener("keydown", function(event) {
        if ((event.key=='a')){
            if(modeOn==0 && dir!=1){
           dir=-1;}else if(modeOn==1&&dir1!=1){
            dir1=-1
           }
        } else if ((event.key=='w')){
            if(modeOn==0 && dir!=-2){
                dir=2;}else if(modeOn==1&&dir1!=-2){
                 dir1=2
                }
        } else if ((event.key=='d') ){
            if(modeOn==0 && dir!=-1){
                dir=1;}else if(modeOn==1&&dir1!=-1){
                 dir1=1
                }
        } else if ((event.key=='s') ){
            if(modeOn==0 && dir!=2){
                dir=-2;}else if(modeOn==1&&dir1!=2){
                 dir1=-2
                }
        }
}) 
}



// For Food
function generateFood(){
    let z=Math.floor(Math.random()*words.length);
    let x=words[z];

    arr=x.split('');
    
    arr.forEach(s=>{
        let q=document.createElement('div');
        q.innerHTML=s;
        q.dataset.value=s;
        console.log(q)
        document.querySelector('.foodBlocks').appendChild(q);
        let x1 = generate_posX(size);
        let y1 = 2+generate_posY(size-3);
        let letter = grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
        letter.innerHTML=s
        letter.classList.add('food')
        seq_arr.push(letter);
    })
    seq_arr[0].classList.add('next')
}

//Score Update
function checkScore(){
    seq_arr.forEach(l=>{
    if(modeOn==0&&l.dataset.x==segment[0].x&&l.dataset.y==segment[0].y){
        sound.play();
        if(l.innerHTML==arr[0]){
            let w=document.querySelector(`[data-value="${arr[0]}"]`);
            w.classList.add('letter');
            
            l.innerHTML='';
            l.classList.remove('next');
            l.classList.remove('food');
            arr.shift();
            
            seq_arr.shift();   
            seq_arr[0].classList.add('next');
            let sc=localStorage.getItem('score');
            sc++;
            document.querySelector('#score').innerHTML=`SCORE : ${sc}`;
            localStorage.setItem('score',sc); 
            
            if(sc>hs){
                localStorage.setItem('hs',sc);
                document.querySelector('#Hiscore').innerHTML=`Highscore : ${sc}`
            }else{
                localStorage.setItem('hs',hs);
            }

        }else{
            wrongFood=1;
        }}
    else if(modeOn==1&&(l.dataset.x==segment1[0].x&&l.dataset.y==segment1[0].y || l.dataset.x==segment[0].x&&l.dataset.y==segment[0].y)){
        sound.play();
        if(l.innerHTML==arr[0]){
            let w=document.querySelector(`[data-value="${arr[0]}"]`);
            w.classList.add('letter');
            
            l.innerHTML='';
            l.classList.remove('next');
            l.classList.remove('food');
            arr.shift();
            
            seq_arr.shift();   
            seq_arr[0].classList.add('next');
            let sc=localStorage.getItem('score');
            sc++;
            document.querySelector('#score').innerHTML=`SCORE : ${sc}`;
            localStorage.setItem('score',sc); 
            if(sc>high){
                localStorage.setItem('high',sc);
                document.querySelector('#Hiscore').innerHTML=`Highscore : ${sc}`
            }else{
                localStorage.setItem('high',high);
            }


        }else{
            wrongFood=1;
        }
    }
    })
}


    

window.addEventListener('keydown',function(event){
    let key=event.key;
    if(key=='Escape'){
        if(gamestatus==1){
            gamestatus=0
        }else{
            gamestatus=1;
        }
    }

}
)
//On-screen keyboard
document.querySelector('.up').onclick = function(){
    if(dir!=2 && dir!=-2){
        dir=2;
    }
}
document.querySelector('.right').onclick = function(){
    if(dir!=1 && dir!=-1){
        dir=1;
    }
}
document.querySelector('.down').onclick = function(){
    if(dir!=-2 && dir!=2){
        dir=-2;
    }
}
document.querySelector('.left').onclick = function(){
    if(dir!=-1 && dir!=1){
        dir=-1;
    }
}
document.querySelector('.pause').onclick = function(){
   
    let img=document.querySelector('.pause');
    if(gamestatus==1){
        img.setAttribute("src",'play.png')
        gamestatus=0;
    }else{
        img.setAttribute("src",'pause.png')
        gamestatus=1;
    }
}

//choices made
document.querySelector('#choice').onclick=function(){
    if(document.querySelector('#choice').innerHTML=='multiplayer'){
    localStorage.setItem('choice','singleplayer');
    localStorage.setItem('modeOn',1);
    window.location.reload();
    }else{
        localStorage.setItem('choice','multiplayer');
    localStorage.setItem('modeOn',0);
    window.location.reload();
    }
}

function powerup(){
    if(segment.length>=9 && power_timer-last_time>10 && powerupOn==0){
            let x1=Math.floor(Math.random()*(size-1));
            let y1=Math.floor(Math.random()*(size-1));
            power=grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
            powerupOn=1;
            which=1;
            power.classList.add('powerup');
            
            }
        
            

        
        else if(speed>=8 && power_timer-last_time>8 && powerupOn==0){
            let x1=Math.floor(Math.random()*(size-1));
            let y1=Math.floor(Math.random()*(size-1));
            power=grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
            powerupOn=1;
            which=0;
            power.classList.add('powerup');

        }
       
        else if(powerupOn==1){
            if(document.querySelector('.powerup')){
            let powerele=document.querySelector('.powerup');
            if(powerele.dataset.x==segment[0].x && powerele.dataset.y==segment[0].y){
                sound.play();
                powerupOn=0;
                last_time=power_timer;
                powerele.classList.remove('powerup');
                if(which==0){
                    speed-=6;
                }else if(which==1){
                    let cut=segment.slice(segment.length-6,segment.length);
                    segment.splice(segment.length-6,5);
                    cut.forEach(s=>{
                        grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`).classList.remove('snake');
                    })
                }
            }}
            }
    
    }

function shieldpower(){
    if(shield==1){
        if(shield_timer-shield_time>10){
            shield=0;
            shield_time=shield_timer;
        }
    }
    if(shield_timer-shield_time>20 && shieldOn==0){
        let x1=Math.floor(Math.random()*(size-1));
        let y1=Math.floor(Math.random()*(size-1));
        power=grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
        shieldOn=1
        power.classList.add('shield');}
    else if(shieldOn==1){
            let shieldpower=document.querySelector('.shield');
            
            if(shieldpower.dataset.x==segment[0].x && shieldpower.dataset.y==segment[0].y){
                shield=1;
                sound.play();
                shieldOn=0;
                shield_time=shield_timer;
                shieldpower.classList.remove('shield');
                
            }
        }


}

function openWelcome(){
    let wel=document.querySelector('.popup');
    wel.classList.add('activ');
    document.addEventListener('keydown',event=>{
        event.preventDefault();
        return false;
    })
    
   
}
function closeWelcome(){
    let close=document.querySelector('.close');
    close.addEventListener('click',()=>{
        document.querySelector('.popup').classList.remove('activ');
        document.querySelector('.back').style.opacity='1';
    })
}

function obstacle(){
    if(obst==0){
    obst=1;
    x_pos=Math.floor(3+Math.random()*(size-7));
    y_pos=Math.floor(3+Math.random()*(size-7));
    x_pos1=Math.floor(3+Math.random()*(size-7));
    y_pos1=Math.floor(3+Math.random()*(size-7));
    let obs=document.querySelector(`[data-x="${x_pos}"][data-y="${y_pos}"]`);
    let obs1=document.querySelector(`[data-x="${x_pos1}"][data-y="${y_pos1}"]`);
    obs.classList.add('obstacle'); 
    obs1.classList.add('obstacle');
    }else{
        if(direc==1){
            if(y_pos<19 && x_pos1<19){
            document.querySelector(`[data-x="${x_pos}"][data-y="${y_pos}"]`).classList.remove('obstacle');
            document.querySelector(`[data-x="${x_pos1}"][data-y="${y_pos1}"]`).classList.remove('obstacle');
            y_pos++;
            x_pos1++;
            document.querySelector(`[data-x="${x_pos}"][data-y="${y_pos}"]`).classList.add('obstacle');
            document.querySelector(`[data-x="${x_pos1}"][data-y="${y_pos1}"]`).classList.add('obstacle');
        }else{
            direc=0;
        }}
        else{ 
            if(y_pos==0 || x_pos1==0){
                direc=1;
            }else{
                document.querySelector(`[data-x="${x_pos}"][data-y="${y_pos}"]`).classList.remove('obstacle');
                document.querySelector(`[data-x="${x_pos1}"][data-y="${y_pos1}"]`).classList.remove('obstacle');
            y_pos--;
            x_pos1--;
            document.querySelector(`[data-x="${x_pos}"][data-y="${y_pos}"]`).classList.add('obstacle');
            document.querySelector(`[data-x="${x_pos1}"][data-y="${y_pos1}"]`).classList.add('obstacle');

            }
            

        }
        
    }
}




function portal(){
    if(port==0){
    port=1;
    let port1=document.querySelector(`[data-x="${px1}"][data-y="${py1}"]`);
    let port2=document.querySelector(`[data-x="${px2}"][data-y="${py2}"]`);
    if(port1.classList.contains('portal') && port2.classList.contains('portal')){
        port1.classList.remove('portal');
        port2.classList.remove('portal');
    }
    
    px1=Math.floor(Math.floor(size/2)-Math.random()*(Math.floor(size/2)-3));
    py1=Math.floor(Math.floor(size/2)-Math.random()*(Math.floor(size/2)-3));
    document.querySelector(`[data-x="${px1}"][data-y="${py1}"]`).classList.add('portal')
    px2=Math.floor(Math.floor(size/2)+Math.random()*(Math.floor(size/2)-3));
    py2=Math.floor(Math.floor(size/2)+Math.random()*(Math.floor(size/2)-3));
    document.querySelector(`[data-x="${px2}"][data-y="${py2}"]`).classList.add('portal')
}else{
    if((segment[0].x==px1 && segment[0].y==py1)){
        segment[0].x=px2;
        segment[0].y=py2;
        document.querySelector(`[data-x="${px1}"][data-y="${py1}"]`).classList.remove('snake');
    }else if(segment[0].x==px2 && segment[0].y==py2){
        segment[0].x=px1;
        segment[0].y=py1;
        document.querySelector(`[data-x="${px2}"][data-y="${py2}"]`).classList.remove('snake');
    }
    else if((segment1[0].x==px1 && segment1[0].y==py1)){
        segment1[0].x=px2;
        segment1[0].y=py2;
        document.querySelector(`[data-x="${px1}"][data-y="${py1}"]`).classList.remove('snake1');
    }else if(segment1[0].x==px2 && segment1[0].y==py2){
        segment1[0].x=px1;
        segment1[0].y=py1;
        document.querySelector(`[data-x="${px2}"][data-y="${py2}"]`).classList.remove('snake1');
    }


}

}

function generate_posX(s){
    let x=Math.floor(Math.random()*s);
    while(posx.includes(x)){
        x=Math.floor(Math.random()*s);
    }
    posx.push(x);
    return x;
}
function generate_posY(s){
    let y=Math.floor(Math.random()*s);
    while(posy.includes(y)){
        y=Math.floor(Math.random()*s);
    }
    posy.push(y)
    return y;
}
