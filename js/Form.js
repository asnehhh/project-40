class Form {
    
    constructor () {
       this.input = createInput("Name");
       this.button = createButton("Play");
       this.greeting = createElement("h2");
       this.title = createElement("h2");
       this.reset = createButton("Reset Game");
    }

    hide () {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }

    display () {

        this.title.html("FRUIT CATCHER");
        this.title.position(600,50);
        this.title.style("font-size","70px");
        this.title.style("color","skyblue");

        this.input.position(800,400);
        this.input.style("width","200px");
        this.input.style("height","20px");
        this.input.style("background","lavender");

        this.button.position(805,500);
        this.button.style("width","200px");
        this.button.style("height","30px");
        this.button.style("background","lightpink");

        this.reset.position(1200,150);
        this.reset.style("width","100px");
        this.reset.style("height","30px");
        this.reset.style("background","lightpink");

        this.button.mousePressed( () => {

            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;

            player.update();
            player.updateCount(playerCount);

            this.greeting.html("Hello " + player.name + "!");
            this.greeting.position(650,250);
            this.greeting.style("color", "white");
            this.greeting.style("font-size", "100px");

        })

        if(gameState === 0){
            this.reset.hide();
        } else if (gameState === 1){
            this.reset.hide();
        } else if (gameState === 2){
            this.reset.show();
        }

        this.reset.mousePressed( () => {

            player.updateCount(0);
            game.update(0);
            
            game = new Game();
            game.getState();
            game.start();
            
            database.ref("players/player1").update({
                score: 0,
                name: "",
                distance: 0
            })

            database.ref("players/player2").update({
                score: 0,
                name: "",
                distance: 0
            })

            this.reset.hide();
            
        })

    }

}