<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Teams</title>
        <link rel='stylesheet' href='css/teams.css'>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
        <script src="js/teams.js" defer></script>
    </head>

    <body>
        <article>
            <header>
                <div></div>
                <nav>
                    
                    <div id='links'>
                        <a href='home'>Home</a>
                        <a href='teams'>teams</a>
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

                <div id='title'>
                    <div class='line'></div>
                    <h1>Line Up 2021</h1>
                    <div class='line'></div>
                </div>
            </header>
        <section>

            
                <h3 id='up1' class='hidden'>Preferiti</h3>
            <div id="preferiti" class='hidden'>
                <div class="teams">

                </div>
            </div>

            <div id="teamList">
            <h3 class='up'>Visualizza tutti</h3>
            <div id="ricerca">
                <p id="sc0">cerca</p><input type='text' id='search'>
                </div>
            </div>

            <div id="scelta" class="teams">
                  
                
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