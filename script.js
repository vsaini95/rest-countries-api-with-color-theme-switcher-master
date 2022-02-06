const wrapper = document.querySelector(".wrapper");
const cards = document.querySelector(".cards");
const inputBar = document.querySelector(".inputBar");
const bars = document.querySelector(".bars");
const filter = document.querySelector(".filter");
const body = document.querySelector(".light");
const preload = document.querySelector(".preload");

let user;

/*----------------------toggle---------------------------------*/

const rheader = document.querySelector(".rheader");
rheader.addEventListener("click", function () {
  body.classList.toggle("dark");
});

/*-----------------dropdown-----------------------*/
let region;
const ul = document.querySelector(".blocks");
const lists = document.querySelectorAll("li");

filter.addEventListener("click", function (e) {
  region = e.target.parentNode.childNodes[0];
  if (e.target.classList.contains("fa-caret-down")) {
    ul.classList.remove("hide");
    lists.forEach((list) => {
      list.classList.remove("hide");
      list.addEventListener("click", function (e) {
        region.textContent = e.target.textContent;
        //cards.classList.add("hide");
        remove();
        if (region.textContent == "All") {
          //cards.classList.remove("hide");
          fill();
          constrained(user);
        } else {
          let filteredCountries = user.filter((char) => {
            if (char.region == `${region.textContent}`) {
              return char;
            }
          });
          filteredCountries.forEach((country) => {
            displayCards(country);
          });
          //cards.classList.remove("hide");
          constrained(filteredCountries);
        }
        ul.classList.add("hide");
      });
    });
  }
});

/*----------------------------------return card---------------------------------------*/

function Cardreturn(element) {
  return `<div class="flag"><img alt="" src="${element.flag}"></div>
 <div class="CountryData">
 <h3>${element.name}</h3>
 <p><strong>Population: </strong>${element.population}</p>
 <p><strong>Region: </strong>${element.region}</p>
 <p><strong>Capital: </strong>${element.capital}</p>
</div>`;
}

/*---------------------------------return details----------------------------------------*/

function deatiled(element) {
  let languages = [];

  element.languages.forEach((language) => {
    if (language.name) {
      languages.push(language.name);
    } else {
      languages.push("NIL");
    }
  });
  let currencies = [];
  if (element.currencies) {
    element.currencies.forEach((currency) => {
      if (currency.name) {
        currencies.push(currency.name);
      } else {
        currencies.push("NIL");
      }
    });
  }
  const buttonDiv = document.createElement("div");
  if (element.borders) {
    element.borders.forEach((border) => {
      fetch(`https://restcountries.com/v2/alpha/${border}`)
        .then((res) => res.json())
        .then((data) => {
          const button = document.createElement("button");
          button.innerText = `${data.name}`;
          button.addEventListener("click", function () {
            div.remove();
            deatiled(data);
          });

          buttonDiv.appendChild(button);
        });
    });
  } else {
    const button = document.createElement("button");
    button.innerText = "nil";
    buttonDiv.appendChild(button);
  }

  const div = document.createElement("div");
  body.classList.add("view");
  div.innerHTML = `<div class="details">
    <div class="backBtn"><i class="fas fa-arrow-left"></i>
    <button class="back">Back</button></div>
    <div class="data">
        <img src="${element.flag}" alt="">
        <div class="rdata">
            <h2>${element.name}</h2>
            <div class="listdata">
                <ul>
                    <li><strong>Native Name: </strong>${element.nativeName}</li>
                    <li><strong>Population: </strong>${element.population}</li>
                    <li><strong>Region: </strong>${element.region}</li>
                    <li><strong>Sub Region: </strong>${element.subregion}</li>
                    <li><strong>Capital: </strong>${element.capital}</li>
                </ul>
                <ul>
                    <li><strong>Top Level Domain: </strong>${element.topLevelDomain}</li>
                    <li><strong>Currencies: </strong>${currencies}</li>
                    <li><strong>Languages: </strong>${languages}</li>
                </ul>
            </div>
            <div class="border"><p><strong>Border Countries: </strong></p></div>
        </div>
    </div>
</div>`;
  let borderDiv = div.childNodes[0].childNodes[3].childNodes[3].childNodes[5];
  borderDiv.appendChild(buttonDiv);

  wrapper.appendChild(div);
  bars.classList.add("hide");
  cards.classList.add("hide");
  //remove();

  div.addEventListener("click", function (e) {
    if (e.target.classList.contains("back")) {
      preload.classList.remove("hide");
      div.remove();
      bars.classList.remove("hide");
      setTimeout(() => {
        // fill();
        cards.classList.remove("hide");
        preload.classList.add("hide");
        body.classList.remove("view");
      }, 1000);
    }
  });
}
/*--------------empty----------*/
function remove() {
  while (cards.firstChild) {
    cards.firstChild.remove();
  }
}
function fill() {
  user.forEach((element) => {
    displayCards(element);
  });
}
/*-----------------------------------return filtered card---------------------------------*/
function displayCards(element) {
  let div = document.createElement("div");
  div.setAttribute("class", "card");
  div.innerHTML = Cardreturn(element);
  cards.appendChild(div);
  div.addEventListener("click", function () {
    if (region) {
      //region.textContent = "Filter by Region";
    }
    deatiled(element);
  });
}

/*-----------------------------------------searching-------------------------------*/
inputBar.addEventListener("keyup", (e) => {
  if (
    e.target ||
    e.key === "Backspace"
    // region.textContent == "Filter by Region"
  ) {
    const searchCountry = e.target.value.toLowerCase();
    //console.log(searchCountry);
    let filteredCountries = user.filter((char) => {
      return char.name.toLowerCase().includes(searchCountry);
    });
    //console.log(filteredCountries);
    remove();
    if (filteredCountries.length) {
      filteredCountries.forEach((elem) => {
        displayCards(elem);
      });
    } else {
      let noData = document.createElement("div");
      noData.classList.add("noData");
      noData.innerHTML = `<div><h1>NO RESULTS</h1><p>We searched far and wide and couldn't find any files matching your search.</p></div>`;
      cards.appendChild(noData);
      //alert("no data found");
    }
  }
});

/*--------------------constrained input----------------------------------*/

function constrained(filteredCountries) {
  inputBar.addEventListener("keyup", (e) => {
    if (e.target || e.key === "Backspace") {
      const searchCountry = e.target.value.toLowerCase();
      //console.log(searchCountry);
      let constfilteredCountries = filteredCountries.filter((char) => {
        return char.name.toLowerCase().includes(searchCountry);
      });
      //console.log(filteredCountries);
      remove();
      if (constfilteredCountries.length) {
        constfilteredCountries.forEach((elem) => {
          displayCards(elem);
        });
      } else {
        //alert("no data found");
        let noData = document.createElement("div");
        noData.classList.add("noData");
        noData.innerHTML = `<div><h1>NO RESULTS</h1><p>We searched far and wide and couldn't find any files matching your search.</p></div>`;
        cards.appendChild(noData);
      }
    }
  });
}

/*-------------------------fetching data-----------------------------------*/

fetch("https://restcountries.com/v2/all")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    user = data;
    setTimeout(() => {
      fill();
      preload.classList.add("hide");
    }, 1000);
  })
  .catch((err) => {
    console.error("not found");
  });
