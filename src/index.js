import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import { getMarkupCards } from './css/getMarkupCards';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBoxInput: document.querySelector("#search-box"),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
refs.searchBoxInput.addEventListener("input", debounce(selectCountry, DEBOUNCE_DELAY));

function selectCountry(evt) {
    evt.preventDefault();
    const valueText = evt.target.value.trim();
        if (!valueText) {
            return; 
        }
    fetchCountries(valueText).then(response => {
        reset();
        renderCountries(response);
    }).catch(error => {
        Notiflix.Report.failure("Oops, there is no country with that name");
         reset();
    });
};

 function reset () {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
};
    
function renderCountries(response) {
    const length = response.length;
    let markup;
    if (length === 1) {
        markup = getMarkupCards(response, false);
        refs.countryInfo.insertAdjacentHTML('beforeend', markup);
        } else if (length > 2 && length <= 10) {
            markup = getMarkupCards(response, true)
               
            refs.countryList.insertAdjacentHTML('beforeend', markup);
        } else if (length > 10) {
            Notiflix.Report.info(
                'Too many matches found. Please enter a more specific name.'
            );
        }}


