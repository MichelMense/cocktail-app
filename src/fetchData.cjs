const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const charArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const fetchCocktails = async (current, outputData) => {

  if (current === 36)
  {
    return outputData;
  }
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${charArray[current]}`
    );
    const data = await response.data;
    if (data.drinks !== null)
    {
      for (drink of data.drinks)
      {
        /*
        cocktails:
          - idDrink
          - strDrink
          - strDrinkAlternate
          - strTags,
          - strVideo
          - strCategory
          - strIBA
          - strAlcoholic
          - strGlass
          - strInstructionsDE
          - strDrinkThumb 
          - strIngredient1
          - strIngredient2
          - strIngredient3
          - strIngredient4
          - strIngredient5
          - strIngredient6
          - strIngredient7
          - strIngredient8
          - strIngredient9
          - strIngredient10
          - strIngredient11
          - strIngredient12
          - strIngredient13
          - strIngredient14
          - strIngredient15
          - strMeasure1
          - strMeasure2
          - strMeasure3
          - strMeasure4
          - strMeasure5
          - strMeasure6
          - strMeasure7
          - strMeasure8
          - strMeasure9
          - strMeasure10
          - strMeasure11
          - strMeasure12
          - strMeasure13
          - strMeasure14
          - strMeasure15
          - strImageSource
          - strImageAttribution
          - strCreativeCommonsConfirmed
          - dateModified
        */
        outputData = outputData + 
        {
          id: drink.idDrink || null,
          title: drink.strDrink || null,
          tags: drink.strTags || null,
          category: drink.strCategory || null,
          iba: drink.strIBA || null,
          alcoholic: drink.strAlcoholic || null,
          glass: drink.strGlass || null,
          instructionsDE: drink.strInstructionsDE ? drink.strInstructionsDE.replaceAll("\"", "'").replaceAll("\n", "").replaceAll("\r", "") : null,
          drinkThumb: drink.strDrinkThumb || null,
          ingredient1: drink.strIngredient1 || null,
          ingredient2: drink.strIngredient2 || null,
          ingredient3: drink.strIngredient3 || null,
          ingredient4: drink.strIngredient4 || null,
          ingredient5: drink.strIngredient5 || null,
          ingredient6: drink.strIngredient6 || null,
          ingredient7: drink.strIngredient7 || null,
          ingredient8: drink.strIngredient8 || null,
          ingredient9: drink.strIngredient9 || null,
          ingredient10: drink.strIngredient10 || null,
          ingredient11: drink.strIngredient11 || null,
          ingredient12: drink.strIngredient12 || null,
          ingredient13: drink.strIngredient13 || null,
          ingredient14: drink.strIngredient14 || null,
          ingredient15: drink.strIngredient15 || null,
          measure1: drink.strMeasure1 || null,
          measure2: drink.strMeasure2 || null,
          measure3: drink.strMeasure3 || null,
          measure4: drink.strMeasure4 || null,
          measure5: drink.strMeasure5 || null,
          measure6: drink.strMeasure6 || null,
          measure7: drink.strMeasure7 || null,
          measure8: drink.strMeasure8 || null,
          measure9: drink.strMeasure9 || null,
          measure10: drink.strMeasure10 || null,
          measure11: drink.strMeasure11 || null,
          measure12: drink.strMeasure12 || null,
          measure13: drink.strMeasure13 || null,
          measure14: drink.strMeasure14 || null,
          measure15: drink.strMeasure15 || null,
          imageSource: drink.strImageSource || null,
          imageAttribution: drink.strImageAttribution || null,
          creativeCommonsConfirmed: drink.strCreativeCommonsConfirmed || null
        }
      }
    }
    return await fetchCocktails(current + 1, outputData);
  } catch(error)
  {
    if (error.response && error.response.status === 429) {
      let output = "";
      try {
        const outputPath = path.join(__dirname, "cocktails.json");
        await fs.appendFile(outputPath, outputData);
      } catch (err) {
        console.error(err);
      }
      setTimeout(() => output = fetchCocktails(current, []), 10000);
      return output;
    }
    else
    {
      console.error(error);
      return outputData;
    }    
  }
};



const fetchIngredients = async (current, end, outputData) => {

  if (current === end)
  {
    return outputData = outputData + "]";
  }
  try {
    console.log("current:", current);
    console.log("outputData length:", outputData.length);
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${current}`
    );
    const data = await response.data;
    if (data.ingredients !== null)
    {
      /*
      Ingredient:
        - idIngredient
        - strIngredient
        - strDescription
        - strType
        - strAlcohol
        - strABV
      */
      outputData = outputData + 
      `{
        "id": "${data.ingredients[0].idIngredient || null}",
        "title": "${data.ingredients[0].strIngredient || null}",
        "description": "${data.ingredients[0].strDescription ? data.ingredients[0].strDescription.replaceAll("\"", "'").replaceAll("\n", "").replaceAll("\r", "") : null}",
        "type": "${data.ingredients[0].strType || null}",
        "alcohol": "${data.ingredients[0].strAlcohol || null}",
        "ABV": "${data.ingredients[0].strABV || null}"
      },`
    }
    return await fetchIngredients(current + 1, end, outputData);
  } catch(error)
  {
    if (error.response && error.response.status === 429) {
      let output = "";
      try {
        const outputPath = path.join(__dirname, "ingredients.json");
        await fs.appendFile(outputPath, outputData);
      } catch (err) {
        console.error(err);
      }
      setTimeout(() => output = fetchIngredients(current, end, ""), 10000);
      return output;
    }
    else
    {
      console.error(error);
      return outputData;
    }    
  }
};

const writeInFile = async () => {
  let outputData = await fetchCocktails(0, "");
  try {
    const outputPath = path.join(__dirname, "cocktails.json");
    await fs.appendFile(outputPath, outputData);
  } catch (err) {
    console.error(err);
  }
}

const writeInFileIngredients = async () => {
  let outputData = await fetchIngredients(1, 617, "[");
  try {
    const outputPath = path.join(__dirname, "ingredients.json");
    await fs.appendFile(outputPath, outputData);
  } catch (err) {
    console.error(err);
  }
}