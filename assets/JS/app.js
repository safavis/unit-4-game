let char_chosen=false
let defender_chosen_num=0
let defender_chosen=false
let defender_game_over=true
let isover=false
let isimage=false
let enemy_class
let chosen_class
let chosen_index
let enemies
let total_power=0
warrior=[{name:"Obi-Wan Kenobi", class_type:"obiwan",score:120, power:8},{name:"Luke skywalker", class_type:"luke",score:100,power:5},{name:"Darth Sidious", class_type:"sidious",score:150,power:20},{name:"Darth Maul", class_type:"maul",score:180,power:25}]

document.addEventListener('click',({target})=>{
    isimage=(target.className.slice(target.className.length-3,target.className.length)==="img")?true:false
    if(isover===false)
       {if(char_chosen===false && isimage)
            {   char_chosen=true
                chosen_class=target.className.slice(0,target.className.length-4)
                enemies=warrior.filter(word=>{
                        return word.class_type!==chosen_class
                })
                
                for (let i=0; i<4;i++)
                {
                    document.querySelector(`.${warrior[i].class_type}`).innerHTML=''
                }
                document.querySelector(".characters").innerHTML=``
        

                    your_char_div=document.createElement('div')
                    your_char_div.classList=chosen_class
                    chosen_index=warrior.map(function(e) { return e.class_type; }).indexOf(chosen_class);

                    your_char_div.innerHTML=`
                    <img src="./assets/images/${chosen_class}.png" class="${chosen_class}_img" alt="${chosen_class}">
                    <div class="${chosen_class}_score">
                        <p class="text_bar">${warrior[chosen_index].name}</p>
                        <p class="text_bar">${warrior[chosen_index].score}</p>
                    </div>
                    `
                    document.querySelector(".your_char").append(your_char_div)

                    document.querySelector(`.${chosen_class}_img`).setAttribute("style", " border: 7px solid green;")

                for (let i=0; i<enemies.length;i++)
                {
                    enemy_div=document.createElement('div')
                    enemy_div.classList=enemies[i].class_type
                    enemy_div.innerHTML=`
                    <img src="./assets/images/${enemies[i].class_type}.png " class="${enemies[i].class_type}_img" alt="${enemies[i].class_type}">
                    <div class="${enemies[i].class_type}_score">
                        <p class="text_bar">${enemies[i].name}</p>
                        <p class="text_bar">${enemies[i].score}</p>
                    </div>
                    `
                    document.querySelector(".avail_enemies").append(enemy_div)
                    document.querySelector(`.${enemies[i].class_type}_img`).setAttribute("style", " border: 7px solid red;")
                    document.querySelector(`.${enemies[i].class_type}_img`).setAttribute("style", ` grid-column: ${i} /span 1 `)

                }
            }
        else if( defender_chosen_num<3  && defender_game_over===true && isimage)
            {   
                console.log("entekhab dsohman")
                char_chosen=true
                defender_game_over=false
                defender_chosen_num++
                enemy_class=target.className.slice(0,target.className.length-4)
                let defender_aux=enemies.filter(word=>{
                        return word.class_type===enemy_class
                })
                // defender.push(defender_aux[0].class_type)
                // console.log( document.querySelector(`.${defender_aux[0].class_type}`))
                    document.querySelector(`.${defender_aux[0].class_type}`).innerHTML=``
                

                    your_char_div=document.createElement('div')
                    your_char_div.classList=enemy_class
                    let enemy_index=enemies.map(function(e) { return e.class_type; }).indexOf(enemy_class);

                    your_char_div.innerHTML=`
                    <img src="./assets/images/${enemy_class}.png" class="${enemy_class}_img" alt="${enemy_class}">
                    <div class="${enemy_class}_score">
                        <p class="text_bar">${enemies[enemy_index].name}</p>
                        <p class="text_bar">${enemies[enemy_index].score}</p>
                    </div>
                    `
                    document.querySelector(".defender").innerHTML=''
                    document.querySelector(".defender").append(your_char_div)
                    document.querySelector(`.${enemy_class}_img`).setAttribute("style", " border: 7px solid blue;")

        }else if( defender_game_over===false && target.className==="attack" )
        {

        let enemy_index=warrior.map(function(e) { return e.class_type; }).indexOf(enemy_class);
        if(warrior[enemy_index].score>0 && warrior[chosen_index].score>0){
                total_power=total_power+ warrior[chosen_index].power
                warrior[enemy_index].score=warrior[enemy_index].score-total_power
                warrior[chosen_index].score=warrior[chosen_index].score-warrior[enemy_index].power

                document.querySelector(`.${chosen_class}_score`).innerHTML=`<p class="text_bar">${warrior[chosen_index].name}</p>
                <p class="text_bar">${warrior[chosen_index].score}</p>`
                document.querySelector(`.${enemy_class}_score`).innerHTML=`<p class="text_bar">${warrior[enemy_index].name}</p>
                <p class="text_bar">${warrior[enemy_index].score}</p>`
            
                report_text=document.createElement('div')
                report_text.innerHTML=`<p class="text_bar">You attacked ${warrior[enemy_index].name} for power ${total_power}</p>
                <p class="text_bar"> ${warrior[enemy_index].name} attacked you for power ${warrior[enemy_index].power}</p>`
                document.querySelector(".report").innerHTML=``
                document.querySelector(".report").append(report_text)
        if(warrior[enemy_index].score>0 && warrior[chosen_index].score<=0){
                defender_game_over=true
                isover=true
                report=document.createElement('div')
                report.innerHTML=`
                <button class="restart_button">Restart</button>
                <p class="text_bar">Game over! You were deteated. Please click on restart to satrt a new game.</p> `
                    document.querySelector(".defender").innerHTML=''
                    document.querySelector(".defender").append(report)
                    document.querySelector(".report").innerHTML=``

            }
            else if(warrior[enemy_index].score<=0 && warrior[chosen_index].score>0  && defender_chosen_num<3){
                defender_game_over=true
                report=document.createElement('div')
                report.innerHTML=`
                    
                        <p class="text_bar">you have defeated ${warrior[enemy_index].name}. You can choose to fight another enemy</p>
                        `
                    document.querySelector(".defender").innerHTML=''
                    document.querySelector(".defender").append(report)
                    document.querySelector(".report").innerHTML=``

            }
            else if(warrior[enemy_index].score<=0 && warrior[chosen_index].score>0  && defender_chosen_num==3)
            {
                isover=true
                defender_game_over=true
                report=document.createElement('div')
                report.innerHTML=`
                        <button class="restart_button">Restart</button>
                        <p class="text_bar">You Won. Please click on restart button to start a new game.</p>
                        `
                    document.querySelector(".defender").innerHTML=''
                    document.querySelector(".defender").append(report)
                    document.querySelector(".report").innerHTML=``

            }
        }
        }
    }
if(target.className==="restart_button"){
    document.querySelector(".defender").innerHTML=''
    document.querySelector(".report").innerHTML=''
    document.querySelector(".avail_enemies").innerHTML=''
    document.querySelector(".your_char").innerHTML=''
    char_chosen=false
    isover=false
    defender_chosen_num=0
    defender_chosen=false
    defender_game_over=true
    total_power=0
    warrior=[{name:"Obi-Wan Kenobi", class_type:"obiwan",score:120, power:8},{name:"Luke skywalker", class_type:"luke",score:100,power:5},{name:"Darth Sidious", class_type:"sidious",score:150,power:20},{name:"Darth Maul", class_type:"maul",score:180,power:25}]
    for (let i=0; i<warrior.length;i++)
        {
            re_div=document.createElement('div')
            re_div.classList=warrior[i].class_type
            re_div.innerHTML=`
            <img src="./assets/images/${warrior[i].class_type}.png " class="${warrior[i].class_type}_img" alt="${warrior[i].class_type}">
            <div class="${warrior[i].class_type}_score">
                <p class="text_bar">${warrior[i].name}</p>
                <p class="text_bar">${warrior[i].score}</p>
            </div>
            `
            document.querySelector(".characters").append(re_div)
            document.querySelector(`.${warrior[i].class_type}_img`).setAttribute("style", " border: 7px solid white;")

        }

}
})
