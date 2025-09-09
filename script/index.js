const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};
// const activeRemove =
const displayCategory = (cets) => {
  cets.forEach((cet) => {
    const categoriesTitle = cet.category_name;
    const categoriesContainer = document.getElementById("category-title");

    const newElement = document.createElement("div");
    newElement.innerHTML = `<p id="active-btn" class="btn bg-transparent  border-none  hover:bg-[#15803D]">${categoriesTitle}</P>`;
    categoriesContainer.append(newElement);

    document.getElementById("active-btn").addEventListener("click", () => {
      const activeBtn = document.querySelectorAll("active-btn");
      active;
    });
  });
};
loadCategory();

// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }

const loadCard = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => displayCard(data.plants));
};
const displayCard = (cards) => {
  cards.forEach((card) => {
    const cardContainer = document.getElementById("card-container");
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
