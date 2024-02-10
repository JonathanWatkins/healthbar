console.log("run")
let maxHealth = 100
let currentHealth = 50
let interval
let dotRunning = false
let rageRunning = false

document.getElementById("health-text").innerHTML = currentHealth + "/" + maxHealth
document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

function updateScreen() {
    document.getElementById("health-text").innerHTML = currentHealth + "/" + maxHealth
    document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

}

document.getElementById("maxhealth").addEventListener("change",function(){
    let maxHealthChange = parseInt(document.getElementById("maxhealth").value)
    
    // console.log(maxHealthChange)

    // currentHealth = maxHealthChange < currentHealth ? maxHealthChange : currentHealth
    currentHealth = maxHealthChange
    maxHealth = maxHealthChange

    updateScreen()

})

document.getElementById("hit-button").addEventListener("click", function(){
    let hitValue = parseInt(document.getElementById("hit-value").value)
    

    currentHealth = currentHealth > hitValue ? currentHealth - hitValue : 0
    checkEffects()
    updateScreen()
})

document.getElementById("dot-button").addEventListener("click", function(){
    if (dotRunning === false) {
        
        let hitValue = parseInt(document.getElementById("hit-value").value)
        let dotInterval = parseInt(document.getElementById("dot-interval").value)

        
        interval = setInterval(function() {
                currentHealth = currentHealth > hitValue ? currentHealth - hitValue : 0
                checkEffects()
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
