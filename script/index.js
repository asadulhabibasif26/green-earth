const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories)
    );
};
const activeRemove = () => {
  const categoryBtn = document.querySelectorAll('.category-btn');
  categoryBtn.forEach((btn) => btn.classList.remove('active') );
}
// const activeRemove =
const displayCategory = (cets) => {
  const categoriesContainer = document.getElementById("category-title");
  cets.forEach((cet) => {
    const categoriesTitle = cet.category_name;
    const categoriesId = cet.id;
    const newElement = document.createElement("div");
    newElement.innerHTML = `<p id="title-no-${cet.id}" onclick="getCategoryCard(${categoriesId})" class="category-btn active btn bg-transparent  border-none  hover:bg-[#15803D] w-[100%] justify-start ">${categoriesTitle}</P>`;
    categoriesContainer.append(newElement);
  });
};
loadCategory();
const getCategoryCard = (id) =>{
  const url = `https://openapi.programming-hero.com/api/category/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => displayCard(data.plants));
  loadCard(id);
}


const loadCard = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      activeRemove();
      displayCard(data.plants)
      const clickBtn = document.getElementById(`title-no-${id}`);
      clickBtn.classList.add('active');
    });
};
const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML ="";
  cards.forEach((card) => {
    const newCard = document.createElement("div");
  newCard.innerHTML = `
    <div class="shadow-xl p-5 space-y-2 min-h-[430px] w-[343px] rounded-xl bg-white">
        <div class="">
            <img class="h-[186px] w-[100%] object-cover rounded-xl" src="${card.image}" alt="">
        </div>
        <h1 class="text-xl font-bold">${card.name}</h1>
        <p>${card.description}</p>
        <div class="flex justify-between items-center">
            <button class="btn rounded-full text-green-400 bg-green-100">${card.category}</button>
            <h2 class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${card.price}</h2>
        </div>
        <button class="bg-[#15803D] btn text-white w-full rounded-full">Add to Cart</button>
    </div>
    `;
    cardContainer.append(newCard);
  })
};
loadCard();

