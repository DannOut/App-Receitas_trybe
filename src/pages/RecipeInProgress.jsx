import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FetchContext from '../context/FetchContext';
import CardInProgress from
  '../components/recipe-details-components/Card-In-Progress.component';
import {
  MEALS_URL_BASE,
  MEALS_URL_DETAILS_ENDPOINT,
  DRINKS_URL_BASE, DRINKS_URL_DETAILS_ENDPOINT,
} from '../helpers/constants';
import '../styles/RecipeDetails.css';

function RecipeInProgress() {
  const {
    recipeDetails,
    getRecipeDetails,
  } = useContext(FetchContext);

  const { strMeal, strMealThumb,
    strDrink, strDrinkThumb, strAlcoholic,
    strCategory, strInstructions, strYoutube,
    idMeal, idDrink, strArea, strTags,
  } = recipeDetails;

  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  // const [strIngredients, setStrIngredients] = useState([]);
  // const [strMeasure, setStrMeasure] = useState([]);

  const renderDetails = async () => {
    if (pathname.includes('meals')) {
      await getRecipeDetails(
        `${MEALS_URL_BASE}/${MEALS_URL_DETAILS_ENDPOINT}${id}`,
      );
    }

    if (pathname.includes('drinks')) {
      await getRecipeDetails(
        `${DRINKS_URL_BASE}/${DRINKS_URL_DETAILS_ENDPOINT}${id}`,
      );
    }
    return 0;
  };

  useEffect(() => {
    renderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getIngredients = () => {
    const value = Object.entries(recipeDetails);
    const getIngredientsAndRecipes = value.reduce((acc, curr) => {
      const { ingredients, measures } = acc;
      if (curr[0].includes('strIngredient') && recipeDetails[curr[0]]) {
        acc = { ...acc, ingredients: [...ingredients, curr[1]] };
      }
      if (curr[0].includes('strMeasure') && recipeDetails[curr[0]]) {
        acc = { ...acc, measures: [...measures, curr[1]] };
      }
      return acc;
    }, { ingredients: [], measures: [] });
    return getIngredientsAndRecipes;
  };

  const ingredientsAndRecipes = getIngredients();

  return (
    <section>
      <CardInProgress
        // * BASE INFORMATION TO DETAILS
        strCategory={ strCategory }
        strInstructions={ strInstructions }
        ingredientsAndRecipes={ ingredientsAndRecipes }
        strArea={ strArea }
        strTags={ strTags }
        // * MEAL INFORMATION TO DETAILS
        idMeal={ idMeal }
        strMeal={ strMeal }
        strMealThumb={ strMealThumb }
        strYoutube={ strYoutube }
        // * DRINKS INFORMATION TO DETAILS
        idDrink={ idDrink }
        strDrink={ strDrink }
        strDrinkThumb={ strDrinkThumb }
        strAlcoholic={ strAlcoholic }
      />
    </section>
  );
}

export default RecipeInProgress;
