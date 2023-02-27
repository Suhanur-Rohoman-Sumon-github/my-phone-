const loadPhones = async (serchefieldValue, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${serchefieldValue}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    showAllPhone(data.data, dataLimit)
}

const showAllPhone = (phones, dataLimit) => {
    const divConteinar = document.getElementById('div-conatainer');
    divConteinar.innerText = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden')
    }
    const noPhone = document.getElementById('no-found-masage')
    if (phones.length === 0) {
        noPhone.classList.remove('hidden')
    }
    else {
        noPhone.classList.add('hidden')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('card')
        phoneDiv.innerHTML = `
      <figure class="px-10 pt-10">
     <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
     </figure>
     <div class="card-body items-center text-center">
     <h2 class="card-title">${phone.phone_name}</h2>
     <p>If a dog chews shoes whose shoes does he choose?</p>
     <div class="card-actions">
       <button onclick ="loadDtails('${phone.slug}')" class="btn btn-primary" href="#my-modal-2" ><a href="#my-modal-2">showdetails</a></button>
     </div>
    </div>
        `
        divConteinar.appendChild(phoneDiv)
    });
}
const prossesSerche = (dataLimit) => {
    const sercheField = document.getElementById('searche-field');
    const serchefieldValue = sercheField.value;
    serchefieldValue.innerText = '';
    loadPhones(serchefieldValue, dataLimit)
}

document.getElementById('serche-btn').addEventListener('click', function () {
    prossesSerche(10);
})
document.getElementById('show-all-btn').addEventListener('click', function () {
    prossesSerche();
})

document.getElementById('searche-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        prossesSerche(10);
    }

})

const loadDtails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)
    showData(data.data)
}

const showData = (fetures) => {
    
    const modalConteinar = document.getElementById('my-modal-2');
    modalConteinar.innerText = '';
    const div = document.createElement('div')
    div.innerHTML = `
   <div class="modal-box">
   <img class="mx-auto" src="${fetures.image}" alt="">
   <h3 class="font-bold text-lg">${fetures.name}</h3>
   <p class="py-4">${fetures.releaseDate}</p>
   <p class="py-4">Want more extended RAM? Got it. OPPO phone now supports up to 8GB Extended RAM3 via latest OTA updates. Just one click to upgrade and then see magic happen.</p>
   <div class="modal-action">
    <a href="#" class="btn">close</a>
    </div>
     </div>
   `
   modalConteinar.appendChild(div )
}
