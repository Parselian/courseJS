window.addEventListener('DOMContentLoaded', () => {
  'use-strict';

  const main = document.querySelector('.main'),
      inputCities = document.querySelector('.input-cities'),
      selectCities = document.getElementById('select-cities'),
      label = document.querySelector('label'),
      closeBtn = document.querySelector('.close-button'),
      dropdown = inputCities.querySelector('.dropdown'),
      dropdownDefault = dropdown.querySelector('.dropdown-lists__list--default'),
      dropdownSelect = dropdown.querySelector('.dropdown-lists__list--select'),
      dropdownAutocomplete = dropdown.querySelector('.dropdown-lists__list--autocomplete');
      const defaultContainer = dropdownDefault.querySelector('.dropdown-lists__col'),
      selectContainer = dropdownSelect.querySelector('.dropdown-lists__col'),
      autocompleteContainer = dropdownAutocomplete.querySelector('.dropdown-lists__col');

  //создание и анимирование спиннера
  let intervalId;
  const activateSpinner = () => {
    let spinner = document.createElement('div'),
        counter = 0;

    spinner.classList.add('spinner');
    spinner.classList.add('visible');
    inputCities.classList.add('hide');

    intervalId = setInterval(() => {
      counter += 2;
      if( counter >= 360 ) {
        counter = 0;
      }
      spinner.style.transform = `rotate(${counter}deg)`;
      main.appendChild(spinner);
    }, 20);
  };

  //setCookies
  const setCookies = () => {
    let getLocale;
    // console.log(document.cookie.includes('locale'));
    if( !document.cookie.includes('locale') ) {
      getLocale = prompt('Введите вашу локаль: RU/EN/DE', '').toUpperCase();

      if(getLocale == null || getLocale == '') {
        document.cookie = `locale=RU; path=/; max-age=2592000`;
      } else {
        document.cookie = `locale=${getLocale}; path=/; max-age=2592000`;
      }
    }
  };

  //управление dropdown списками
  const toggleDropdownLists = (data) => {
    const defaultCountryBlocks = dropdownDefault.querySelectorAll('.dropdown-lists__countryBlock'),
      selectCountryBlocks = document.querySelectorAll('.dropdown-lists__list--select > .dropdown-lists__col > .dropdown-lists__countryBlock'),
      autocompleteCountryBlock = dropdownAutocomplete.querySelector('.dropdown-lists__col'),
      autocompleteNothingBlock = document.querySelector('.dropdown-lists__line--nothing'),
      searchBtn = document.querySelector('.button');

    //скрытие всех блоков
    const hideBlocks = () => {
      dropdownDefault.classList.remove('visible');
      dropdownSelect.classList.remove('visible');
      selectCountryBlocks.forEach(item => {
        item.classList.remove('visible');
      });
      dropdownAutocomplete.classList.remove('visible');
      autocompleteNothingBlock.classList.remove('visible');
    };

    //анимация переключения default/select списков
    const slideLists = (target) => {
      let intervalId, 
          counter = 0,
          counter2 = -100;

      intervalId = setInterval(() => {
        counter += 2;
        counter2 += 2;

        if( target.closest('.dropdown-lists__list--default') ) {
          if( counter <= 100 ) {
            dropdownDefault.style.transform = `translateX(-${counter}%)`;
            dropdownSelect.style.transform = `translateX(-${counter}%)`;
          } else {
            dropdownDefault.classList.add('default_slided');
            counter = -100;
            clearInterval(intervalId);
          }
        }

        if( target.closest('.dropdown-lists__list--select') ) { 
          dropdownDefault.classList.remove('default_slided');

          if( counter2 <= 0 ) {
            dropdownDefault.style.transform = `translateX(${counter2}%)`;
            dropdownSelect.style.transform = `translateX(${counter2}%)`;
          } else {
            counter2 = -100;
            selectCountryBlocks.forEach(item => {
              item.classList.remove('visible');
            });
            clearInterval(intervalId);
          }
        }

        intervalId;
      }, 10);

    };

    //переключение select-блоков
    const toggleSelectBlocks = (index) => {
      for( let i = 0; i < selectCountryBlocks.length; i++ ) {
        if ( index === i ) {
          // dropdownDefault.classList.remove('visible');
          dropdownSelect.classList.add('visible');
          selectCountryBlocks[i].classList.add('visible');
        }
      } 

      selectCountryBlocks[index].addEventListener('click', (e) => {
        const target = e.target.closest('.dropdown-lists__total-line');

        if(target) {
          // dropdownDefault.classList.add('visible');
          dropdownSelect.classList.remove('visible');
        }
      });
    };  

    //проверка на вводимый город
    const checkCities = () => {
      let citiesArr = [...autocompleteCountryBlock.children];

      hideBlocks();
      dropdownAutocomplete.classList.add('visible');
      autocompleteNothingBlock.className = 'visible'; 

      citiesArr.forEach((item) => {
        let inputVal = selectCities.value.toLowerCase(),
        itemVal = item.children[0].textContent.toLowerCase(),
        valLength = inputVal.length;
        inputVal = new RegExp(`^${inputVal}`);
        
        if( inputVal.test(itemVal.slice(0, valLength))) {
          item.classList.remove('hide');
          // searchBtn.classList.remove('disabled');
          autocompleteNothingBlock.className = 'hide'; 
        } else {
          item.classList.add('hide');
        }
      });
    };

    // открытие default блока со странами
    inputCities.addEventListener('click', (e) => {
      let target = e.target;

      //если таргет == select - стартуем ф-цию открытия нужного select
      if(target.closest('.dropdown-lists__total-line')) {
        target = target.closest('.dropdown-lists__countryBlock');
        
        slideLists(target);
        dropdownSelect.classList.add('visible');

        defaultCountryBlocks.forEach((item, i) => {
          if(target === item) {
            toggleSelectBlocks(i);
          }
        });
      } 

      target = e.target;
      
      //if target == input then hide all blocks and open dropdownDefault
      if(target.id === 'select-cities') {
        hideBlocks();
        dropdownDefault.classList.add('visible');
      } else if(target.matches('.button')) {
        selectCities.value = '';
        hideBlocks();
      }  

      //if target == city/country => hide allBlocks and open autocomplete
      if( target.matches('.dropdown-lists__city, .dropdown-lists__country') ) {
        label.className = 'label';
        hideBlocks();
        dropdownAutocomplete.classList.add('visible');
        selectCities.value = target.textContent.toLowerCase();
        checkCities();
        closeBtn.classList.add('visible');
      }

      //if target == city => activate searchBtn
      if( target.matches('.dropdown-lists__city') ) {
        // searchBtn.href = `https://ru.wikipedia.org/wiki/${selectCities.value}`;
        searchBtn.classList.remove('disabled');
      }
      
      /* if target == closeBtn => clear input, hide allBlocks, open defList, disable searchBtn and hide closeBtn */
      if( target === closeBtn ) {
        dropdownDefault.classList.remove('default_slided');
        selectCities.value = '';
        label.className = '';
        closeBtn.classList.remove('visible');
        hideBlocks();
        dropdownDefault.classList.add('visible');           
        searchBtn.classList.add('disabled');
        searchBtn.href = '#';
      }
    });
    
    //открытие блока autocomplete
    selectCities.addEventListener('input', () => {
      if( selectCities.value !== '') {
        label.className = 'label';
        dropdownSelect.classList.add('hide');
        closeBtn.classList.add('visible');
        checkCities();
      } else {
        label.className = '';
        dropdownSelect.classList.remove('hide');
        closeBtn.classList.remove('visible');
        hideBlocks();
        dropdownDefault.classList.add('visible');
      }
    });

    //Привязка ссылки на Вики выбранного города
    searchBtn.addEventListener('click', () => {
      for( let key in data ) {
        data[key].cities.forEach( (item) => {
          if(item.name.toLowerCase() === selectCities.value) {
            searchBtn.href = item.link;
          }
        });
      }
    });
  };

  const insertBlocks = (block) => {
    const dropdownCountryBlock = document.createElement('div'),
          dropdownTotalLine = document.createElement('div'),
          dropdownListsCountry = document.createElement('div'),
          dropdownListsCountryCount = document.createElement('div'),
          dropdownListsLine = document.createElement('div'),
          dropdownListsCity = document.createElement('div'),
          dropdownListsCityCount = document.createElement('div');

    dropdownCountryBlock.className = 'dropdown-lists__countryBlock';
    dropdownTotalLine.className = 'dropdown-lists__total-line';
    dropdownListsCountry.className = 'dropdown-lists__country';
    dropdownListsCountryCount.className = 'dropdown-lists__count';
    dropdownListsLine.className = 'dropdown-lists__line';
    dropdownListsCity.className = 'dropdown-lists__city';
    dropdownListsCityCount.className = 'dropdown-lists__count';

    dropdownTotalLine.appendChild(dropdownListsCountry);
    dropdownTotalLine.appendChild(dropdownListsCountryCount);
    dropdownListsLine.appendChild(dropdownListsCity);
    dropdownListsLine.appendChild(dropdownListsCityCount);
    dropdownCountryBlock.appendChild(dropdownTotalLine);

    block.forEach( (item) => {
      let itemBlock = dropdownCountryBlock.cloneNode(true);

      if(itemBlock.children[0].className === 'dropdown-lists__total-line') {
        itemBlock.children[0].children[0].textContent = item.country;
        itemBlock.children[0].children[1].textContent = item.count;
      }

      item.cities.forEach(item => {
        let cityBlock = dropdownListsLine.cloneNode(true);
        cityBlock.children[0].textContent = item.name;
        cityBlock.children[1].textContent = item.count;

        itemBlock.appendChild(cityBlock);

        let clone = cityBlock.cloneNode(true);
        autocompleteContainer.appendChild(clone);
      });


      if( document.cookie.slice(7,9) === 'EN' && itemBlock.children[0].children[0].textContent === 'United Kingdom' ) {
        defaultContainer.prepend(itemBlock);
        let clone = itemBlock.cloneNode(true);
        selectContainer.prepend(clone);
      } else if( document.cookie.slice(7,9) === 'RU' && itemBlock.children[0].children[0].textContent === 'Russia' ) {
        defaultContainer.prepend(itemBlock);
        let clone = itemBlock.cloneNode(true);
        selectContainer.prepend(clone);
      } else if( document.cookie.slice(7,9) === 'DE' && itemBlock.children[0].children[0].textContent === 'Deutschland' ) {
        defaultContainer.prepend(itemBlock);
        let clone = itemBlock.cloneNode(true);
        selectContainer.prepend(clone);
      } else {
        defaultContainer.append(itemBlock);
        let clone = itemBlock.cloneNode(true);
        selectContainer.append(clone);
      }
    });

    toggleDropdownLists(block);
  };

  //получение данных с JSON файла
  const getData = () => {

    setCookies();
    activateSpinner();

    if(!!localStorage.getItem('data')) {

      let data = localStorage.getItem('data');

      data = JSON.parse(data);
      insertBlocks(data);

      clearInterval(intervalId);
      inputCities.classList.remove('hide');
    } else {
      const request = new XMLHttpRequest();
      
      request.open('GET', './db_cities.json');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send();
      
      const test = (response) => {
        const data = JSON.parse(response);

        const addChosenBlocks = (key) => {
          data[key] = JSON.stringify(data[key]);
          localStorage.setItem('data', data[key]);
          data[key] = JSON.parse(data[key]);

          insertBlocks(data[key]);
        };

        for( let key in data ) {
          if(document.cookie.includes('locale=EN') && key === 'EN') {
            addChosenBlocks(key);
          } else if( document.cookie.includes('locale=RU') && key === 'RU' ) {
            addChosenBlocks(key);
          } else if( document.cookie.includes('locale=DE') && key === 'DE' ) {
            addChosenBlocks(key);
          }
        }
      };

      request.addEventListener('readystatechange', () => {
        if ( request.readyState !== 4 ) {
          return;
        }

        if( request.status === 200 ) {
          let response = request.responseText;
          clearInterval(intervalId);
          inputCities.classList.remove('hide');
          test(response);
        } else {
          console.error(request.statusText);
        }
      });
    }
  };

  getData();
  
});