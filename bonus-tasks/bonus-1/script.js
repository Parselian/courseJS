let country = document.querySelector('#country'),
    selectCity = document.querySelector('#city');
const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
}

function createCityList(selectCountry) {
  selectCity.style.display = 'block';
  selectCountry.forEach(function(item) {
     let newSelectItem = document.createElement('option');
    // alert(item)
    newSelectItem.value = item;
    selectCity.appendChild(newSelectItem);
  })
}

country.addEventListener('change', function(e) {
  let target = e.target;
  
  if(target.value === 'rus') {
    createCityList(cityArr.rus);
  }
})

