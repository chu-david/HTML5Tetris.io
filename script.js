

$(document).ready(function(){
	
		//console.log("Ready");
		var currentBlock;
		var nextBlock;
		var speed = 500; //time between each block movement//
		var bufferTime = -3 // 3 Seconds between Start Game and Ready
		var newBlock = true; //To see if it is a new Block//
		var width = 12;
		var height = 14;		
		var gridFill = new Array(width);
		var score = 0; //overall score
		var MainGame;
		var active = false;
		
		for(var i=0; i<width;i++){
		
			gridFill[i]=new Array(height);
			
		}//to capture what grids are filled
		
		for(var i=0;i<width;i++){
			
			for(var j=0;j<height;j++){
		
				gridFill[i][j] = "black";			
			}
		}
		
		//test loop to introduce walls//
		
		for(var j=0;j<width;j++){

			gridFill[j][13] = "green";
			//gridFill[1][j] = "green";
			
			//$('.cell[id="2-4').
			
		}
		
		//console.log(gridFill);
		
		createCells(width,height);
		
		$('#StartGame').click(function(){
			
			active = true;
			nextBlock =generateBlock(); 
			displayGrid();
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
		
		var blockNo = Math.ceil(Math.random()*7);
				
		switch(blockNo){
		
			case 7: //Block "J"//
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
		
		displayGrid();
		
		for(var i=0;i<Block.length-1;i++){
			
			//$('#grid'+Block[i][0]+'-'+Block[i][1]).css('background-color','black');
			
			Block[i][0] = Block[i][0]+shiftX; //x direction//
			Block[i][1] = Block[i][1]+shiftY; //y direction//
		
			var CurrentCell = "#"+location+Block[i].toString().replace(',','-');	
			
			$(CurrentCell).css('background-color',Block[Block.length-1]);
			
		}		
	}
	function rotate(Block){ //still some latency//
		
		var rotatable = true;				
		var XOffset = parseInt(Block[0][0]);
		var YOffset = parseInt(Block[0][1]);
				
		for(var i=0;i<Block.length-1;i++){ //loop through every member of the block//
			
			var testSquareX = Block[i][0]-XOffset;
			var testSquareY = Block[i][1]-YOffset;			
						
			var temp1 = 0*testSquareX+-1*testSquareY;//rotational matrix - rotate clockwise by 90 degrees
			var temp2 = 1*testSquareX+0*testSquareY;					
			
			if(gridFill[(temp1+XOffset)][(temp2+YOffset)]!=='black'){
				
				rotatable = false;
				console.log("can't Rotate");
				
			}	
		}
		
		displayGrid();
		
		if(rotatable === true){
			
			for(var i=0;i<Block.length-1;i++){ //loop through every member of the block//			
						
				Block[i][0] = Block[i][0]-XOffset;
				Block[i][1] = Block[i][1]-YOffset;			
							
				var temp1 = 0*Block[i][0]+-1*Block[i][1];//rotational matrix - rotate clockwise by 90 degrees
				var temp2 = 1*Block[i][0]+0*Block[i][1];
				
				Block[i][0] = temp1+XOffset; //x direction//
				Block[i][1] = temp2+YOffset; //y direction//
				var CurrentCell = "#"+"grid"+Block[i].toString().replace(',','-');
				
				$(CurrentCell).css('background-color',Block[4]);
				
			} //end For
		}

	} //end Function
		
	function gameStart(){
		
		$("#StartGame").attr('disabled','disabled'); //suggest move somewhere else
		
		reset();
		
		update(nextBlock,"preview",1,1);	//1-1 To align with Preview Grid	
			
		var MainGame = setInterval(blockDown,speed);
		
	}
	
	function blockDown(){
						
		if(bufferTime < 0){
			
			$("#message").html("Game will Start in.."+(-bufferTime)+ "Seconds");
			
		}else if(bufferTime == 0){
			
			$("#message").html("");
			$('#StartGame').removeAttr('disabled').attr('value','pause');
		
		}else{		
		
			if(newBlock ==true){
				
				currentBlock = nextBlock; 
						
				displayGrid(); //print GridFill to all cells//
					
				nextBlock = generateBlock();
				
				$(".preview").children().css("background-color",'black');
				
				update(nextBlock, "preview",1,1); //1-1 to align with preview Grid
								
				update(currentBlock, "grid",5,0); //5-1 to align with Main Grid
				
				newBlock =false;
				
				if(findDistance(currentBlock,"down") == 0){
				
					//Game Over//
					
					//HighestScore
					
					$('body').html('GAME OVER<br>YOUR SCORE IS: '+score+'Points');
					
					clearInterval(MainGame);
					
					
						
				}
										
			}else if (newBlock ==false){
			
				update(currentBlock,"grid",0,1); //downward movement only
				
			}
			
			if(findDistance(currentBlock,"down") == 0){
				
				sweep();				
				
				block2Grid(currentBlock);
				
				newBlock = true; //this line is reinventing newBlock//
			};
				
		}
		bufferTime = bufferTime + 1;
				
	}
	
	$(document).keydown(function(e){
		
		if(e.which == 39 || e.which ==37 || e.which ==38 ||e.which ==40){ //invalid for all other keys
			//right arrow		left arrow		up arrow	down arrow
			
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
					
				case 38: //up key , rotate
				
					//need to check for walls
					rotate(currentBlock);
					break;
				
				case 40: //down key, go all the way down
				
					update(currentBlock,"grid",0,(findDistance(currentBlock,"down")));
					
					block2Grid(currentBlock);
					
					displayGrid();
					
					sweep();
					
					newBlock = true;
					break;
					
				default:
					break;
								
			}//end Switch
		
		}//end if
		
		}); //End Event//
	
	function findDistance(Block,direction){
		
		var distance=[width-1,width-1,height-1]; //reset
		
		for(var i=0;i<Block.length-1;i++){ //this for loop determines the left, right and bottom boundaries at each state//

			//for each square, keep going LEFT, until a grid that isn't null is found, or the boundary is reached
			//var j = 1; //Left distance, closest will be 1 grid away from current square
			
			var leftDistance = Block[i][0]; //if start from x=6, then it's 6 from boundary
			var rightDistance = (width-1)-Block[i][0]; //if start from x=6, then it's 5 from the boundary (12-7)
			var bottomDistance = height-3; //initialised height
			
			for(var j=0;j<Block[i][0];j++){ //start from left boundary x = 0
			
				if(gridFill[(j)][(Block[i][1])] !=="black"){ //if left boundary of the current square is occupied ie NOT null
				
					leftDistance=Block[i][0]-j-1; //only update if there is an occupied square in the way//	
				};						
			}
			
			if(leftDistance<distance[0]){
				
				distance[0]=leftDistance; //smallest distance
									
			}//end if
		
			for(var k=(width-1);k>(Block[i][0]);k--){
			//counter from right boundary, 11 if width = 12

				if(gridFill[k][(Block[i][1])] !=="black"){ //if right boundary of current square is occupied ie NOT null
					
					rightDistance=k-Block[i][0]-1; //only update if there is an occupied square in the way//	
												
				}; //end if
				
			} //end for	
			if(rightDistance < distance[1]){
			
				distance[1] = rightDistance;
			
			} //end if
				
			bottomDistance = (height-1)-Block[i][1]; //default bottomDistance	
			
			//console.log("default bottomDistance "+bottomDistance);		
			
			//console.log(gridFill[(Block[i][0])][height-1]);
			
			for(var m = (height-1);m>(Block[i][1]);m--){ //BUG HERE
								
				if(gridFill[(Block[i][0])][m]!=="black"){ //any cells filled under the current square?
					bottomDistance = m-Block[i][1]-1;
					
					//console.log("m " +m);
					
					//console.log("Block height y coordinate"+Block[i][1]);	
					
					//console.log("bottom distance "+bottomDistance);
				}
				
			}
			if(bottomDistance < distance[2]){
			
				distance[2] = bottomDistance;
			
			} //end if
							
		} //end for
		
		//console.log(bottomDistance);
	
		if(direction =="left"){
		
			return distance[0];	
		
		}else if(direction=="right"){
		
			return distance[1];	
		
		} else if(direction=="down"){
		
			return distance[2];	
		
		}
		
	}
	
	function block2Grid(Block){ //saves the block to the grid matrix

		for(var i=0; i < Block.length-1; i++){
			
			gridFill[(Block[i][0])][(Block[i][1])]= Block[Block.length-1];
		
			var CurrentCell = "#grid"+Block[i].toString().replace(',','-');	
			
			$(CurrentCell).css('background-color',Block[Block.length-1]);
		
		}
		score = score + 1;
	
		$('#currentScore').html("SCORE: "+score);
	
	}
	
	function displayGrid(){  //to optimise - slow response time//
		
		for(var i = 0; i<width;i++){
			
			for(var j = 0; j<height;j++){
		
				$('#'+'grid'+i+'-'+j).css('background-color',gridFill[i][j]);

			}
		}
	}
	
	function sweep(){
		
		//console.log("before");
		//console.log(gridFill[5]);
			
		for(var i=height-1;i>=0;i--){ //looping through every row//
			
		var rowComplete = true; //innocent until proven guilty//
			
			for(var j=0;j<width;j++){
								
				//console.log("j ="+j+"i ="+i)
				
				if(gridFill[j][i] == "black"){
					
					gridFill[j][i];
					
					rowComplete = false; //if any members in the row is blank, then row isn't complete//
					
				}
				
			}
			if(rowComplete == true){
			
				for(var j=0;j<width;j++){
				
					gridFill[j].splice(i,1);
					
					gridFill[j].splice(0,0,"black"); //disappears but some blocks get stuck near the top

				}
			
			i=i+1;
			speed = speed*0.95;
			score = score + width;
			$('#currentScore').html("SCORE: "+score);
			
			}			
		}

		//console.log("after");
		//console.log(gridFill[5]);
	}
	
	/*function getCol(matrix, col){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }
	*/
	function reset(){
		$('.cell').removeAttr('color');
	}
});