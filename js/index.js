$(function(){
	var kaiguan=true;
	$('.start').on('mousedown',false)
	$('.start').on('click',function(){
		if(kaiguan){
			addTable(makePoker())
			kaiguan=false;
		}
		$('.submit').on('click',function(){
		$('div').removeClass('pai')
		addTable(makePoker())
		})	
		var hour = 0, minute = 0, second = 0;
	    var t = 0;
	    function studyTime(){
        h=parseInt(t/60/60);
        m=parseInt(t/60%60);
        s=parseInt(t%60);
   	    h=h<10?'0'+h:h;
   	    m=h<10?'0'+m:m;
   	    s=s<10?'0'+s:s;
   	    t = t + 1;
   	    $('.shijian').text(h+':'+m+':'+s)             
	    }
	    setInterval(studyTime,1000); 
	 	studyTime()
	})
	function makePoker(){
		var poker=[];//格式为poke=[{number:2},{color:h}]
		var index=0;
		var tf={};
		while(poker.length!=52){   //当扑克牌够52张时，执行下面的。for不能去重复
			var colors=['h','c','s','d']//定义四种花色
			var n=Math.ceil(Math.random()*13)//随机的13张扑克牌
			var c=colors[Math.floor(Math.random()*4)]//随机的四种花色
			var v={number:n,color:c}

			if(!tf[n+c]){    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				tf[n+c]=true;
				poker.push(v)
			}
		}
		return poker;
	}
	



	function addTable(poker){
		var index=0;
		var dir={
			1:'A',
			2:2,
			3:3,
			4:4,
			5:5,
			6:6,
			7:7,
			8:8,
			9:9,
			10:'T',
			11:'J',
			12:'Q',
			13:'K'
		};
		for(var i=0;i<7;i++){//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			for(var j=0;j<i+1;j++){
				poke=poker[index];
				index++;
				$('<div>').addClass('pai').css('backgroundImage','url(./image/'+dir[poke.number]+''+poke.color+'.png)')
					.attr({'data-number':poke.number,'id':i+'_'+j})
					.delay(index*30)
					.animate({
						top:i*40,
						left:80+j*120+(6-i)*60
					})
					.appendTo('.scene')
			}		
		}

		for(;index<poker.length;index++){
			poke=poker[index];
				$('<div>').addClass('pai').css('backgroundImage','url(./image/'+dir[poke.number]+''+poke.color+'.png)')
					.attr('data-number',poke.number)
					.delay(index*30)
					.addClass('left')
					.animate({
						top:420,
						left:200
					})
					.appendTo('.scene')
			}
		
	}



		
		var zindex=0;
		$('.btnl').on('click',function(){
			zindex++;
			$('.left').last()
				.css('z-index',zindex)
				.animate({
					left:700
				})
				.queue(function(){
					$(this).removeClass('left').addClass('right').dequeue()
				})
					
		})
		var back=0;//!!!!!!左边还是右边

		$('.btnr').on('click',function(){
			back++;
			if(back>3){
				return;
			}
			if($('.left').length){
				return;
			}
			zindex++;
			$('.right').each(function(i,v){
				$(this)
				.delay(i*30)
				.animate({
					left:200
				})
				.queue(function(){
					$(this).css('z-index',0).removeClass('right').addClass('left').dequeue()
				})
				
			})		
		})

		//如果被压住，直接返回。如果是13  直接消除，函数返回
		//第一张，把这张储存。第二张，上次存储的现在点的这个拿出来判断


		function isCanMove(el){
			var a1=parseInt($(el).attr('id').split('_')[0])//字符串转化为整数
			var a2=parseInt($(el).attr('id').split('_')[1])
			if($('#'+(a1+1)+'_'+a2).length||$('#'+(a1+1)+'_'+(a2+1)).length){//只要有一张，就被压着，不能移动
				return false
			}else{
				return true
			}
		}


		var p=null;
		$('.scene').on('click','.pai',function(){
			
			if($(this).attr('id')&&!isCanMove(this)){//只针对上面的28张牌
				return;
			}
			$(this).css(
				'border','6px solid purple'
			)
			$(this).animate({
				top:'-=30'
			})
			var b=parseInt($(this).attr('data-number'))
			if(b==13){
				$(this).animate({
					top:100,
					left:1000
				}).queue(function(){
					$(this).detach().dequeue()
					p=null
				})
			}

			if(p){
				var b=parseInt($(this).attr('data-number'))
				var m=parseInt($(p).attr('data-number'))
				if(b+m==13){
					p.css('border','6px solid purple')
					p.add(this).animate({//!!!!1!sadd(this)
						top:100,
						left:1000
		
					}).queue(function(){
						$(this).detach().dequeue()
						p=null
					})
				}else{
					
					$(this).animate({
						top:'+=30'
					}).css('border',0)
					p.delay(400).animate({
						top:'+=30'
					})
					.css('border',0)
					p=null;
				}
			}else{
				p=$(this)//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
		})
})
