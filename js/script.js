const getCountries = async () => {
    const countriesListElement = document.getElementById('countries-list');

    try {
        const response = await fetch('https://restcountries.com/v3/all');
        const countries = await response.json(); // "parsear"
        // console.log(countries);

        countries.sort((country1, country2) => country1.name.common.localeCompare(country2.name.common));
        /*
        Fuera de getCountries:
        const sortedCountries = (countries) => {
            const nameA = a.name.common.normalize("nfd").toUpperCase()
            const nameB = b.name.common.normalize("nfd").toUpperCase()
            if (nameA<nameB){
            return -1
            } if (nameA>nameB){
            return 1
            } return 0
            }
        Y aquí dentro pondríamos:
        sortedCountries(countries);
        */ 

        countries.forEach(country => {
            const countryElement = document.createElement('div');
            countryElement.classList.add('country');

            const flagElement = document.createElement('img');                                                                                                                                                                                                                                                                                                                                                                                                                                           
            flagElement.src = country.flags[0]; // al hacer template poner comillas (en este caso no es obligatorio, pero es buena práctica)
            flagElement.alt = `Bandera de ${country.name.common}`;  
            flagElement.classList.add('flag');
            const countryName = document.createElement('h2');
            countryName.textContent = country.name.common;
            // con template : countriesList.innerHTML += template; 

            flagElement.addEventListener('click', () => showCountryDetails(country));

            countryElement.appendChild(flagElement);
            countryElement.appendChild(countryName);
            countriesListElement.appendChild(countryElement);

        });
    } catch (error) {
        console.error('Error en el fetch:', error);
    }
};

getCountries();  // por qué me funciona sin el .then?

const showCountryDetails = (country) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => modal.remove());

    const flagElement = document.createElement('img');
    flagElement.src = country.flags[0];
    flagElement.alt = `Bandera de ${country.name.common}`;
    flagElement.classList.add('modal-flag');

    const countryName = document.createElement('h2');
    countryName.textContent = country.name.common;

    const countryCapital = document.createElement('p');
    countryCapital.textContent = `Capital: ${country.capital[0]}`;

    const countryPopulation = document.createElement('p');
    countryPopulation.textContent = `Población: ${country.population} habitantes`;

    let conduce='';
    if (country.car.side == 'right'){
        conduce = 'derecha';
    } else if (country.car.side == 'left'){
        conduce = 'izquierda';
    }
    const drivingSide = document.createElement('p');
    drivingSide.textContent = `Conducen por la: ${conduce}`;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(flagElement);
    modalContent.appendChild(countryName);
    modalContent.appendChild(countryCapital);
    modalContent.appendChild(countryPopulation);
    modalContent.appendChild(drivingSide);

    modal.appendChild(modalContent);
    document.body.appendChild(modal); }

// intentar hacer el modal con element.innerHTML + forEach dentro de forEach (data) y insertAdjacentHTML() (mónica)
