$( document ).ready(function() {

    let round = 1;
    let playerElecctions = [0, 0];

    let infoPlayer = "<h2 id='infoPlayer'></h2>"
    
   paintHome();

   function paintHome(){
       let btnPlay = $("<a id='btnPlay' class='btn btn-light paddingxxxl font-xxl bold' href='#' role='button'>Jugar</a>");
       
       btnPlay.click(function() {
        initGame();
       });

       $("#mainBody").html("");
       $("#infoPlayer").html("");

       $("#header .jumbotron").append(btnPlay);
   }

   function initGame(){
        $("#mainBody").html("");
       paintOptions();
   }

   function paintOptions(){
       /* Piedra = 1, Papel = 2, Tijera = 3 */
       let names = ["empty", "Piedra", "Papel", "Tijera"]
       let icons = ["empty", "fa-gem", "fa-paper-plane", "fa-cut"]      
       let options = "";

       if($("#btnPlay").length > 0){
        $("#btnPlay").remove();
       }

       for(let i=1;i<=3;i++){
           options += "<a title='" + names[i] + "' option='" + i + "' class='option btn bold font-xl'><i class='fas " + icons[i] + " fa-3x'></i></a>"
       }   

       $("#mainBody").prepend(options);

       if($("#infoPlayer").length == 0){
            $("#main").prepend(infoPlayer);
       }
       
       $("#infoPlayer").html(getInfoPlayer());

       $(".option").click(function(){
            chooseOption($(this).attr("option"));
       });
   }

   function chooseOption(option){

    playerElecctions[round-1] = parseInt(option);

    if(round == 2){
        paintWinner(compareElection());
    }
    else if(round == 1){
        round++;
        $("#infoPlayer").html(getInfoPlayer());
    }
    else{
        $("#main").html("");
        alert("HA OCURRIDO UN ERROR, REINICIE EL JUEGO");
    }
       
   }

   function compareElection(){
       let e1 = playerElecctions[0];
       let e2 = playerElecctions[1];

       let piedra = 1
       let papel = 2
       let tijera = 3
       
       let winner=0;   

       if((e1 == papel && e2 == piedra) 
        || (e1 == tijera && e2 == papel) 
        || (e1 == piedra && e2 == tijera)){
            winner = 1;
       }
       else if(e1 == e2){
            winner = 0;
       }
       else{
           winner=2
       }

       return winner;

   }

   function getInfoPlayer(){
       return "Jugador " + round;
   }

   function paintWinner(winner){
       // Reiniciamos las varibales
        round = 1;
        playerElecctions = [0, 0];

        let btnRestart = $("<a id='btnRestart' class='btn btn-light paddingxxxl font-xxl bold'>Volver a jugar</a>");
        let btnHome = $("<a id='btnHome' class='btn btn-light paddingxxxl font-xxl bold'>Inicio</a>");

        btnRestart.click(function() {
            initGame();
        });

        btnHome.click(function() {
            paintHome();
        });

        $("#infoPlayer").html(winner == 0 ? "Empate" : "Jugador ganador : " + winner);
        $("#mainBody").html("");
        $("#mainBody").prepend(btnRestart, btnHome);
    }

});