const banner=document.querySelectorAll(".spoiler"); //sono 2 banner da riempire con 3 loghi ciascuno

fetch("/prova_laravel/public/login/getData").then(onResponse).then(addTitle);

function onResponse(response) {
    if (response.ok){
        return response.json();
    }
    else return null;
}

function addTitle(json)
{
    for(i=0;i<2;i++){
        line1=document.createElement("div");
        line1.classList.add("line");
        banner[i].appendChild(line1);

        h1=document.createElement("h1");
        h1.classList.add("titleSpoiler")
        h1.textContent=json[i].titolo;
        banner[i].appendChild(h1);

        p=document.createElement("p");
        p.classList.add("pSpoiler")
        p.textContent=json[i].paragrafo;
        banner[i].appendChild(p);

        line2=document.createElement("div");
        line2.classList.add("line");
        banner[i].appendChild(line2);
    }
    fetch("/prova_laravel/public/login/getData/loghi").then(onResponse).then(addLogos); 
}

function addLogos(json)
{
    //console.log(json);
    for(i=1;i<4;i++)
    {
        image=document.createElement("img");
        image.classList.add("logo");
        image.src=json[i-1].logo
        banner[0].appendChild(image);
    }

    for(i=4;i<7;i++)
    {
        image=document.createElement("img");
        image.classList.add("logo");
        image.src=json[i-1].logo
        banner[1].appendChild(image);
    }
}