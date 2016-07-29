

$(document).ready(function(){
	
	//console.log("Ready");
		var currentBlock;
		currentBlock =generateBlock(); //Array "Block" will have the coordiante for the next block
		var speed = 1000; //time between each block movement//
		var bufferTime = -3 // 3 Seconds between Start Game and Ready
		var stopped = false; //To see if the Block has reached its end state//
		var newBlock = true; //To see if it is a new Block//
		var width = 12;
		var height = 14;
		//var distance = [width-1,width-1,height]; //captures the distance between the block and the left, right and bottom boundaries
		
		var gridFill = new Array(width);
		
		for(var i=0; i<width;i++){
		
			gridFill[i]=new Array(height);
			
		}//to capture what grids are filled
		
		for(var i=0;i<width;i++){
			
			for(var j=0;j<height;j++){
		
				gridFill[i][j] = null;			
			}
		}
		
		//test loop to introduce walls//
		
		/*for(var j=0;j<height;j++){
		
			gridFill[1][j] = "green";
			
			//$('.cell[id="2-4').
			
		}*/
		
		//console.log(gridFill);
		
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
	}//bring back the randomness when distance is repaired
	
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
		
		$("#StartGame").attr('disabled','disabled'); //suggest move somewhere else
		
		reset();
		//var currentBlock =generateBlock(); //Array "Block" will have the coordiante for the next block
		
		update(currentBlock,"preview",1,1);	//1-1 To align with Preview Grid	
		
		setInterval(blockDown,speed);
		
	}
	
	$(document).keydown(function(e){
		
		if(e.which == 39 || e.which ==37 || e.which ==38 ||e.which ==40){ //invalid for all other keys
			//right arrow		left arrow		up arrow	down arrow
			console.log("bottom distance"+findDistance(currentBlock, "bottom"));
			
			switch(e.which){
					
				case 37: //left key
					
					if(findDistance(currentBlock,"left")!==0){//block not reached left block or boundary)//
					
					update(currentBlock,"grid",-1,0);
					}
					break;
			
				case 39: //right key
					if(findDistance(currentBlock,"right")!==0){ 
					
					update(currentBlock,"grid", 1,0);
					}
					break;
					
				case 32: //up key , rotate
				
					//need to account for walls
					rotate(currentBlock);
					break;
				
				case 40: //down key, go all the way down
				
					update(currentBlock,"grid",0,(findDistance(currentBlock,"bottom")-1));
					
				default:
					break;
								
			}//end Switch
		
		}//end if
		
		}); //End Event//
	
	function findDistance(Block,direction){ //right now issue is when left is followed by right, distance calculation is incorrect
		
		var distance=[width-1,width-1,height-1]; //reset
		
		for(var i=0;i<Block.length-1;i++){ //this for loop determines the left, right and bottom boundaries at each state//

			//for each square, keep going LEFT, until a grid that isn't null is found, or the boundary is reached
			//var j = 1; //Left distance, closest will be 1 grid away from current square
			
			var leftDistance = Block[i][0]; //if start from x=6, then it's 6 from boundary
			var rightDistance = (width-1)-Block[i][0]; //if start from x=6, then it's 5 from the boundary (12-7)
			var bottomDistance = height-3; //initialised height
			
			for(var j=0;j<Block[i][0];j++){ //start from left boundary x = 0
			
				if(gridFill[(j)][(Block[i][1])] !==null){ //if left boundary of the current square is occupied ie NOT null
				
					leftDistance=Block[i][0]-j-1; //only update if there is an occupied square in the way//	
				};						
			}
			
			if(leftDistance<distance[0]){
				
				distance[0]=leftDistance; //smallest distance
									
			}//end if
		
			for(var k=(width-1);k>(Block[i][0]);k--){
			//counter from right boundary, 11 if width = 12

				if(gridFill[k][(Block[i][1])] !==null){ //if right boundary of current square is occupied ie NOT null
					
					rightDistance=k-Block[i][0]-1; //only update if there is an occupied square in the way//	
												
				}; //end if
				
			} //end for	
			if(rightDistance < distance[1]){
			
				distance[1] = rightDistance;
			
			} //end if
			
			for(var m = (height-1);m>(Block[i][1]);m--){
			
				if(gridFill[(Block[i][0])][m] !==null){
					bottomDistance = m-Block[i][1]-1;	
				}
				
			}
			if(bottomDistance < distance[2]){
			
				distance[2] = bottomDistance;
			
			} //end if
							
		} //end for
	
	
		if(direction =="left"){
		
			return distance[0];	
		
		}else if(direction=="right"){
		
			return distance[1];	
		
		} else if(direction=="down"){
		
			return distance[2];	
		
		}
		
	}
	
	function reset(){
		$('.cell').removeAttr('color');
	}
});