<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Shop</title>
        <link rel='stylesheet' href='css/shop.css'>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
        <script src="js/shop.js" defer></script>
    </head>

    <body>
            <header>
                <div></div>
                <nav>
                    <div id='links'>
                        <a href='home'>Home</a>
                        <a href='teams'>teams</a>
                        <a href='standings'>Standings</a>
                        <a href='shop' id="shop">Shop</a>
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
                    <a href="logout">  logout </a>
                    </span>
                </div>

                <div id='title'>
                    <div class='line'></div>
                    <h1>Tickets 2021</h1>
                    <div class='line'></div>
                </div>

                <a id="ordini" href="ordini">I miei ordini</a>
            </header>

            

        <section>
        <div id="modal-view" class="hidden"></div>

            <img src="images/carrello.png" id="carrelloPulsante">
            <div id="carrello" class="hidden"></div>
            
            <div id="productList">
            
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