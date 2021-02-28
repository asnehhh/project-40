class Game {
    constructor () {}

    getState () {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update (state) {
        database.ref("/").update({
            gameState: state
        });
    }

    async start () {

        if (gameState === 0) {

            player = new Player();

            var playerCountRef = await database.ref("playerCount").once("value");

            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();

        }

        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
            
        player2 = createSprite(800,500);
        player2.addImage("player2",player_img);

        players = [player1,player2];

    }
    
    play () {
        
        form.hide();
        
        Player.getPlayerInfo();

        image(back_img, 0, 0, 1000, 800);

        var x = 100;
        var y = 200;
        var index = 0;
        var pos = 25;

        drawSprites();

        for(var plr in allPlayers){
        
            index = index + 1;
            x = 500 + allPlayers[plr].distance;
            y = 500;
            pos += 30;
            
            players[index - 1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing the name of the player on the basket. 
            if(index === player.index){
                fill(0);
                textSize(25);
                text(allPlayers[plr].name,x - 25,y + 25);
            }

            if(fruitsGroup.isTouching(players[index - 1])){
                for (var i = 0; i < fruitsGroup.length; i++){
                    if(fruitsGroup.get(i).isTouching(players[index-1])){
                        fruitsGroup.get(i).remove();
                        player.score++;
                        player.update();
                    }
                }
            }

            fill(255);
            textSize(25);
            textFont("Georgia");
            textAlign(CENTER);
            text(allPlayers[plr].name + ": " + allPlayers[plr].score,75,pos);

            if(allPlayers[plr].score >= 10){
                game.update(2);
            }

        }

        // Give movements for the players using arrow keys
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }

        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance -= 10;
            player.update();
        }

        // Create and spawn fruits randomly
        if(frameCount % 20 === 0){

            fruits = createSprite(random(100,1000),0,100,100);
            fruits.velocityY = 6;

            var r = Math.round(random(1,5));
            if(r === 1){
                fruits.addImage(fruit1_img);
            } else if (r === 2){
                fruits.addImage(fruit2_img);
            } else if (r === 3){
                fruits.addImage(fruit3_img);
            } else if (r === 4){
                fruits.addImage(fruit4_img);
            } else if (r === 5){
                fruits.addImage(fruit5_img);
            }

            fruitsGroup.add(fruits);

        }

        textSize(50);
        textFont("Georgia");
        fill(255);
        stroke(0);
        strokeWeight(2);
        text("Collect 10 fruits to win!",500,50);
        
    }

    end () {

       console.log("Game Ended");

       background(back_img);

       textSize(100);
       textFont("Georgia");
       fill(255);
       stroke(0);
       strokeWeight(2);
       text("GAME OVER",500,500);

       textSize(50);
       text("Refresh the page to see a reset button.",470,550);

    }

}