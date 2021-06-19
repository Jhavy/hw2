//VERIFICA SE L'UTENTE HA ORDINI NEL DB

//fetch("getOrdini.php").then(onResponse).then(onJson);
fetch("/prova_laravel/public/ordini/getOrdini").then(onResponse).then(onJson);


function onResponse(response) {
    if (response.ok){
        return response.json();
    }
    else return null;
}

function onJson(json)
{
    //console.log(json)
    if(json==null)
    {
        //rendi fissa la pagine e visualizza il div di errore (no orders)
        document.querySelector("#noOrders").classList.remove("hidden");
        document.querySelector("#noOrders").classList.add("show");

        document.querySelector("body").classList.add("noScroll")
        document.querySelector("section").classList.add("sectionFixed")
    }
    else{
        
        //mostra gli ordini
        document.querySelector("body").classList.remove("noScroll")
        document.querySelector("body").classList.add("scroll")

        document.querySelector("section").classList.remove("sectionFixed")
        document.querySelector("section").classList.add("sectionAuto")

        //per ciascun ordine, crea un div ed inserisce i dati con la fetch
        for(ordine of json)
        {
            //console.log(ordine)
            id_ordine=ordine.id_ordine
            //console.log(id_ordine)
            //adesso riempiamo i vari div creati ottenendo i dati dei singoli ordini da un'altra fetch
            //i dettagli dell'ordine sono in un'altra tabella (subOrdine)
            fetch("/prova_laravel/public/ordini/getSubOrdini/"+encodeURIComponent(id_ordine)).then(onResponse).then(fillOrder);
        }
    }
}

function fillOrder(json)
{
    //console.log(json)
    num_articoli=json.length;

    id_ordine=json[0].id_ordine
    costo_tot=0;
    
    div=document.createElement("div");
    div.classList.add("ordine")
    div.dataset.id_ordine=id_ordine

        labelID=document.createElement("label")
        labelID.classList.add("ordineID")
        labelID.textContent="ID ordine: #"+id_ordine
        div.appendChild(labelID)

        subOrdine=document.createElement("div")
        subOrdine.classList.add("subordine")

            for(i=0;i<num_articoli;i++)
            {
                label_articolo=document.createElement("label")
                label_articolo.classList.add("articolo")
                label_articolo.textContent=json[i].nome_prodotto+" x"+json[i].qta_prodotto

                subOrdine.appendChild(label_articolo);

                costo_tot=costo_tot+ (parseInt(json[i].qta_prodotto))
                //console.log(costo_tot)
            }

        div.appendChild(subOrdine)

        totale=document.createElement("div")
        totale.classList.add("totale")

            scrittaTotale=document.createElement("label")
            scrittaTotale.classList.add("scrittaTotale")
            scrittaTotale.textContent="TOTALE"
            totale.appendChild(scrittaTotale)

            valoreTotale=document.createElement("label")
            valoreTotale.classList.add("valoreTotale")
            costo_tot=costo_tot * 100
            valoreTotale.textContent=costo_tot +"€"
            totale.appendChild(valoreTotale)


        div.appendChild(totale)


    document.querySelector("section").appendChild(div) 
}