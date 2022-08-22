document.addEventListener('DOMContentLoaded', e =>{
    let doggos;
    fetch('http://localhost:3000/pups')
    .then(result => result.json())
    .then(data => {
        doggos = data
        updateDogBar(doggos, getGoodDogFilter())
    })


    const goodDogFilter =  document.getElementById('good-dog-filter')
    goodDogFilter.style.cursor = 'pointer'
    goodDogFilter.addEventListener('click', e =>{
        toggleGoodDogFilter()
    })


    function getGoodDogFilter(){
        const goodDogStatus = document.getElementById('good-dog-filter')
        .textContent.slice(-2)
    
        return goodDogStatus === "ON"
    }
    
    function toggleGoodDogFilter(){
        const goodDogStatus = getGoodDogFilter();
        if(goodDogStatus){
            document.getElementById('good-dog-filter').textContent = "Filter good dogs: OFF"   
        }else{
            document.getElementById('good-dog-filter').textContent = "Filter good dogs: ON"   
        }

        updateDogBar();
    }
    
    function updateDogBar(){
        const filterStatus = getGoodDogFilter()

        const dogBar = document.getElementById('dog-bar')
        dogBar.innerHTML = ''
        dogBar.style.display = 'flex'
    
        for(pup of doggos){
            if(pup.isGoodDog == filterStatus){
                const domPup = document.createElement('span')
                domPup.textContent =   pup.name
                domPup.style.borderRadius = "1.5em"
                domPup.style.border = '0.1em solid black'
                domPup.style.padding = '0.1em'
                
                dogBar.append(domPup)
            }
        }
    }
})
