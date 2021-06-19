
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Orders</title>
        <link rel='stylesheet' href='css/ordini.css'>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
        <script src="js/ordini.js" defer></script>
    </head>

    <body>
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
                    <h1>ordini</h1>
                    <div class='line'></div>
                </div>
            </header>
        <section>
            <div id="noOrders" class="hidden">
                <h1>Non ci sono ordini!</h1>
                <div>
                <a href="shop">Torna allo Shop!</a>
                </div>
            </div>

        </section>
       

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