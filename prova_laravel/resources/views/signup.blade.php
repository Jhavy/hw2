<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <script src='js/signup.js' defer></script>
        <title>Sign Up</title>
        <link rel='stylesheet' href='css/signup_stylesheet.css'>
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
                <div class="dati">
                    <span id="signupSpan">Sign-Up</span>

                    <form name="new_user_data" method="post" autocomplete="off" action="{{ route('signup') }}">
                    @csrf
                        <div class="username">
                            <label>
                                Username</label>
                                <input type="text" name="username" value="{{ old('username') }}">
                            <div id="error_user" class="error hidden"> Il nome utente deve avere almeno 4 caratteri </div>
                            <div id="error_user2" class="error hidden"> Il nome utente è stato già utilizzato</div>
                        </div>

                        <div class="password">
                            <label>
                                Password</label>
                                <input type="password" name="password">
                            <div id="error_pw1" class="error hidden"> La password deve avere minimo 6 caratteri </div>
                        </div>

                        <div class="confirm_password">
                            <label id="conferma">
                                Conferma Password</label>
                                <input type="password" name="password_confirm">
                                <div id="error_pw2" class="error hidden"> Le password non coincidono</div>
                        </div>

                        <div>
                            <input type="submit" value="Registrati" id="submit">
                        </div>

                        <div id="errorList">
                        </div>
                        
                    </form>
                    <div id="accedi">Hai già un account? <a href="login">Accedi</a>
                    
                    </div>
                </div>
            </div>
        </section>
    </body>
</html>