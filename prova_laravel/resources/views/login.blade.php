
<html>

    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta charset="UTF-8">
        <title>Login</title>
        <link rel='stylesheet' href='css/login.css'>
        <script src='js/login.js' defer></script>
    </head>

    <body>
        <header>
            <div id="sfondo2"></div>
            <div id='title'>
                <div class='line'></div>
                <h1>MotoGP™|2021</h1>
                <p>racing is life</p>
                <div class='line'></div>
            </div>
        </header>
        <section>
            <div id="sfondo"></div>
            <div id="main"> 
                <div class="spoiler">
      
                </div> 

                <div class="dati">
                    <span id="loginSpan">Login</span>
                    <form name="login" method="post" autocomplete="off" action="{{ route('login') }}">
                    @csrf
                        <div class="username">
                            <label>
                                Username
                                <input type="text" name="username" value="{{ old('username') }}">
                            </label>
                        </div>

                        <div class="password">
                            <label>
                                Password
                                <input type="password" name="password">
                            </label>
                        </div>

                        <div>
                            <input type="submit" value="Accedi" id="button">
                        </div>
                    </form>
                
                
                
                @if (old('username')!=null)
                    <span class='error'>Username o password errati</span>
                @endif
                    
                    
                    <div id="register">
                    <p>
                    Non hai un account? <a href="signup">Registrati</a>
                    </p>
                    </div>
                </div>
            
                <div class="spoiler">
                    
                </div>
            </div>
        </section>
    </body>
</html>