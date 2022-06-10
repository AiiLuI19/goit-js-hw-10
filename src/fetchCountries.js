
 const BASE_URL = 'https://restcountries.com/v3.1/name';  
// `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`

export function fetchCountries(name) {
  
    const options = new URLSearchParams({
        fields:"name,capital,population,flags,languages"
    });
    const url = `${BASE_URL}/${name}?${options}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json();
        });
};

