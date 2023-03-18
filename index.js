function getData(data, filter) {
    fetch(data)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {

            const previewDiv = document.querySelector('.preview1');
            previewDiv.innerHTML = ""
            data.map((card) => {
                if (card.source_type == filter || filter == "all") {
                    previewDiv.innerHTML +=
                        `<div class="card ${card.source_type}">
       <div class="card-header">
       <img class="profile-img" src="${card.profile_image}" alt="Avatar">
       <div>
       <p class="card-name">${card.name}</p>
       <p class="card-date">${card.date}</p>
       </div>
       <img class="social-img" src="./icons/${card.source_type}.svg" alt="Avatar">
       </div>

       <div>
       <img class="card-img" src="${card.image}" alt="Avatar">
       <p class=" card-caption">${card.caption}</p>
      </div>
       

      <div class="card-footer">
      
      <img class="like-img" src="../icons/heart.svg" alt="Avatar">
      <p class="card-likes">${card.likes}</p>
      </div>
       </div>
       </div>`;
                }

                displayFour()
            })
        })
}

getData("/data.json", "all")

const cards = document.getElementsByClassName('card'); // convert NodeList to array
function displayFour() {

    const itemsContainer = document.getElementsByClassName('preview');

    let itemsToShow = 4;
    let itemsShown = 0;

    for (let card of cards) {
        card.style.display = 'none';
    };

    function showItems() {


        for (let i = itemsShown; i < itemsToShow; i++) {
            const item = cards[i];
            if (!item) break;
            item.style.display = 'block';
            itemsShown++;
        }



    }



    showItems();

    document.getElementById("load-more").addEventListener("click", function () {
        itemsToShow += 4;

        showItems();
        if (itemsShown == cards.length) {

            document.getElementById("load-more").style.display = "none"
        }
    });
}

// backgroun colour changer

const backgroundChanger = document.getElementById('cardBackgroundColor');
backgroundChanger.addEventListener("input", function () {
    for (let card of cards) {
        card.style.backgroundColor = backgroundChanger.value

        if (backgroundChanger.value == "#000000" || backgroundChanger.value == "#000") {
            card.style.color = "white";
            var radio = document.querySelector('input[name="theme"][value="darkTheme"]');


            radio.checked = true;
        }
        else
            if (backgroundChanger.value == "#ffffff" || backgroundChanger.value == "#fff") {
                card.style.color = "black";
                var radio = document.querySelector('input[name="theme"][value="lightTheme"]');


                radio.checked = true;
            }
    }




});

// change theme
var radioButtons = document.getElementsByName("theme");

for (let radioButton of radioButtons) {
    radioButton.addEventListener("change", function () {
        if (radioButton.value == "darkTheme") {
            for (let card of cards) {
                card.style.backgroundColor = "black"
                card.style.color = "white"
            }
            backgroundChanger.value = "#000000"

        } else {

            for (let card of cards) {
                card.style.backgroundColor = "white"
                card.style.color = "black"
            }

            backgroundChanger.value = "#ffffff"
        }
    });
}


// change gap between cards
const gapChanger = document.getElementById('cardSpaceBetween');
gapChanger.addEventListener("input", function () {

    for (let card of cards) {
        card.style.margin = gapChanger.value
    }
})

// filter by source

var filters = document.getElementsByName("filterBySource");

for (let filter of filters) {
    filter.addEventListener("change", function () {


        getData("/data.json", filter.value)
        document.getElementById("load-more").style.display = "block";

    });
}


//change number of columns

var select = document.getElementById("numberOfColumns");

select.addEventListener("change", function () {



    var selectedValue = select.value;
    if (selectedValue == 1) {

        for (let card of cards) {
            card.style.maxWidth = "50%";
        }
    }
    if (selectedValue == 2) {

        for (let card of cards) {
            card.style.maxWidth = "30%";
        }
    }
    if (selectedValue == 3) {

        for (let card of cards) {
            card.style.maxWidth = "26%";
        }
    }
    if (selectedValue == 4) {

        for (let card of cards) {
            card.style.maxWidth = "20%";
        }
    }
    if (selectedValue == 5) {

        for (let card of cards) {
            card.style.maxWidth = "15%";
        }
    }
    if (selectedValue == "dynamic") {

        for (let card of cards) {
            card.style.maxWidth = "20%";
        }
    }


});