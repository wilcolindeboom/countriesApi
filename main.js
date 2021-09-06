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

// console.log(searchButton);

async function fetchData (country) {

    try {
        const result =  await axios.get("https://restcountries.eu/rest/v2/name/"+country);
        console.log(result.data);
        console.log(buildStringCountryInfo (result.data[0]));
        console.log(buildStringCapitalInfo (result.data[0]));
        console.log(buildStringValutaInfo (result.data[0]));
        console.log(buildStringLanguageInfo (result.data[0]));

    } catch (e) {
        console.error(e);
    }
}
// default = belgium
searchButton.addEventListener("click",() => {
    fetchData(countryName())});

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

// Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt.
// In een land kunnen één of twee currencies gebruikt worden:
//   1 valuta: and you can pay with [currency]'s
//   2 valuta's: and you can pay with [currency]'s and [currency]'s


function buildStringValutaInfo(data) {
    const {currencies} = data;
    let valutaInfo = '';
    switch(currencies.length) {
        case 1 :
            valutaInfo = ` 1 valuta: and you can pay with ${currencies[0].name}'s`;
            break;
        case 2 :
            valutaInfo = ` 2 valuta's: and you can pay with ${currencies[0].name}'s and ${currencies[1].name}'s`;
            break;
        default :
            valutaInfo = 'Valuta unknown!';
    }

    return valutaInfo;
}

// Check of alles nog steeds werkt als je de gegevens over Aruba of Duitsland ophaalt!

function countryName() {
    if(!countryField.value) {
        return 'belgium';
    } else {
        return countryField.value;
    }
}
 // vul aruba of germany in het tekstveld in en klik op zoek...


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