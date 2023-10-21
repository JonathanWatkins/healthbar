console.log("run")
let maxHealth = 100
let currentHealth = 50
document.getElementById("health-text").innerHTML = currentHealth + "/" + maxHealth
document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

function updateScreen() {
    document.getElementById("health-text").innerHTML = currentHealth + "/" + maxHealth
    document.getElementById("bar-health").style.width = currentHealth/maxHealth*100 + "%"

}

document.getElementById("maxhealth").addEventListener("change",function(){
    let maxHealthChange = document.getElementById("maxhealth").value
    
    // console.log(maxHealthChange)

    // currentHealth = maxHealthChange < currentHealth ? maxHealthChange : currentHealth
    currentHealth = maxHealthChange
    maxHealth = maxHealthChange

    updateScreen()

})

document.getElementById("hit-button").addEventListener("click", function(){
    let hitValue = document.getElementById("hit-value").value
    

    currentHealth = currentHealth > hitValue ? currentHealth - hitValue : 0
    updateScreen()
})
