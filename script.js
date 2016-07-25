

$(document).ready(function(){
	
	//console.log("Ready");
		var currentBlock;
		currentBlock =generateBlock(); //Array "Block" will have the coordiante for the next block
		var speed = 500; //time between each block movement//
		var bufferTime = -2 // 3 Seconds between Start Game and Ready
		var stopped = false; //To see if the Block has reached its end state//
		var newBlock = true; //To see if it is a new Block//
		var width = 12;
		var height = 14;
		var boundaries = [0,width,0]; //captures the distance between the block and the left, right and bottom boundaries
		


		var gridFill = new Array(width);
		
		for(var i=0; i<width;i++){
		
			gridFill[i]=new Array(height);
			
		}//to capture what grids are filled
		
		for(var i=0;i<width;i++){
			
			for(var j=0;j<height;j++){
		
				gridFill[i][j] = null;			
			}
		}	
		console.log(gridFill[0][5]);
		
		createCells(width,height);
		
		$('#StartGame').click(function(){
			
			gameStart();
			});

	function createCells(wid,hei){
		
		$(".grid").css('height', hei*40+"px").css('width',wid*40+"px");
		
		for(var i=0;i<(wid*hei);i++){
				
				var j=Math.floor(i/12); //row number//
				$(".grid").append("<div class=\"cell\" id=\""+"grid"+i%12+"-"+j+"\"></div>"); //i%12 is the column number
		}
		
		$(".grid").children().addClass("cell").css("height",(40-6)+"px").css("width",(40-6)+"px");
		
		for(i=0;i<12;i++){
			var j=Math.floor(i/4); //row number//
			$(".preview").append("<div class=\"cell\" id=\""+"preview"+i%4+"-"+j+"\"></div>");
			
			$(".preview").children().addClass("cell").css("height",(40-6)+"px").css("width",(40-6)+"px");
	
		}
	}
	
	function generateBlock(){
	
		var Block = new Array(5);
		
	
		
		for(var i=0;i<Block.length-1;i++){
			
		Block[i]=new Array(2);
		
		};
	
		
		Block[0][0] = 0;
		Block[0][1] = 0; //Centre of each block
		
		var blockNo = Math.ceil(Math.random()*6);
		
		switch(blockNo){
		
			case 0: //Block "J"//
				Block[1][0]= 1;
				Block[1][1]= 0;
				Block[2][0] = -1;
				Block[2][1] = 0;
				Block[3][0] = -1;
				Block[3][1] = -1;
				Block[4]= "cyan";
				break;
			case 1:
			
				Block[1][0]= 1;
				Block[1][1]= 0;
				Block[2][0] = -1;
				Block[2][1] = 0;
				Block[3][0] = 0;
				Block[3][1] = -1;
				Block[4]= "blue";
				break;		
			case 2:
			
				Block[1][0]= 1;
				Block[1][1]= 0;
				Block[2][0] = -1;
				Block[2][1] = 0;
				Block[3][0] = 1;
				Block[3][1] = -1;
				Block[4]= "orange";
				break;
			case 3:
				Block[1][0]= 1;
				Block[1][1]= 0;
				Block[2][0] = -1;
				Block[2][1] = 0;
				Block[3][0] = 2;
				Block[3][1] = 0;
				Block[4]= "yellow";
				break;
			
			case 4:
				Block[1][0]= 0;
				Block[1][1]= -1;
				Block[2][0] = 1;
				Block[2][1] = -1;
				Block[3][0] = -1;
				Block[3][1] = 0;
				Block[4]= "green";
				break;
				
			case 5:
			
				Block[1][0]= -1;
				Block[1][1]= 0;
				Block[2][0] = -1;
				Block[2][1] = -1;
				Block[3][0] = 0;
				Block[3][1] = -1;
				Block[4]= "brown";
				break;
			
			case 6:	
				
				Block[1][0]= 1;
				Block[1][1]= 0;
				Block[2][0] = 0;
				Block[2][1] = -1;
				Block[3][0] = -1;
				Block[3][1] = -1;
				Block[4]= "red";
				break;
	
		}
	
		return Block;
	}
	
	function update(Block,location,shiftX, shiftY){
				
		shiftX = parseInt(shiftX);
		shiftY = parseInt(shiftY);
		
		$("."+location).children().css('background-color','black');		
		
		for(var i=0;i<Block.length-1;i++){
			
			Block[i][0] = Block[i][0]+shiftX; //x direction//
			
			Block[i][1] = Block[i][1]+shiftY; //y direction//
		
			var CurrentCell = "#"+location+Block[i].toString().replace(',','-');	
			
			$(CurrentCell).css('background-color',Block[4]);
			
		}		
	}
	
	function rotate(Block){
		
		$(".grid").children().css('background-color','black');		
		var XOffset = parseInt(Block[0][0]);
		var YOffset = parseInt(Block[0][1]);
			
		for(var i=0;i<Block.length-1;i++){ //loop through every member of the block//
			
			Block[i][0] = Block[i][0]-XOffset;
			Block[i][1] = Block[i][1]-YOffset;			
						
			var temp1 = 0*Block[i][0]+-1*Block[i][1];//rotational matrix - rotate clockwise by 90 degrees
			var temp2 = 1*Block[i][0]+0*Block[i][1];
			
			Block[i][0] = temp1+XOffset; //x direction//
			Block[i][1] = temp2+YOffset; //y direction//
			var CurrentCell = "#"+"grid"+Block[i].toString().replace(',','-');	
			
			$(CurrentCell).css('background-color',Block[4]);			
		}

	}
	
	function blockDown(){
				
		if(bufferTime < 0){
			
			$("#message").html("Game will Start in.."+(-bufferTime)+ "Seconds");
			
			
		}else if(bufferTime == 0){
			
			$("#message").html("");
			$('#StartGame').removeAttr('disabled').attr('value','pause');
		
		}else{		
	
			//console.log(newBlock); //CURRENT LEVEL - need to find a way to pass boolean to blockDown function//
			
			if(newBlock ==true){	
				var nextBlock = generateBlock();
				
				update(nextBlock, "preview",1,1); //1-1 to align with preview Grid
				
				$(".preview").children().removeAttr("background-color");//Test this//
				
				update(currentBlock, "grid",5,0); //5-1 to align with Main Grid

				//console.log(currentBlock);
				
				newBlock =false;
										
			//if(stopped == false){
			}else if (newBlock ==false){
			
				update(currentBlock,"grid",0,1); //net movement only
				
			}
				
		}
		bufferTime = bufferTime + 1;		
	}
	
	function gameStart(){
		
		$("#StartGame").attr('disabled','disabled');
		
		reset();
		//var currentBlock =generateBlock(); //Array "Block" will have the coordiante for the next block
		
		update(currentBlock,"preview",1,1);	//1-1 To align with Preview Grid	
		
		setInterval(blockDown,speed);
		
	}
	
	$(document).keydown(function(e){
		
		//replace this as a function to be called - use if statement to bypass the following// return boundaries 
		
		for(var i=0;i<currentBlock.length-1;i++){ //this for loop determines the left, right and bottom boundaries at each state//
			console.log("original "+i);
			var j = parseInt(currentBlock[i][0])-1;
			
			var leftBoundary = gridFill[j][(currentBlock[i][1])] //currently once we reach boundary it can't be moved again//
			while( leftBoundary ==null && j!=0){ //left
			
				j=j-1;
				
			}
			
			if(j>boundaries[0]){
				boundaries[0] = j;	
			}
			
			var j = parseInt(currentBlock[i][0])+1;

			var rightBoundary = gridFill[j][(currentBlock[i][1])];
			
			console.log(rightBoundary);
			while(
			rightBoundary==null 
			&& 
			j!==width){ //right
			
				j=j+1;
				//console.log(j);					
			}
			
			if(j<boundaries[1]){ 
				boundaries[1] = j;

			}
			
		}
		
/*		for(var i=0;i<currentBlock.length;i++){
				
			if(currentBlock[i][0] ==0){	
				leftBoundary = true;	//revise, leftBoundary now redundant
			}else if(currentBlock[i][0] ==12){
			
				rightBoundary =true;
			}
		}*/
		
		switch(e.which){
				
			case 37: //left key
								
				if(boundaries[0]!==1){//block reaches left block or boundary)//
				
				update(currentBlock,"grid",-1,0);
				}
				break;
		
			case 39: //right key
				if(boundaries[1]!==14){
				
				update(currentBlock,"grid", 1,0);
				}
				break;
				
			case 32: //down key or space bar, rotate
				rotate(currentBlock);
				break;
				
			default:
				break
							
		}
		
	});
	
	function reset(){
		$('.cell').removeAttr('color');
	}
});