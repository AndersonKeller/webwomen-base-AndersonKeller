/* Desenvolva sua lógica aqui... */

const favJobs = [];
const text = ["Candidatar","Remover candidatrua"];

verifyFavJobs()

function renderJobs(){
    const uljobs = document.querySelector(".ul-jobs");
    uljobs.innerHTML = "";
   
   jobsData.forEach((e)=>{
    
    uljobs.insertAdjacentHTML("afterbegin",
    `<li id="${e.id}" class="li-jobs grey-2">
        <h3 class="title-4">${e.title}</h3>
        <span class="text-3">${e.enterprise}</span>
        <span class="text-3">${e.location}</span>
        <p class="text-2">${e.descrition}</p>
        <div class="div-infos-job">
            <span class="text-3 tag">${e.modalities[0]}</span>
            <button id="${e.id}" class="btn-candidate text-2">${e.textBtn}</button>
        </div>
     </li>`
        );
       
   });
   eventFavJob();
  
}


function eventFavJob(){
    const btnFav = document.querySelectorAll(".btn-candidate");
    const liJobs = Array.from(document.querySelectorAll(".li-jobs"));
    let liId = liJobs.map((e)=>{
         return e.id;
    })
    
    btnFav.forEach((btn)=>{
        btn.addEventListener("click",()=>{
           let id
            liId.forEach((li)=>{
                id = li;
                if(btn.id == id){
                    if(btn.innerText == "Candidatar"){
                        btn.innerText = text[1];
                        favJobs.push(jobsData[id]);
                        localStorage.setItem("favJob",JSON.stringify(favJobs));
                        renderFavJobs();
                    }else{
                        btn.innerText = text[0];
                        favJobs.splice(jobsData[id],1);
                        localStorage.setItem("favJob",JSON.stringify(favJobs));
                        renderFavJobs()
                    }
                    
                }
           })
            
        })
    })
}

function renderFavJobs(){
    const ulSelectedJobs = document.querySelector(".ul-selected-jobs");
    ulSelectedJobs.innerHTML = "";
    if(favJobs.length<1){
        ulSelectedJobs.insertAdjacentHTML("afterbegin",
    `<li class="li-selected-jobs grey-2">
    <p class="text-2">Você ainda não aplicou para nenhuma vaga</p>
     <div class="div-1"></div> 
     <div class="div-2"></div> 
     <div class="div-3"></div> 
     <div class="div-4"></div>
     <div class="div-5"></div>       
    </li>`
    )
    }
    else{
        favJobs.forEach((e)=>{
        ulSelectedJobs.insertAdjacentHTML("afterbegin",
        `<li class="li-selected-jobs">
        <p class="title-5">${e.title}</p>
        <button id="${e.id}" class="btn-remove"></button> 
        <span class="text-3">${e.enterprise}</span>
        <span class="text-3">${e.location}</span> 
      </li>`
        )
        })
        eventTrashButton()
    }
}
function eventTrashButton(){
    const btnTrash = document.querySelectorAll(".btn-remove");
        btnTrash.forEach((e)=>{
            e.addEventListener("click",(f)=>{
                
                favJobs.splice(favJobs[f.id],1);
                localStorage.setItem("favJob",JSON.stringify(favJobs))
                renderFavJobs();
                const btnFav = document.querySelectorAll(".btn-candidate");
                if(btnFav.id == f.id){
                    if(btnFav.innerText == "Candidatar"){
                        btnFav.innerText = text[0];
                       renderJobs();
                      
                    }else{
                        btnFav.innerText = text[1];
                        renderJobs();
                    }
                }
            })
        })
    }
function verifyFavJobs(){
    
   
   let favJobJSON = JSON.parse(localStorage.getItem("favJob"));
   console.log(favJobJSON)
   
    if(favJobJSON){
      favJobJSON.forEach((e)=>{
        favJobs.push(e);
      })
    }

    jobsData.forEach((e)=>{
        if(favJobs.find(({id})=> id == e.id)){
            e.textBtn = text[1];
        }
        else{
           e.textBtn = text[0];
        }
       
    })
    renderJobs();
    renderFavJobs();
}
