function Monde(div_id, width, height) {
    var paper = Raphael(div_id, width, height);
    paper.rect(0, 0, 100, 100);

    return {
		paper: paper,
	    add: function(cell) {
		    cell.paper = paper;
		    cell.monde = this;
		    this.cells.push(cell);
		},
	    nextFrame: function() {	
		    this.transform();
			this.clear();	
		    this.draw();
		},
	    transform: function() {
		    for (var i = 0; i < this.cells.length; i++){
				var cell = this.cells[i];
				cell.power++;	
		    }
		    for (var j = 0; j < this.tentacles.length; j++){
				var tentacle = this.tentacles[j];
				tentacle.target.power--;
				tentacle.target.power--;
				tentacle.source.power--;
				tentacle.source.power--;
				
				if (tentacle.target.power <= 0 ){
					tentacle.target.power = 0;				
				}
		    }
		},	    
		clear: function() {
			paper.clear();
		},	
	    draw: function() {
	    	for (var i in this.tentacles) {
				this.tentacles[i].draw(paper);		
	    	} 
	    	for (var i in this.cells) {
				this.cells[i].draw(paper);		
	    	} 
		},	
	    cells: [],
	    tentacles: [],
		run: function() {
			setInterval(function(monde){monde.nextFrame()}, 1000, this);
		}
	}
}

function Cellule(x, y) {
    return {x: x, y: y,
	    attaque: function(target){
            if (this.power > 100) {
                // on cree une tentacule
                var tentacle = new Tentacle(this, target);
                this.monde.tentacles.push(tentacle);
		    }
        },
	    draw: function(paper) {
	    	paper.circle(this.x, this.y, 15);
	   	 	this.text = paper.text(this.x, this.y, this.power);
			$(this.text.node).text(this.power);
		}
    }
};
function Tentacle(source,target) {
    this.source = source;
    this.target = target;
    this.avance = function() {
        //this.target 
    }
    this.draw = function(paper) {
    	paper.path(['M', this.source.x, this.source.y, 'L', this.target.x, this.	target.y]);
    }
};
