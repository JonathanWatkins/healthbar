console.log("run")
let maxHealth = 50
let maxArmour = 50
let currentHealth = 50
let currentArmour = 35
let interval = 1000
let dotRunning = false
let rageRunning = false


// document.getElementById("health-text").innerHTML = currentHealth.toLocaleString() + "/" + maxHealth.toLocaleString()
// document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

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

function doDamage(hitValue) {

    if (hitValue > 0) {
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
    
    let hitValue = parseInt(document.getElementById("hit-value").value)

    doDamage(hitValue)
    
    // checkEffects()
    updateScreen()
})

document.getElementById("dot-button").addEventListener("click", function(){
    if (dotRunning === false) {
        
        let hitValue = parseInt(document.getElementById("hit-value").value)
        let dotInterval = parseInt(document.getElementById("dot-interval").value)

        
        interval = setInterval(function() {
                // checkEffects()
                doDamage(hitValue)
                updateScreen()
        }, dotInterval)

        document.getElementById("dot-button").value = "Stop"
        dotRunning = true  
    } else { // dot running === true
        clearInterval(interval)
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


updateScreen()
