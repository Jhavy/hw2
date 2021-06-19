//creazione dinamica

var datiTeams=[];
for(i=1;i<12;i++)
{
    //controllo al caricamento della pagina se l'utente ha già dei team nei preferiti, in questo caso
    //visualizza i team preferiti nel div apposito, levandogli la classe .hidden
    //fetch("checkFavouriteTeamsOnLoading.php?q="+encodeURIComponent(i)).then(onResponse).then(verificaTeam);
    fetch("/prova_laravel/public/teams/checkFavouriteTeamsOnLoading/"
    +encodeURIComponent(i)).then(onResponse).then(verificaTeam);
}




function onResponse(response) {
    if (response.ok){
        return response.json();
    }
    else return null;
}

function verificaTeam(json)
{
    if(json.id_team==null)
    {
        //fetch("getDataTeams.php?q="+encodeURIComponent(json)).then(onResponse).then(onJson);
        fetch("/prova_laravel/public/teams/getDataTeams/"
        +encodeURIComponent(json)).then(onResponse).then(onJson);
    }
    else{
        //console.log("Esiste preferito")
        //crea il div nella lista team selezionabili, ma nascondilo e aggiungilo nei preferiti
        //fetch("getDataTeams.php?q="+encodeURIComponent(json.id_team)).then(onResponse).then(onJsonPreferito);
        fetch("/prova_laravel/public/teams/getDataTeams/"
        +encodeURIComponent(json.id_team)).then(onResponse).then(onJsonPreferito);
    }
    
}




function onJson(json)
{
    
        const visualizzaTeams=document.querySelector("#scelta")

        let cont=document.createElement('div');
        let logo=document.createElement('img');
        logo.src=json.logo;
        cont.appendChild(logo);
        
        let nome=document.createElement('h1');
        nome.dataset.idTeam=json.nome;
        nome.textContent=json.nome;
        cont.appendChild(nome);

        let stella=document.createElement('img');
        stella.id='add';
        stella.src='images/add.png'
        stella.addEventListener("click", teamSelected)
        cont.id=(json.nome);
        cont.appendChild(stella);

        
        sc=document.createElement("a");
        sc.textContent="clicca per vedere i piloti";
        sc.addEventListener("click",show)
        cont.appendChild(sc);

        
        desc=document.createElement("p");
        desc.textContent=json.piloti;
        desc.id="desc"
        desc.classList.add("hidden")
        cont.appendChild(desc)
        
        nasc=document.createElement("p");
        nasc.id="nascondi"
        nasc.textContent="nascondi piloti";
        nasc.classList.add("hidden")
        nasc.addEventListener("click",hide)
        cont.appendChild(nasc)

        visualizzaTeams.appendChild(cont);

        datiTeams.push(json);
}

function onJsonPreferito(json)
{
    const visualizzaTeams=document.querySelector("#scelta")

    let cont=document.createElement('div');
    let logo=document.createElement('img');
    logo.src=json.logo;
    cont.appendChild(logo);
    
    let nome=document.createElement('h1');
    nome.dataset.idTeam=json.nome;
    nome.textContent=json.nome;
    cont.appendChild(nome);

    let stella=document.createElement('img');
    stella.id='add';
    stella.src='images/add.png'
    stella.addEventListener("click", teamSelected)
    cont.id=(json.nome);
    cont.appendChild(stella);

    
    sc=document.createElement("a");
    sc.textContent="clicca per vedere i piloti";
    sc.addEventListener("click",show)
    cont.appendChild(sc);

    
    desc=document.createElement("p");
    desc.textContent=json.piloti;
    desc.id="desc"
    desc.classList.add("hidden")
    cont.appendChild(desc)
    
    nasc=document.createElement("p");
    nasc.id="nascondi"
    nasc.textContent="nascondi piloti";
    nasc.classList.add("hidden")
    nasc.addEventListener("click",hide)
    cont.appendChild(nasc)

    cont.classList.add("hidden")
    visualizzaTeams.appendChild(cont);

    datiTeams.push(json);
    
    //adesso aggiungilo nei preferiti
    const pref=document.querySelector("#preferiti");
    pref.classList.remove("hidden");
    const scritta=document.querySelector("#up1");
    scritta.classList.remove("hidden");

    const preferiti=document.querySelector("#preferiti .teams")

    for(team of datiTeams)
    {
        if(json.id_team===team.id_team)
        {
            let cont=document.createElement('div');
            cont.dataset.nome=team.nome
            cont.dataset.id_team=team.id_team

            //fetch("addTeamFavourite.php?q="+encodeURIComponent(team.id_team)); ???

            let logo=document.createElement('img');
            let nome=document.createElement('h1');
            logo.src=team.logo;
            cont.appendChild(logo);
            nome.textContent=team.nome;
            cont.appendChild(nome);
            let stella=document.createElement('img');
            stella.id='remove';
            stella.src='images/remove.png'
            stella.addEventListener("click",teamUnselected);
            cont.appendChild(stella);

            preferiti.appendChild(cont);

        }
    }
}



ricerca=document.querySelector("#search")
ricerca.addEventListener("keyup",cerca)
//comportamento


function teamSelected(event)
{
    let teamSel=event.currentTarget.parentNode;
    teamSel.classList.add("hidden");

   const pref=document.querySelector("#preferiti");
    pref.classList.remove("hidden");
    const scritta=document.querySelector("#up1");
    scritta.classList.remove("hidden");

    const preferiti=document.querySelector("#preferiti .teams")
    
    for(team of datiTeams)
    {
        if(teamSel.id===team.nome)
        {
            let cont=document.createElement('div');
            cont.dataset.nome=team.nome
            cont.dataset.id_team=team.id_team

            //fetch("addTeamFavourite.php?q="+encodeURIComponent(team.id_team));
            fetch("/prova_laravel/public/teams/addTeamFavourite/"+encodeURIComponent(team.id_team));

            let logo=document.createElement('img');
            let nome=document.createElement('h1');
            logo.src=team.logo;
            cont.appendChild(logo);
            nome.textContent=team.nome;
            cont.appendChild(nome);
            let stella=document.createElement('img');
            stella.id='remove';
            stella.src='images/remove.png'
            stella.addEventListener("click",teamUnselected);
            cont.appendChild(stella);

            preferiti.appendChild(cont);

        }
    }
}


function teamUnselected(event)
{
    id_team=event.currentTarget.parentNode.dataset.id_team //prendo dal dataset del div padre l'id del team

    //Adesso rimuovo effettivamente la preferenza dal db
    //fetch("removeTeamFavourite.php?q="+encodeURIComponent(id_team));
    fetch("/prova_laravel/public/teams/removeTeamFavourite/"+encodeURIComponent(id_team));
    
    let teamSel=event.currentTarget.parentNode;
    //teamSel.classList.add("hidden"); si riusciva a buggare giocando apposta con la barra di ricerca
    teamSel.remove();
    let listaTeam=document.querySelectorAll("#scelta div");

    for(team of listaTeam)
    {
        if(team.id===teamSel.dataset.nome)
        {
            team.classList.remove("hidden")
        }
    }

    let listaP=document.querySelectorAll("#preferiti .teams div")
    let n=listaP.length;

    if(n===0)
    {
        const pref=document.querySelector("#preferiti");
    pref.classList.add("hidden");
    const scritta=document.querySelector("#up1");
    scritta.classList.add("hidden");
    }

   
}


function show(event)
{
    event.currentTarget.classList.add("hidden")

    let listaTeam=document.querySelectorAll("#scelta div");
    
    let i=0;
    for(team of listaTeam)
    {
        if(team.id===event.currentTarget.parentNode.id)
        {
            listaP=document.querySelectorAll("#scelta div #desc")
            listaN=document.querySelectorAll("#scelta div #nascondi")
            listaP[i].classList.remove("hidden")
            listaN[i].classList.remove("hidden")

            team.classList.add("scelto");
        }
        i++;
    }
}

function hide(event)
{
    event.currentTarget.classList.add("hidden")


    let listaTeam=document.querySelectorAll("#scelta div");
    
    let i=0;
    for(team of listaTeam)
    {
        if(team.id===event.currentTarget.parentNode.id)
        {
            listaP=document.querySelectorAll("#scelta div #desc")
            listaN=document.querySelectorAll("#scelta div #nascondi")
            listaP[i].classList.add("hidden")
            listaN[i].classList.add("hidden")

            listaA=document.querySelectorAll("#scelta div a")
            listaA[i].classList.remove("hidden")

            team.classList.remove("scelto");
        }
        i++;
    }
}

function cerca(event)
{
let favouriteList=document.querySelectorAll("#preferiti .teams div")

let listaTeam=document.querySelectorAll("#scelta div h1")
let valore=event.currentTarget.value
for(team of listaTeam)
{
    let Nteam=team.dataset.idTeam
    Nteam=Nteam.toLowerCase()
   
    valore=valore.toLowerCase()
    if(Nteam.search(valore)!==-1)
    {
        team.parentNode.classList.remove("hidden")

         for(preferito of favouriteList)
         {
              if(preferito.dataset.nome===team.parentNode.id)
             {
                  team.parentNode.classList.add("hidden")
             }
         }
    }
    else{
        team.parentNode.classList.add("hidden")
    }
}

if(valore===""){
        
    for(team of listaTeam){
        team.parentNode.classList.remove("hidden")

         for(preferito of favouriteList)
         {
              if(preferito.dataset.nome===team.parentNode.id)
             {
                  team.parentNode.classList.add("hidden")
             }
         }
    }
}

}
