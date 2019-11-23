window.addEventListener('DOMContentLoaded', () => {
  'use-strict';

  const inputCities = document.querySelector('.input-cities'),
      selectCities = document.getElementById('select-cities'),
      label = document.querySelector('label'),
      closeBtn = document.querySelector('.close-button'),
      dropdown = inputCities.querySelector('.dropdown'),
      dropdownDefault = dropdown.querySelector('.dropdown-lists__list--default'),
      dropdownSelect = dropdown.querySelector('.dropdown-lists__list--select'),
      dropdownAutocomplete = dropdown.querySelector('.dropdown-lists__list--autocomplete'),
      defaultCountryBlocks = dropdownDefault.querySelectorAll('.dropdown-lists__countryBlock'),
      selectCountryBlocks = document.querySelectorAll('.dropdown-lists__list--select > .dropdown-lists__col > .dropdown-lists__countryBlock'),
      autocompleteCountryBlock = dropdownAutocomplete.querySelector('.dropdown-lists__countryBlock'),
      autocompleteNothingBlock = document.querySelector('.dropdown-lists__line--nothing'),
      searchBtn = document.querySelector('.button');
    
  //переключение select-блоков
  const toggleSelectBlocks = (index) => {
    for( let i = 0; i < selectCountryBlocks.length; i++ ) {
      if ( index === i ) {
        dropdownDefault.classList.remove('visible');
        dropdownSelect.classList.add('visible');
        selectCountryBlocks[i].classList.add('visible');
      }
    } 

    selectCountryBlocks[index].addEventListener('click', (e) => {
      const target = e.target.closest('.dropdown-lists__total-line');

      if(target) {
        dropdownDefault.classList.add('visible');
        selectCountryBlocks[index].classList.remove('visible');
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
        item.classList.add('visible');
        // searchBtn.classList.remove('disabled');
        autocompleteNothingBlock.className = 'hide'; 
      } else {
        item.classList.remove('visible');
      }
    });
  };

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

  //управление dropdown списками
  const toggleDropdownLists = () => {
    // открытие default блока со странами
    inputCities.addEventListener('click', (e) => {
      let target = e.target;

      if(target.closest('.dropdown-lists__total-line')) {
        target = target.closest('.dropdown-lists__countryBlock');
        
        defaultCountryBlocks.forEach((item, i) => {
          if(target === item) {
            toggleSelectBlocks(i);
          }
        });
      } 

      target = e.target;
      
      if(target.id === 'select-cities') {
        hideBlocks();
        dropdownDefault.classList.add('visible');
      } else if(target.matches('.button')) {
        selectCities.value = '';
        hideBlocks();
      }  

      if( target.matches('.dropdown-lists__city, .dropdown-lists__country') ) {
        label.className = 'label';
        hideBlocks();
        dropdownAutocomplete.classList.add('visible');
        selectCities.value = target.textContent.toLowerCase();
        checkCities();
        closeBtn.classList.add('visible');
      }

      if( target.matches('.dropdown-lists__city') ) {
        searchBtn.href = `https://ru.wikipedia.org/wiki/${selectCities.value}`;
        searchBtn.classList.remove('disabled');
      }
      
      if( target === closeBtn ) {
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
        checkCities();
      } else {
        label.className = '';
        hideBlocks();
        dropdownDefault.classList.add('visible');
      }
    });
  };

  toggleDropdownLists();
});