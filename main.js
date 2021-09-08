// Plan de campagne
//
// Maak een 'Zoek'-knop op de pagina en koppel deze aan een functie die de gegevens over België ophaalt en dit in de console logt.
// Tip: Als de de documentatie bekijkt en op async zoekt, vindt je een voorbeeld van een GET-request.


// 1. maak zoek button op pagina
// 2. maak functie ophalen gegevens belgie
// 3. koppel functie aan zoek knop
// 4. log resultaat in console

const searchButton = document.getElementById("searchButton");

const countryField = document.getElementById("country");

const infopanel = document.getElementById("infopanel");

// console.log(searchButton);

async function fetchData (country) {

    try {
        const result =  await axios.get("https://restcountries.eu/rest/v2/name/"+country);
        console.log(result.data);
        console.log(buildStringCountryInfo (result.data[0]));
        console.log(buildStringCapitalInfo (result.data[0]));
        console.log(buildStringValutaInfo (result.data[0]));
        console.log(buildStringLanguageInfo (result.data[0]));
        buildInfoPanel(result.data[0]);
    } catch (e) {
        console.error(e);
    }
}

//     Er moet alleen een request gedaan worden als de gebruiker op enter drukt, of op de zoek-knop klikt.
searchButton.addEventListener("click",() => {
    fetchData(countrySearchName())});

// 8. Maak een inputveld op de pagina en zorg ervoor dat als de gebruiker op enter drukt, de functie wordt
// aangeroepen waarmee de gegevens over `België` worden opgehaald.

countryField.addEventListener("keydown",(e) => {
    if (e.key === "Enter") {
        fetchData(countrySearchName());
// 10. Zorg ervoor dat de waarde van het input veld wordt leeggemaakt na elke zoekopdracht.
        countryField.value = "";

    } else {
        // console.log("key pressed: "+e.key);
    };
});


//     Maak op basis van de response de volgende string en log dit in de console: [country-naam] is situated in [subarea-name]. It has a population of [amount] people.

function buildStringCountryInfo(data) {
    const {name, subregion, population} = data;
    const countryInfo = `${name} is situated in ${subregion}. It has a population of ${population} people.`;
    return countryInfo;
}

//     Maak op basis van de response de volgende string en log dit in de console: The capital is [city]

function buildStringCapitalInfo(data) {
    const {capital} = data;
    const capitalInfo = `The capital is ${capital}`;
    return capitalInfo;
}

function getValuta(data) {
    const {currencies} = data;
    let valuta = '';
    switch(currencies.length) {
        case 1 :
            valuta = `${currencies[0].name}'s`;
            break;
        case 2 :
            valuta = `${currencies[0].name}'s and ${currencies[1].name}'s`;
            break;
        default :
            valuta = 'unknown valuta!';
    }

    return valuta;
}

function buildStringCapitalCurrencyInfo(data) {
    const {capital} = data;
    const valuta = getValuta(data);
    const capitalInfo = `The capital is ${capital} and you can pay with ${valuta}.`;
    return capitalInfo;
}

// Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt.
// In een land kunnen één of twee currencies gebruikt worden:
//   1 valuta: and you can pay with [currency]'s
//   2 valuta's: and you can pay with [currency]'s and [currency]'s


function buildStringValutaInfo(data) {
    const valuta = getValuta(data);
    let valutaInfo = '';
    if(valuta.includes("and")) {
        return ` 2 valuta's: and you can pay with ${valuta}`;
    } else {
        return ` 1 valuta: and you can pay with ${valuta}`;
    }
}


// 9. Zorg ervoor dat de waarde uit het input veld wordt gebruikt als query voor het GET request.

function countrySearchName() {
    if(!countryField.value) {
        return 'belgium';  // default Belgium
    } else {
        return countryField.value;
    }
}

// Check of alles nog steeds werkt als je de gegevens over Aruba of Duitsland ophaalt!
// -> vul aruba of germany in het tekstveld in en klik op zoek of enter


//
//     Bonusopdracht: Maak een functie die ongeacht het aantal talen die in een land gesproken worden, een string maakt:
//
//     1 taal: They speak [language]
// 2 talen: They speak [language] and [language]
// 3 talen: They speak [language], [language] and [language]
// etc.

function buildStringLanguageInfo(data) {
    const {languages} = data;
    let languageInfo = '';
        if(languages.length===1) {
            languageInfo = ` 1 language: They speak ${languages[0].name}`;
        } else {
             for (let i = 0; i < languages.length; i++) {
                 if(i===0) {
                     languageInfo = languages.length + ` languages: They speak ${languages[i].name}`;
                 } else if (i===languages.length-1) {
                     languageInfo += ` and ${languages[i].name}.`;
                 } else {
                     languageInfo += `, ${languages[i].name}`;
                 }
        }
    }

    return languageInfo;
}

// 7. Zorg ervoor dat de opgehaalde data op de volgende manier wordt toegevoegd aan de DOM:

function getFlagImage(data) {
    const {flag} = data;
    return flag;
}

function getCountryName(data) {
    const {name} = data;
    return name;
}


function buildInfoPanel(data) {

    // 11. Zorg ervoor dat er altijd maar één zoekresultaat op de pagina staat.

    while (infopanel.hasChildNodes()) {
        infopanel.removeChild(infopanel.firstChild);
    }

    // [IMAGE: flag]
    const flagImage = document.createElement("img");
    flagImage.setAttribute("src", getFlagImage(data));
    flagImage.setAttribute("alt", "country flag");
    infopanel.appendChild(flagImage);

    // [country-name]
    const countryName = document.createElement("p");
    countryName.setAttribute("id", "countryName");
    countryName.textContent = getCountryName(data);
    infopanel.appendChild(countryName);

    // [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
    const countryInfo = document.createElement("p");
    countryInfo.setAttribute("id", "countryInfo");
    countryInfo.textContent = buildStringCountryInfo(data);
    infopanel.appendChild(countryInfo);

    // The capital is [city] and you can pay with [currency]'s
    const capitalCurrencyInfo = document.createElement("p");
    capitalCurrencyInfo.setAttribute("id", "capitalCurrencyInfo");
    capitalCurrencyInfo.textContent = buildStringCapitalCurrencyInfo(data);
    infopanel.appendChild(capitalCurrencyInfo);

    // They speak [language], [language] and [language]
    const languageInfo = document.createElement("p");
    languageInfo.setAttribute("id", "capitalCurrencyInfo");
    languageInfo.textContent = buildStringLanguageInfo(data)
    infopanel.appendChild(languageInfo);
}



//
// 12. Zorg ervoor dat als er naar een land wordt gezocht dat niet bestaat, er een foutmelding in de DOM wordt gezet.
//     _Tip:_ als er een ongeldige API call wordt gemaakt, zal de response in het `catch` blok terecht komen.
//
// 13. Zorg ervoor dat als je na een ongeldige API call weer een geldige API call maakt, de foutmelding verdwenen is.
//
// 14. **Bonusopdracht:** make it look nice! 😍











