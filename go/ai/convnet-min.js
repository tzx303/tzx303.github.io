<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>Title</title>
		<style>
			body {
				padding: 0 0 0 0;
			}
			
			html {
				padding: 0 0 0 0;
			}
		</style>
	</head>

	<body>
		<canvas id="myCanvas" width="500" height="500" style="border:1px solid #d3d3d3;">
    您的浏览器不支持 HTML5 canvas 标签。
</canvas>
	</body>
	<!--<script src="jquery-2.1.1.min.js"></script>-->
	<script>
		var offset = 8;
		var geziWidth = 20;
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = 'black';

		function clearDesk() {
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, 500, 500);

			for(var i = 1; i <= 19; i++) {
				ctx.strokeText(i, i * geziWidth - 5, geziWidth - 5);

				ctx.beginPath();
				ctx.moveTo(i * geziWidth, geziWidth);
				ctx.lineTo(i * geziWidth, geziWidth * 19);
				ctx.closePath();
				ctx.stroke();
			}
			for(var i = 1; i <= 19; i++) {
				ctx.strokeText(i, geziWidth - 15, geziWidth * i + 5);

				ctx.beginPath();
				ctx.moveTo(geziWidth, geziWidth * i);
				ctx.lineTo(geziWidth * 19, geziWidth * i);
				ctx.closePath();
				ctx.stroke();
			}
		};
		clearDesk();

		function drawPiece(piece) {
			ctx.beginPath();
			ctx.arc(20 * piece.x, 20 * piece.y, 10, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.stroke();
			if(piece.color == 1) {
				ctx.fillStyle = 'black';
			} else {
				ctx.fillStyle = 'white';
			}
			ctx.fill();
		};

		function drawGoChess(goChess) {
			clearDesk();
			for(var i in goChess.blocks) {
				for(var j in goChess.blocks[i].pieces) {
					drawPiece(goChess.blocks[i].pieces[j]);
				}
			}
		};

		c.addEventListener('click', function(e) {
			var canvasX = e.clientX - offset;
			var canvasY = e.clientY - offset;

			var x = Math.round(canvasX / 20);
			var y = Math.round(canvasY / 20);

			if(x < 1 || x > 19 || y < 1 || y > 19) {
				return;
			}

			var piece = new Piece(x, y, game.curColor);
			if(game.goChesses[game.goChesses.length - 1].isHasPiece(piece)) {
				return;
			}

			game.getPiece(piece);

		}, false);

		//棋子
		var Piece = function(x, y, color) {
			this.x = x;
			this.y = y;
			this.color = color; // 1：黑   -1：白
		};
		Piece.prototype.getCopy = function() {
			var piece = new Piece(this.x, this.y, this.color);
			return piece;
		};
		//是否相同
		Piece.prototype.isSame = function(piece) {
			if(this.x == piece.x && this.y == piece.y && this.color == piece.color) {
				return true;
			} else {
				return false;
			}
		};

		//气
		var Qi = function(x, y) {
			this.x = x;
			this.y = y;
		};
		Qi.prototype.getCopy = function() {
			var qi = new Qi(this.x, this.y);
			return qi;
		};
		//是否相同
		Qi.prototype.isSame = function(qi) {
			if(this.x == qi.x && this.y == qi.y) {
				return true;
			} else {
				return false;
			}
		};

		//棋块
		var Block = function() {
			this.pieces = [];
			this.qis = [];
		};
		Block.prototype.getCopy = function() {
			var block = new Block();
			for(var i in this.pieces) {
				block.pieces.push(this.pieces[i].getCopy());
			}
			for(var i in this.qis) {
				block.qis.push(this.qis[i].getCopy());
			}
			return block;
		};
		//是否同形
		Block.prototype.isSame = function(block) {
			if(this.pieces.length != block.pieces.length) {
				return false;
			}
			if(this.pieces[0].color != block.pieces[0].color) {
				return false;
			}
			if(this.qis.length != block.qis.length) {
				return false;
			}
			return true;
		};
		//棋子是否在气中
		Block.prototype.isPieceInQi = function(piece) {
			var index = -1;
			for(var i in this.qis) {
				if(this.qis[i].x == piece.x && this.qis[i].y == piece.y) {
					return i;
				}
			}
			return index;
		};
		//减气
		Block.prototype.deleteQi = function(piece) {
			for(var i = 0; i < this.qis.length; i++) {
				if(this.qis[i].x == piece.x && this.qis[i].y == piece.y) {
					this.qis.splice(i, 1);
					i--;
				}
			}
			return false;
		};
		//棋子是否在棋子中
		Block.prototype.isPieceInPiece = function(piece) {
			for(var i in this.pieces) {
				if(this.pieces[i].x == piece.x && this.pieces[i].y == piece.y) {
					return true;
				}
			}
			return false;
		};

		//盘面
		var GoChess = function() {
			this.blocks = [];
		};
		GoChess.prototype.getMapByGoChess = function() {
			var chessMap = [];
			for(var i in this.blocks) {
				for(var j in this.blocks[i].pieces) {
					chessMap[this.blocks[i].pieces[j].y*19 + this.blocks[i].pieces[j].x] = this.blocks[i].pieces[j].color;
				}
			}
			return chessMap;
		};
		GoChess.prototype.getCopy = function() {
			var goChess = new GoChess();
			for(var i in this.blocks) {
				goChess.blocks.push(this.blocks[i].getCopy());
			}
			return goChess;
		};
		//是否同形
		GoChess.prototype.isSame = function(goChess) {
			var chessMap1 = this.getMapByGoChess();
			var chessMap2 = goChess.getMapByGoChess();
			for(var i = 1*19+1;i<=19*19+19;i++){
				if(chessMap1[i]!=chessMap2[i]){
					return false;
				}
			}
			return true;
		};
		//合并棋块
		GoChess.prototype.mergeBlock = function(i1, i2) {
			this.blocks[i1].pieces = this.blocks[i1].pieces.concat(this.blocks[i2].pieces);
			for(var i in this.blocks[i2].qis) {
				if(this.blocks[i1].isPieceInQi(this.blocks[i2].qis[i]) == -1) {
					this.blocks[i1].qis.push(this.blocks[i2].qis[i]);
				}
			}
			this.blocks.splice(i2, 1);
		};
		//盘面落子
		GoChess.prototype.getPiece = function(piece) {
			var block = new Block();
			block.pieces.push(piece);

			var qi1 = new Qi(piece.x - 1, piece.y);
			var qi2 = new Qi(piece.x + 1, piece.y);
			var qi3 = new Qi(piece.x, piece.y - 1);
			var qi4 = new Qi(piece.x, piece.y + 1);
			if(piece.x - 1 >= 1 && !this.isHasPiece(qi1)) {
				block.qis.push(qi1);
			}
			if(piece.x + 1 <= 19 && !this.isHasPiece(qi2)) {
				block.qis.push(qi2);
			}
			if(piece.y - 1 >= 1 && !this.isHasPiece(qi3)) {
				block.qis.push(qi3);
			}
			if(piece.y + 1 <= 19 && !this.isHasPiece(qi4)) {
				block.qis.push(qi4);
			}

			this.blocks.push(block);
			var curIndex = this.blocks.length - 1;

			//合并棋块
			for(var i = 0; i < this.blocks.length; i++) {
				if(i == curIndex) {
					continue;
				}
				if(this.blocks[i].pieces[0].color != piece.color) {
					continue;
				}

				var index = this.blocks[i].isPieceInQi(piece);
				if(index != -1) {
					this.mergeBlock(i, curIndex);
					if(curIndex < i) {
						i--;
					}
					this.blocks[i].deleteQi(piece);
					curIndex = i;
				}
			}

			var newBlock = this.blocks[curIndex];

			//减对方掉气
			for(var i = 0; i < this.blocks.length; i++) {
				if(this.blocks[i].pieces[0].color == piece.color) {
					continue;
				}
				this.blocks[i].deleteQi(piece);
			}

			//判断提子
			var hasKill = false; //有无提子
			for(var i = 0; i < this.blocks.length; i++) {
				if(this.blocks[i].pieces[0].color == piece.color) {
					continue;
				}
				if(this.blocks[i].qis.length == 0) {
					hasKill = true;

					//加气
					for(var j = 0; j < this.blocks.length; j++) {
						if(this.blocks[j].pieces[0].color != piece.color) {
							continue;
						}
						for(var k in this.blocks[i].pieces) {
							if(this.blocks[j].isPieceInPiece(new Piece(this.blocks[i].pieces[k].x - 1, this.blocks[i].pieces[k].y, 0)) || this.blocks[j].isPieceInPiece(new Piece(this.blocks[i].pieces[k].x + 1, this.blocks[i].pieces[k].y, 0)) || this.blocks[j].isPieceInPiece(new Piece(this.blocks[i].pieces[k].x, this.blocks[i].pieces[k].y - 1, 0)) || new Piece(this.blocks[i].pieces[k].x, this.blocks[i].pieces[k].y + 1, 0)) {
								this.blocks[j].qis.push(new Qi(this.blocks[i].pieces[k].x, this.blocks[i].pieces[k].y));
							}
						}
					}

					this.blocks.splice(i, 1);
					i--;
				}
			}

			//判断有无气
			var hasQi = newBlock.qis.length > 0; //有无气

			if(hasKill) {
				return true;
			} else {
				if(hasQi) {
					return true;
				} else {
					return false;
				}
			}
		};
		//位子是否有棋子
		GoChess.prototype.isHasPiece = function(piece) {
			for(var i in this.blocks) {
				if(this.blocks[i].isPieceInPiece(piece)) {
					return true;
				}
			}
			return false;
		};

		//棋局
		var Game = function() {
			this.goChesses = []; //历史全部盘面
			this.curColor = 1;
		};
		//落子
		Game.prototype.getPiece = function(piece) {
			var goChess = this.goChesses[this.goChesses.length - 1].getCopy();
			var result = this.checkPiece(goChess, piece);
			if(result) {
				this.goChesses.push(goChess);
				drawGoChess(goChess);
				if(this.curColor == 1) {
					this.curColor = -1;
				} else {
					this.curColor = 1;
				}
			} else {

			}
		};
		//是否全局同形
		Game.prototype.isRepeat = function(goChess) {
			for(var i in this.goChesses) {
				if(this.goChesses[i].isSame(goChess)) {
					return true;
				}
			}
			return false;
		};

		//落子是否合法
		Game.prototype.checkPiece = function(goChess, piece) {
			if(goChess.getPiece(piece)) {
				if(this.isRepeat(goChess)) {
					return false;
				}
				return true;
			}
			return false;
		};

		var game = new Game();
		game.goChesses.push(new GoChess());
	</script>

</html>
