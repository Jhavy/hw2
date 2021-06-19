const bannerNews=document.querySelector(".news");
var newsStatus = {}; // array associativo, id_notizia -> numero_like
for(i=1;i<5;i++)
{
    //fetch("getNews.php?q="+encodeURIComponent(i)).then(onResponse).then(fillNews);
    fetch("/prova_laravel/public/home/getNews/"+encodeURIComponent(i)).then(onResponse).then(fillNews);
}

function onResponse(response) {
    if (response.ok){
        return response.json();
    }
    else return null;
}

function fillNews(json)
{
    let div=document.createElement("div"); //contenitore singola notizia
    let img= document.createElement("img");  //foto
    img.classList.add("fotoNews")
    let title= document.createElement("h5");  //titolo
    let linea=document.createElement("div"); //linea
    linea.classList.add("line");
    let p=document.createElement("p"); //descrizione notizia
    let like=document.createElement("img");
    like.classList.add("like");
    
    let span=document.createElement("span");
    span.classList.add("likesCount");
    span.dataset.id_notizia=json.id;
    span.textContent="0"

    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(linea);
    div.appendChild(p);
    div.appendChild(like);
    div.appendChild(span);

    div.classList.add("notizia");
    div.dataset.id_notizia=json.id;
    bannerNews.appendChild(div);
    title.textContent=json.titolo;
    p.textContent=json.descrizione;
    img.src=json.percorso_foto;
    
    //effettuare checkLike con l'utente in sessione
    
    //fetch("checkLikeOnLoading.php?q="+encodeURIComponent(json.id)).then(onResponse).then(checkLikeOnLoading);
    fetch("/prova_laravel/public/home/checkLike/"+encodeURIComponent(json.id)).then(onResponse).then(checkLikeOnLoading);
}

function checkLikeOnLoading(json) //verifica se l'utente in sessione ha messo like o meno alle notizie
{
    
    notizie=bannerNews.querySelectorAll("div")
    
    if(json.id_notizia!=null)
    {
        
        //QUA L'UTENTE HA GIA' MESSO LIKE AL POST
        //json corrisponde ad un array associativo (id_notizia,id_user)
        for(div of notizie)
        {
            if(div.dataset.id_notizia==json.id_notizia)
            {
                
                //METTO LISTENER GIUSTO E IMMAGINE GIUSTA
                //FOTO DISLIKE
                //LISTENER DA ATTIVARE: RemoveLIKE
                image=div.querySelector(".like");
                image.src='images/dislike.png';
                image.addEventListener("click",removeLike)
                //updatespan();

                //fetch("loadLikes.php?q="+encodeURIComponent(json.id_notizia)).then(onResponse).then(loadLikes);
                fetch("/prova_laravel/public/home/loadLikes/"+encodeURIComponent(json.id_notizia)).then(onResponse).then(loadLikes);

            }
        }
    }
    else{
        
        //QUA NON HA MESSO MI PIACE AL POST
        //json corrisponde all'id della notizia
        for(div of notizie)
        {
            if(div.dataset.id_notizia==json)
            {
                //METTO LISTENER GIUSTO E IMMAGINE GIUSTA
                //FOTO LIKE
                //LISTENER DA ATTIVARE: AddLIKE
                image=div.querySelector(".like");
                image.src='images/like.png';
                image.addEventListener("click",addLike)
                //updatespan();
               // fetch("loadLikes.php?q="+encodeURIComponent(json)).then(onResponse).then(loadLikes);
               fetch("/prova_laravel/public/home/loadLikes/"+encodeURIComponent(json)).then(onResponse).then(loadLikes);

            }
        }
    }
    
}




function loadLikes(json) //conta i like totali di ciascun post, ESEGUE SOLO AL CARICAMENTO INIZIALE DELLA PAGINA
{
//se il post ha like il json sarà un array composto da 2 campi: id_notizia,conto (il conto dei like)
//se il post non ha nessun like, php ci darà un json con solamente un intero(id_notizia)
    if(json.conto!=null)
    {
        newsStatus[json.id_notizia]=json.conto;
        //IL POST HA DEI LIKE
        //CERCO LO SPAN RELATIVO ALLA NOTIZIA ED AGGIORNO IL SUO TEXT-CONTENT IN BASE AL VALORE 
        //CONTO FORNITO DAL JSON
        notizie=bannerNews.querySelectorAll("div.notizia")
        for(div of notizie)
        {
            if(div.dataset.id_notizia==json.id_notizia)
            {
                div.querySelector("span").textContent=json.conto;
            }
        }
    }
    else{
        newsStatus[json]=0;
        //IL POST NON HA LIKE
        //json = id_notizia
        notizie=bannerNews.querySelectorAll("div.notizia")
        for(div of notizie)
        {
            if(div.dataset.id_notizia==json)
            {
                div.querySelector("span").textContent="0";
            }
        }
    }
}





//GESTIONE LIKE SUI CLICK DELL'UTENTE

function addLike(event) //scatenato dal click sul pollice in su
{
    id_notizia=event.currentTarget.parentNode.dataset.id_notizia
    notizie=bannerNews.querySelectorAll("div.notizia")

    newsStatus[id_notizia]++;
    for(div of notizie)
    {
        if(div.dataset.id_notizia==id_notizia)
        {
            image=div.querySelector(".like");
            image.src='images/dislike.png';
            image.removeEventListener("click",addLike)
            image.addEventListener("click",removeLike)
            //fetch("addLike.php?q="+encodeURIComponent(id_notizia));
            fetch("/prova_laravel/public/home/addLike/"+encodeURIComponent(id_notizia));
            //updateSpan
            span=div.querySelector("span");
            span.textContent=newsStatus[id_notizia];
        }
    }
}

function removeLike(event) //scatenato dal click sul pollice in giù
{
    id_notizia=event.currentTarget.parentNode.dataset.id_notizia
    notizie=bannerNews.querySelectorAll("div.notizia")
    newsStatus[id_notizia]--;

    for(div of notizie)
    {
        if(div.dataset.id_notizia==id_notizia)
        {
            image=div.querySelector(".like");
            image.src='images/like.png';
            image.removeEventListener("click",removeLike)
            image.addEventListener("click",addLike)
            //fetch("removeLike.php?q="+encodeURIComponent(id_notizia));
            fetch("/prova_laravel/public/home/removeLike/"+encodeURIComponent(id_notizia));

            //updatespan
            
            span=div.querySelector("span");
            span.textContent=newsStatus[id_notizia];
        }
    }
}


//SISTEMA DI RICERCA GIF

apiKey="GHHjqQqOeuCm3bU7CEN8D7UJnwvY3SX3";
endPoint="https://api.giphy.com/v1/stickers/search";

document.querySelector("#tastoCerca").addEventListener("click",cercaGif);

function cercaGif(){
  valore=document.querySelector("#stringaCerca").value

  url=endPoint+"?api_key="+apiKey+"&q="+valore+"&limit=10";

fetch(url).then(onResponse).then(addGif);

}

function addGif(json){
  
  //console.log(json)

  gifContainer=document.querySelector("#gifContainer");
  gifContainer.innerHTML=""
  
  for(i=0;i<10;i++)
  {
    image=document.createElement("img")
    image.src=json.data[i].images.downsized.url
    gifContainer.appendChild(image)
    //console.log(i)
  }
}




