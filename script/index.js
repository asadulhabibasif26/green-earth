const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};
const loadManage = (status) => {
  if(status == true){
    document.getElementById('loading-fun').classList.remove('hidden');
    document.getElementById('card-container').classList.add('hidden');
  }else{
    document.getElementById('card-container').classList.remove('hidden');
    document.getElementById('loading-fun').classList.add('hidden');
  }
}
// const activeRemove =
const displayCategory = (cets) => {
  const categoriesContainer = document.getElementById("category-title");
  cets.forEach((cet) => {
    const categoriesTitle = cet.category_name;
    const categoriesId = cet.id;
    const newElement = document.createElement("div");
    newElement.innerHTML = `<p id="title-no-${cet.id}" onclick="getCategoryCard(${categoriesId})" class="category-btn  btn bg-transparent  border-none  hover:bg-[#15803D] w-[100%] justify-start ">${categoriesTitle}</P>`;
    categoriesContainer.append(newElement);
  });
};
loadCategory();
const getCategoryCard = (id) => {
  loadManage(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data.plants));
  loadCard(id);
};
const loadCard = (id) => {
   loadManage(true);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => displayCard(data.plants));
};
const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="shadow-xl p-5 space-y-2 min-h-[430px] max-w-[345px] rounded-xl bg-white">
        <div class="">
            <img class="h-[186px] w-[100%] object-cover rounded-xl" src="${card.image}" alt="">
        </div>
        <h1 onclick="mortalLoad(${card.id})" class="text-xl font-bold">${card.name}</h1>
        <p>${card.description}</p>
        <div class="flex justify-between items-center">
            <button class="btn rounded-full text-green-400 bg-green-100">${card.category}</button>
            <h2 class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${card.price}</h2>
        </div>
        <button onclick="addToCard(${card.id})" class="bg-[#15803D] btn text-white w-full rounded-full">Add to Cart</button>
    </div>
    `;
    loadManage(false);
    cardContainer.append(newCard);
  });
};
loadCard();

const addToCard = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAddToCard(data.plants));
};

const displayAddToCard = (data) => {
  const addToCardContainer = document.getElementById("add-to-card-container");
  const newAdd = document.createElement('div');
  newAdd.innerHTML =`
  <div id="add-to-card-${data.id}" class="flex justify-between bg-[#F0FDF4] p-3 rounded-lg">     
  <div>
    <h1 class="font-bold">${data.name}</h1>
    <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${data.price} x 1</p>
    </div>
      <button onclick="cardDeleteBtn(${data.price} ,${data.id} )" id="" class="btn cart-delete-btn rounded-full hover:bg-red-400">x</button>
  </div>
  `
  addToCardTotalPrice(data.price)
  addToCardContainer.append(newAdd); 
};
const addToCardTotalPrice = (price) => {
  const totalPriceContainer = document.getElementById('total-price');
  const totalPrice = parseInt(document.getElementById('total-price').innerText);
  const newTotalPrice = totalPrice + price;
  totalPriceContainer.innerText = newTotalPrice ;
}
const cardDeleteBtn = (price , id) => {
  const totalPriceContainer = document.getElementById('total-price');
  const totalPrice = parseInt(document.getElementById('total-price').innerText);
  const newTotalPrice = totalPrice - price;
  totalPriceContainer.innerText = newTotalPrice ;
  const deleteThis = document.getElementById(`add-to-card-${id}`)
  deleteThis.parentElement.remove();
  

}

const mortalLoad = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
  .then((res) => res.json())
  .then((data) => displayModal(data.plants));
}

const displayModal =  (data) => {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML ="";
  const createElement = document.createElement('div');
  createElement.innerHTML = `
    <div class="space-y-2">
      <img class="h-52 w-[100%] object-cover" src="${data.image}" alt="">
      <h1 class="text-xl font-bold">${data.name}</h1>
      <p>${data.description}</p>
      <div class="flex justify-between items-center">
            <button class="btn rounded-full text-green-400 bg-green-100">${data.category}</button>
            <h2 class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${data.price}</h2>
      </div>
      <button onclick="addToCard(${data.id})" class="bg-[#15803D] btn text-white w-full rounded-full">Add to Cart</button>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
  `
  modalContainer.append(createElement);

  document.getElementById('card_modal').showModal();
}




