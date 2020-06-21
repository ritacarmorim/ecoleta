function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json())
    .then( states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
        
    })

}


function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value;

    const indexOfselectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    fetch(url)
    .then(res => res.json())
    .then(cities => {
        citySelect.innerHTML = '<option value="">Selecione o estado</option>';
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }

        citySelect.disabled = false
    })

}

populateUfs()



document
     .querySelector("select[name=uf]")
     .addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}



const collectedItems = document.querySelector("input[name=items]")

let selectedItems= {}

function handleSelectedItem(event){
    const itemLi = event.target;
    itemLi.classList.toggle('selected')
    const itemId = itemLi.dataset.id;

    const alreadyselected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })


    if( alreadyselected >= 0 ) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsdifferent = item != itemId
            return itemIsdifferent


        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}



