const carrelloPulsante=document.querySelector("#carrelloPulsante");
carrelloPulsante.addEventListener("click",showCarrello);
const carrello=document.querySelector("#carrello")

var cartList=[];
var spesa=0;
listItem=document.createElement("div");
listItem.classList.add("listItem")
carrello.appendChild(listItem)




linea=document.createElement("div");
        linea.classList.add("line")
        carrello.appendChild(linea)

        divTotale=document.createElement("div");
        divTotale.classList.add("divTotale")

            labelScritta=document.createElement("label");
            labelScritta.textContent="Totale:"
            divTotale.appendChild(labelScritta)

            labelCosto=document.createElement("label");
            labelCosto.classList.add("labelCosto")
            labelCosto.textContent="0 €"
            divTotale.appendChild(labelCosto)

        carrello.appendChild(divTotale);

        form=document.createElement("form")
            button2=document.createElement("input")
            button2.type="submit"
            button2.value="acquista"
            button2.classList.add("acquista")
            button2.disabled=true
            button2.addEventListener("click",acquista)

        form.method="post"
        form.name="formAcquista"
        form.id="formAcquista"
        //form.action="/prova_laravel/public/shop/acquista"
        token=document.createElement("input")
            token.type="hidden"
            token.name="_token"
            var content=document.querySelector("meta[name='csrf-token']").getAttribute("content");
            token.value=content

        form.appendChild(token)
        form.appendChild(button2)

        carrello.appendChild(form);

        cestino=document.createElement("img")
        cestino.src="images/garbage.png";
        cestino.classList.add("cestino")
        cestino.addEventListener("click",svuotaCestino)
        carrello.appendChild(cestino)




function showCarrello(event)
{
    event.currentTarget.removeEventListener("click",showCarrello);
    carrelloPulsante.addEventListener("click",hideCarrello);

    carrello.classList.remove("hidden");
    carrello.classList.add("show");

    aggiungiModale();
}

function hideCarrello(event)
{
    event.currentTarget.removeEventListener("click",hideCarrello);
    carrelloPulsante.addEventListener("click",showCarrello);

    carrello.classList.add("hidden");
    carrello.classList.remove("show");

    rimuoviModale();
}



// CARICAMENTO PRODOTTI SULLA PAGINA
const productList=document.querySelector("#productList");

fetch("/prova_laravel/public/shop/getGPdati").then(onResponse).then(fillProductList);

function onResponse(response) {
    if (response.ok){
        return response.json();
    }
    else return null;
}

function fillProductList(json)
{
    //console.log(json);

    i=0;
    for(gp of json)
    {
    
    div=document.createElement("div")
    div.classList.add("prodotto")
    div.dataset.id_gp=json[i].id;
    div.dataset.nome_gp=json[i].nome;    
    div.dataset.qta=0;

        image=document.createElement("img")
        image.src=json[i].foto;
        div.appendChild(image)


        datiBiglietto=document.createElement("div")
        datiBiglietto.classList.add("datiBiglietto")

            h4=document.createElement("h4")
            h4.textContent=json[i].nome;
            datiBiglietto.appendChild(h4)

            p1=document.createElement("p")
            p1.classList.add("circuito")
            p1.textContent=json[i].circuito;
            datiBiglietto.appendChild(p1)

            p2=document.createElement("p")
            p2.classList.add("data")
            p2.textContent=json[i].data_gara;
            datiBiglietto.appendChild(p2)
        
        div.appendChild(datiBiglietto);

        acquisto=document.createElement("div")
        acquisto.classList.add("acquisto")

            span=document.createElement("span")
            span.textContent=" Price: (100€ x 1) "
            acquisto.appendChild(span)

            quantita=document.createElement("div")
            quantita.classList.add("quantita")

                meno=document.createElement("img")
                meno.src="./images/meno.png";
                meno.addEventListener("click",diminuisciQta);
                quantita.appendChild(meno)

                num=document.createElement("h4")
                num.textContent="0"
                quantita.appendChild(num)

                piu=document.createElement("img")
                piu.src="./images/piu.png";
                piu.addEventListener("click",aumentaQta);
                quantita.appendChild(piu)

            acquisto.appendChild(quantita);

                button=document.createElement("input")
                button.type="submit"
                button.value="aggiungi"
                button.dataset.id_gp=div.dataset.id_gp
                button.dataset.nome_gp=div.dataset.nome_gp
                button.addEventListener("click",addToCart)

            acquisto.appendChild(button)

        div.appendChild(acquisto);

    
    productList.appendChild(div);
    i++;
    }
}


function aumentaQta(event)
{
    event.currentTarget.parentNode.parentNode.parentNode.dataset.qta++;

    event.currentTarget.parentNode.querySelector("h4").textContent=event.currentTarget.parentNode.parentNode.parentNode.dataset.qta
}

function diminuisciQta(event)
{
    if(event.currentTarget.parentNode.parentNode.parentNode.dataset.qta>0)
    {
        event.currentTarget.parentNode.parentNode.parentNode.dataset.qta--;
        event.currentTarget.parentNode.querySelector("h4").textContent=event.currentTarget.parentNode.parentNode.parentNode.dataset.qta
    }
  
}

function addToCart(event)
{

    div=event.currentTarget.parentNode.parentNode

    if(div.dataset.qta>0 && cartList.length<5)
    {
        document.querySelector(".acquista").disabled=false;
        id_prodotto=div.dataset.id_gp
        nome_prodotto=div.dataset.nome_gp
        qta_prodotto=div.dataset.qta

        
        //CONTROLLO SE IL PRODOTTO E' GIA' PRESENTE NEL CARRELLO
        var j=0;
        var pos=-1;
        if(cartList.length>0)
        {
            for(itemListed of cartList)
            {
                if(itemListed.id_prodotto == id_prodotto)
                {
                    pos=j;
                }  
                j++;    
            }

            if(pos>=0)
            {
                //item già presente, aggiorna quindi solamente la qta 
                //console.log("presente")
                cartList[pos].qta=parseInt(cartList[pos].qta) + parseInt(qta_prodotto);

                //aggiorno il front end dell'item nel carrello, cioè la sua quantità
                
                lunghezzaCart=listItem.querySelectorAll(".item")
                
                for(item of lunghezzaCart)
                {
                    
                    if(item.dataset.id_prodotto==id_prodotto)
                    {
                        item.dataset.qta_prodotto=cartList[pos].qta;
                        item.querySelector(".itemQta").textContent="x "+item.dataset.qta_prodotto;
                    }
                }
            }
            else{
                //AGGIUNGILO UN NUOVO PRODOTTO AL CARRELLO
            let subOrdine=[];
            subOrdine['id_prodotto']=id_prodotto
            subOrdine['nome_prodotto']=nome_prodotto
            subOrdine['qta']=qta_prodotto


            cartList.push(subOrdine);

            //aggiorna il carrello front end
            item=document.createElement("div");
            item.classList.add("item");

            item.dataset.id_prodotto=div.dataset.id_gp
            item.dataset.nome_prodotto=div.dataset.nome_gp
            item.dataset.qta_prodotto=div.dataset.qta

                labelNomeProdotto=document.createElement("label");
                labelNomeProdotto.textContent=item.dataset.nome_prodotto
                item.appendChild(labelNomeProdotto)

                labelQta=document.createElement("label");
                labelQta.textContent="x "+item.dataset.qta_prodotto
                labelQta.classList.add("itemQta")
                item.appendChild(labelQta)

            listItem.appendChild(item)
            }
        }
        else{
            //AGGIUNGILO UN NUOVO PRODOTTO AL CARRELLO
            let subOrdine=[];
            subOrdine['id_prodotto']=id_prodotto
            subOrdine['nome_prodotto']=nome_prodotto
            subOrdine['qta']=qta_prodotto

            cartList.push(subOrdine);

            //aggiorna il carrello front end
            item=document.createElement("div");
            item.classList.add("item");

            item.dataset.id_prodotto=div.dataset.id_gp
            item.dataset.nome_prodotto=div.dataset.nome_gp
            item.dataset.qta_prodotto=div.dataset.qta

                labelNomeProdotto=document.createElement("label");
                labelNomeProdotto.textContent=item.dataset.nome_prodotto
                item.appendChild(labelNomeProdotto)

                labelQta=document.createElement("label");
                labelQta.textContent="x "+item.dataset.qta_prodotto
                labelQta.classList.add("itemQta")
                item.appendChild(labelQta)

            listItem.appendChild(item)
        }    

        //CALCOLO TOTALE CARRELLO
         spesa=0;
        for(itemListed of cartList)
        {
            spesa+=parseInt(itemListed.qta)
        }

        spesa=spesa*100;
        carrello.querySelector(".labelCosto").textContent=spesa+" €"

        //REFRESHA A 0 IL NUMERO AGGIUNGIBILE AL CARRELLO
        quantita=event.currentTarget.parentNode.querySelector(".quantita")
        quantita.parentNode.parentNode.dataset.qta=0;
        quantita.querySelector("h4").textContent="0";

    }
    else{
            if(div.dataset.qta>0)
            {
                //SE IL PRODOTTO E' NEL CARRELLO AGGIUNGI COMUNQUE (SOMMA LE QTA)
                id_prodotto=div.dataset.id_gp
                nome_prodotto=div.dataset.nome_gp
                qta_prodotto=div.dataset.qta

            
                //CONTROLLO SE IL PRODOTTO E' GIA' PRESENTE NEL CARRELLO
                var j=0;
                var pos=-1;
                if(cartList.length>0)
                {
                    for(itemListed of cartList)
                    {
                        if(itemListed.id_prodotto == id_prodotto)
                        {
                            pos=j;
                        }  
                        j++;    
                    }

                    if(pos>=0)
                    {
                        //item già presente, aggiorna quindi solamente la qta 
                        //console.log("presente")
                        cartList[pos].qta=parseInt(cartList[pos].qta) + parseInt(qta_prodotto);

                        //aggiorno il front end dell'item nel carrello, cioè la sua quantità
                        
                        lunghezzaCart=listItem.querySelectorAll(".item")
                        
                        for(item of lunghezzaCart)
                        {
                            
                            if(item.dataset.id_prodotto==id_prodotto)
                            {
                                item.dataset.qta_prodotto=cartList[pos].qta;
                                item.querySelector(".itemQta").textContent="x "+item.dataset.qta_prodotto;
                            }
                        }
                    }
                }
            }
            //CALCOLO TOTALE CARRELLO
            spesa=0;
            for(itemListed of cartList)
            {
                spesa+=parseInt(itemListed.qta)
            }
    
            spesa=spesa*100;
            carrello.querySelector(".labelCosto").textContent=spesa+" €"
    
            //REFRESHA A 0 IL NUMERO AGGIUNGIBILE AL CARRELLO
            quantita=event.currentTarget.parentNode.querySelector(".quantita")
            quantita.parentNode.parentNode.dataset.qta=0;
            quantita.querySelector("h4").textContent="0";

        }
  }


function svuotaCestino(event)
{
    document.querySelector(".acquista").disabled=true;
    cartList=[];
    while (listItem.firstChild) {
        listItem.removeChild(listItem.firstChild);
    }

    carrello.querySelector(".labelCosto").textContent="0 €"
}


function acquista(event)
{
    for(item of cartList)
    {
        form=document.querySelector("#formAcquista")

            id_prodotto=document.createElement("input")
            id_prodotto.type="hidden"
            id_prodotto.name="id_prodotto[]"
            id_prodotto.value=item.id_prodotto

            nome_prodotto=document.createElement("input")
            nome_prodotto.type="hidden"
            nome_prodotto.name="nome_prodotto[]"
            nome_prodotto.value=item.nome_prodotto

            qta_prodotto=document.createElement("input")
            qta_prodotto.type="hidden"
            qta_prodotto.name="qta_prodotto[]"
            qta_prodotto.value=item.qta

        form.appendChild(id_prodotto)
        form.appendChild(nome_prodotto)
        form.appendChild(qta_prodotto)
    }
}



function aggiungiModale()
{
    document.querySelector("#modal-view").classList.remove("hidden");
    document.querySelector("#modal-view").addEventListener("click",rimuoviCarrelloModale)
    document.querySelector("header").addEventListener("click",rimuoviCarrelloModale)
}

function rimuoviModale(){
    document.querySelector("#modal-view").classList.add("hidden");
}

function rimuoviCarrelloModale(){
    document.querySelector("#modal-view").classList.add("hidden");
    document.querySelector("header").removeEventListener("click",rimuoviCarrelloModale)
    carrelloPulsante.removeEventListener("click",hideCarrello);
    carrelloPulsante.addEventListener("click",showCarrello);

    carrello.classList.add("hidden");
    carrello.classList.remove("show");

}