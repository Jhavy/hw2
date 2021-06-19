<html>
    <head>
        <script src='js/home.js' defer></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>MotoGP 2021</title>
        <link rel='stylesheet' href='css/home.css'>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
    </head>
<body>
<article>

    <header>    
        
        <div id='overlay'></div>
        <nav>
            
            <div id='links'>
                <a href='home'>Home</a>
                <a href='teams'>Teams</a>
                <a href='standings'>Standings</a>
                <a href='shop'>Shop</a>
                <a href='ordini'>orders</a>
            </div>
            <div id='loghi'>
            <img class='logo' src='images/fim.png'>
            <img class='logo' src='images/logo.svg'>
            </div>
            <div id='menu'>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>

        <div class="logout">
            
            
            
                <span> 
                Ciao {{Session::get('username')}}!
                </span>
            
            <a href="logout">  logout </a>
        </div>

        
        <h1>
             MotoGP™|2021
        </h1>
         
        
        <a id='buy' class='button' href='shop'>buy tickets</a>
    </header>


    <section>
        <div id='title'>
            <div class='line'></div>
            <h1>we're coming back</h1>
            <p>racing is life</p>
            <div class='line'></div>
        </div>

        <div class='news'>
        
        </div>

        <div class='news'>
        
        </div>

        <div id="ricerca">
                <h1>Cerca le GIF sulla MotoGP!</h1>

                <div id="barraRicerca">
                    <input type="text" id="stringaCerca">
                    <button id="tastoCerca">cerca</button>
                </div>      

                <div id="gifContainer">
                </div>
        </div>
    </section>

</article>

<footer>
            
    <h1>
        dieei unict
    </h1>
    <p>
            Jhaveil Calvino - O46002117
    </p>
</footer>

</body>
</html>