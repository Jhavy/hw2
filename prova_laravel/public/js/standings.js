const classifica=document.querySelector("#classifica")
var arrayPreferiti;

colonne=document.createElement("tr");
th1=document.createElement("th");
th1.textContent="Posizione"
colonne.appendChild(th1)
th2=document.createElement("th");
th2.textContent="Pilota"
colonne.appendChild(th2)
th3=document.createElement("th");
th3.textContent="Team"
colonne.appendChild(th3)
th4=document.createElement("th");
th4.textContent="Punti"
colonne.appendChild(th4)
classifica.appendChild(colonne)

//salvo in un array i team preferiti, così da evidenziarli
//fetch("getTeamPreferitiArray.php").then(onResponse).then(favArray);
fetch("/prova_laravel/public/standings/getTeamPreferitiArray").then(onResponse).then(favArray);



function onResponse(response) {
    if (response.ok){
        return response.json();
    }
    else return null;
}

function favArray(json)
{
  //console.log(json)
  arrayPreferiti=json;

  //RICEVO DAL SERVER L'ARRAY CON i nomi dei team + dati piloti
  //fetch("getDataRiders.php").then(onResponse).then(addInTable);
  fetch("/prova_laravel/public/standings/getDataRiders").then(onResponse).then(addInTable);
}

function addInTable(json)
{
    piloti=json;
    piloti.sort(comparePoints);
    
    let i=0;
    for(pilota of piloti)
    {
      
        i++;
        row=document.createElement("tr")

        td1=document.createElement("td");
        td1.textContent=i;
        row.appendChild(td1)
        td2=document.createElement("td");
        td2.textContent=pilota.nome
        row.appendChild(td2)
        td3=document.createElement("td");
        td3.textContent=pilota.nome_team;
        row.appendChild(td3)
        td4=document.createElement("td");
        td4.textContent=pilota.punti;
        row.appendChild(td4)    
        
        if (arrayPreferiti!=null)
        {
          for(teamPreferito of arrayPreferiti)
          {
            //console.log(teamPreferito);
            if(pilota.id_team==teamPreferito.id_team)
            {
              row.style.backgroundColor="yellow";
            }
          }
        }
        classifica.appendChild(row);
    }
}



//FUNZIONE COMPARE, PER ORDINARE IL JSON ARRIVATO DAL SERVER, i punti arrivano in formato stringa, quindi occorre il parseInt()
function comparePoints(pilota1, pilota2) {
    if ( parseInt(pilota1.punti) < parseInt(pilota2.punti)){
      return 1;
    }
    if (parseInt(pilota1.punti) > parseInt(pilota2.punti)){
      return -1;
    }
    return 0;
  }


