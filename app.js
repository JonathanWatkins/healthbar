console.log("run")
let maxHealth = 50
let maxArmour = 50
let currentHealth = 50
let currentArmour = 35
// let interval = 1000
let dotRunning = false
let rageRunning = false
// let hitvalue = 10
let towerslist = []
let showTowers = false
let timerintervals = []

// document.getElementById("health-text").innerHTML = currentHealth.toLocaleString() + "/" + maxHealth.toLocaleString()
// document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

function showFloatText(text, color) {
    const el = document.createElement('div')
    el.className = 'float-text'
    el.innerText = text
    el.style.color = color

    // Spawn near the health bar, adjust selector to whatever makes sense
    const bar = document.getElementById("bar-frame")
    const rect = bar.getBoundingClientRect()
    el.style.left = rect.left + Math.random() * rect.width + 'px'
    el.style.top = rect.bottom + 'px'

    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
}

function updateScreen() {
    // if armour > 0 show armour bar
    // otherwise show health bar

    // Text shows armour value if player has armour, otherwise it shows health
    if (currentArmour > 0) {
        // document.getElementById("bar-health").style.visibility = "hidden";
        // document.getElementById("bar-armour").style.visibility = "visible";
        document.getElementById("bar-text-health").style.fontSize = "8pt"
        document.getElementById("bar-text-armour").style.fontSize = "12pt"
        document.getElementById("bar-text-armour").style.display = "block";
        
        
    } else {
        document.getElementById("bar-text-health").style.fontSize = "12pt"
        document.getElementById("bar-text-armour").style.display = "none";
        
        // document.getElementById("bar-health").style.visibility = "visible";
        // document.getElementById("bar-armour").style.visibility = "hidden";
        
    }
    document.getElementById("bar-text-health").innerHTML = currentHealth.toLocaleString() + "/" + maxHealth.toLocaleString()
    document.getElementById("bar-text-armour").innerHTML = currentArmour.toLocaleString() + "/" + maxArmour.toLocaleString()
    
    document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

     if (maxHealth == 0) {
        document.getElementById("bar-health").style.width = 0 + "%"
    } else  {
        document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"
    }
    
    if (maxArmour == 0) {
        document.getElementById("bar-armour").style.width = 0 + "%"
    } else  {
        document.getElementById("bar-armour").style.width = currentArmour/maxArmour*100 + "%"
    }

    
}

document.getElementById("maxhealth").addEventListener("change",function(){
    let maxHealthChange = parseInt(document.getElementById("maxhealth").value)
    
    currentHealth = maxHealthChange
    maxHealth = maxHealthChange

    updateScreen()

})

document.getElementById("maxarmour").addEventListener("change",function(){
    let maxArmourChange = parseInt(document.getElementById("maxarmour").value)
    
    currentArmour = maxArmourChange
    maxArmour = maxArmourChange

    updateScreen()

})



function doDamage(hitValue, towerName) {

    if (hitValue > 0) {
        showFloatText(`${towerName} -${hitValue}`, 'red')
        let hitRemaining = hitValue
        if (currentArmour > hitValue) {
            console.log("armour hit")
            currentArmour = currentArmour - hitValue
            hitRemaining = 0
        } else {
            console.log("armour + health hit")
            hitRemaining = hitRemaining - currentArmour // need to calculate hit remaining before currentArmour set to 0
            currentArmour = 0
        }
        console.log(currentArmour)
        console.log(hitRemaining)
        currentHealth = currentHealth > hitRemaining ? currentHealth - hitRemaining : 0    
    } else { // hitValue less than 0 is a heal
        let healRemaining = -hitValue
        showFloatText(`${towerName} +${healRemaining}`, 'blue')

        currentHealth = currentHealth + healRemaining
        if (currentHealth > maxHealth) {
            healRemaining = currentHealth - maxHealth
            currentHealth = maxHealth
            currentArmour = currentArmour + healRemaining > maxArmour ? maxArmour : currentArmour + healRemaining
        }
        
    }
}


document.getElementById("hit-button").addEventListener("click", function(){
    // if has armour, damage armour first, then remaining damage is done to health
    
    // let hitValue = parseInt(document.getElementById("hit-value").value)
    let totalHitValue = 0
    for (let i=0; i<towerslist.length; i++) {
        totalHitValue = totalHitValue + towerslist[i].hitValue
    }

    doDamage(totalHitValue, "")
    
    // checkEffects()
    updateScreen()
})

document.getElementById("dot-button").addEventListener("click", function(){
    if (dotRunning === false) {
        

        for (let i = 0; i < towerslist.length; i++) {

            let hitValue = parseInt(towerslist[i].hitValue)
            let dotInterval = parseInt(towerslist[i].dotInterval)

            let interval = setInterval(function() {
                    // checkEffects()
                    doDamage(hitValue, towerslist[i].name)
                    updateScreen()
            }, dotInterval)
            timerintervals.push(interval)
        
        }

        document.getElementById("dot-button").value = "Stop"
        dotRunning = true 
    } else { // dot running === true
        for (let i = 0; i < timerintervals.length; i++) {
            clearInterval(timerintervals[i])
        }
        
        document.getElementById("dot-button").value = "Dot"
        dotRunning = false     
    }  
})

document.getElementById("rage-button").addEventListener("click", function(){
    if (rageRunning === false) {
              
       

        document.getElementById("rage-button").value = "Stop Rage"
        document.body.style.animation = "argh-my-eyes 0.2s infinite"
        document.getElementById("effectText").innerHTML = "<p>RAGE!!!!</p>"
        rageRunning = true
    } else { // rage running === false
        
        document.getElementById("rage-button").value = "Rage"
        rageRunning = false
        document.body.style.animation = "none"
        document.getElementById("effectText").innerHTML = "<p></p>"
    }  
})

function checkEffects() {
    if (currentHealth/maxHealth < 0.5) {
        document.body.style.animation = "argh-my-eyes 0.2s infinite"
        document.getElementById("rage-button").value = "Stop Rage"
        document.getElementById("effectText").innerHTML = "<p>U RAGE!!! MEEEE!</p>"
        rageRunning = true
    }
}

function addTower(tower, towerlistIndex) {
    let towerListElem = document.getElementById("towers-list")

    towerListElem.insertAdjacentHTML('beforeend', 
        `<div class="towerRow" id="tower-row-${towerlistIndex}">
            <div id="tower-name-${towerlistIndex}">${tower.name}</div>
            <div id="tower-hitvalue-${towerlistIndex}">${tower.hitValue}</div>
            <div id="tower-dotinterval-${towerlistIndex}">${tower.dotInterval}</div>
            <div id="tower-actions-${towerlistIndex}"></div>
        </div>`
    )

    let towerActionsDivElem = document.getElementById(`tower-actions-${towerlistIndex}`)

    const saveBtn = document.createElement('input')
    saveBtn.type = 'button'
    saveBtn.id = `update-tower-${towerlistIndex}`
    saveBtn.value = 'Save'
    saveBtn.style.display = 'none'

    const cancelBtn = document.createElement('input')
    cancelBtn.type = 'button'
    cancelBtn.id = `cancel-tower-${towerlistIndex}`
    cancelBtn.value = 'Cancel'
    cancelBtn.style.display = 'none'

    const editBtn = document.createElement('input')
    editBtn.type = 'button'
    editBtn.id = `edit-tower-${towerlistIndex}`
    editBtn.value = 'Edit'

    const removeBtn = document.createElement('input')
    removeBtn.type = 'button'
    removeBtn.id = `remove-tower-${towerlistIndex}`
    removeBtn.value = 'Remove'

    editBtn.addEventListener('click', function() {
        // Swap text divs for input boxes
        document.getElementById(`tower-name-${towerlistIndex}`).innerHTML = 
            `<input type="text" id="tower-name-input-${towerlistIndex}" value="${towerslist[towerlistIndex].name}">`
        document.getElementById(`tower-hitvalue-${towerlistIndex}`).innerHTML = 
            `<input type="number" id="tower-hitvalue-input-${towerlistIndex}" value="${towerslist[towerlistIndex].hitValue}">`
        document.getElementById(`tower-dotinterval-${towerlistIndex}`).innerHTML = 
            `<input type="number" id="tower-dotinterval-input-${towerlistIndex}" value="${towerslist[towerlistIndex].dotInterval}">`

        editBtn.style.display = 'none'
        removeBtn.style.display = 'none'
        saveBtn.style.display = ''
        cancelBtn.style.display = ''
    })

    saveBtn.addEventListener('click', function() {
        // Update towerslist with new values
        towerslist[towerlistIndex].name = document.getElementById(`tower-name-input-${towerlistIndex}`).value
        towerslist[towerlistIndex].hitValue = parseInt(document.getElementById(`tower-hitvalue-input-${towerlistIndex}`).value)
        towerslist[towerlistIndex].dotInterval = parseInt(document.getElementById(`tower-dotinterval-input-${towerlistIndex}`).value)

        drawTowers()
    })

    cancelBtn.addEventListener('click', function() {
        // Restore original values without saving
        document.getElementById(`tower-name-${towerlistIndex}`).innerHTML = towerslist[towerlistIndex].name
        document.getElementById(`tower-hitvalue-${towerlistIndex}`).innerHTML = towerslist[towerlistIndex].hitValue
        document.getElementById(`tower-dotinterval-${towerlistIndex}`).innerHTML = towerslist[towerlistIndex].dotInterval

        editBtn.style.display = ''
        removeBtn.style.display = ''
        saveBtn.style.display = 'none'
        cancelBtn.style.display = 'none'
    })

    removeBtn.addEventListener('click', function() {
        towerslist.splice(towerlistIndex, 1)
        drawTowers()
    })

    towerActionsDivElem.append(saveBtn, cancelBtn, editBtn, removeBtn)
}

document.getElementById("towers-toggle").addEventListener("click", function(){
    console.log("towers toggle")
    if (showTowers == false) {
        console.log("show")
        showTowers = true
        let mainElem = document.getElementsByClassName("main")[0]
        console.log(mainElem)
        mainElem.style.display="none"
        let towersElem = document.getElementsByClassName("towers")[0]
        towersElem.style.display="block"
    } else {
        console.log("hide")
        showTowers = false
        let mainElem = document.getElementsByClassName("main")[0]
        mainElem.style.display="block"
        let towersElem = document.getElementsByClassName("towers")[0]
        towersElem.style.display="none"
    }
})


function drawTowers() {
    document.getElementById("towers-list").innerHTML= ""

    for (let i=0; i<towerslist.length;i++) {
        addTower(towerslist[i], i)
    }
}


document.getElementById("add-tower").addEventListener("click", function() {
    // Prevent multiple add rows
    if (document.getElementById("tower-row-new")) return

    let towerListElem = document.getElementById("towers-list")

    towerListElem.insertAdjacentHTML('beforeend',
        `<div class="towerRow" id="tower-row-new">
            <div id="tower-name-new"><input type="text" id="tower-name-input-new" placeholder="Name"></div>
            <div id="tower-hitvalue-new"><input type="number" id="tower-hitvalue-input-new" placeholder="0"></div>
            <div id="tower-dotinterval-new"><input type="number" id="tower-dotinterval-input-new" placeholder="0"></div>
            <div id="tower-actions-new"></div>
        </div>`
    )

    const saveBtn = document.createElement('input')
    saveBtn.type = 'button'
    saveBtn.value = 'Save'

    const cancelBtn = document.createElement('input')
    cancelBtn.type = 'button'
    cancelBtn.value = 'Cancel'

    saveBtn.addEventListener('click', function() {
        const name = document.getElementById('tower-name-input-new').value.trim()
        const hitValue = parseInt(document.getElementById('tower-hitvalue-input-new').value)
        const dotInterval = parseInt(document.getElementById('tower-dotinterval-input-new').value)

        if (!name || isNaN(hitValue) || isNaN(dotInterval)) {
            alert("Please fill in all fields")
            return
        }

        towerslist.push({ name, hitValue, dotInterval })
        drawTowers()
    })

    cancelBtn.addEventListener('click', function() {
        document.getElementById('tower-row-new').remove()
    })

    document.getElementById('tower-actions-new').append(saveBtn, cancelBtn)
})


let firstTower = {
    "name": "Damage 1",
    "hitValue": 1,
    "dotInterval": 500
}
let secondTower = {
     "name": "Damage 2",
    "hitValue": 10,
    "dotInterval": 3000
}
towerslist.push(firstTower)
towerslist.push(secondTower)


drawTowers()



updateScreen()

