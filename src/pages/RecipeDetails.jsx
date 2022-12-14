/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FetchContext from '../context/FetchContext';
import CardDetails from '../components/recipe-details-components/Card-Details.component';
// import Recomendation from '../components/Recomendations-Componentes/Recomendation';
import { MEALS_URL_BASE,
  MEALS_URL_DETAILS_ENDPOINT,
  DRINKS_URL_BASE,
  DRINKS_URL_DETAILS_ENDPOINT, MEALS_URL_DEFAULT_ENDPOINT,
  DRINKS_URL_DEFAULT_ENDPOINT } from '../helpers/constants';
import '../styles/RecipeDetails.css';

// import PropTypes from 'prop-types';
function RecipeDetails() {
  const {
    recipeDetails,
    getRecipeDetails,
    getRecomendations,
  } = useContext(FetchContext);

  const { strMeal, strMealThumb,
    strDrink, strDrinkThumb, strAlcoholic,
    strCategory, strInstructions, strYoutube,
    idMeal, idDrink, strArea,
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
      getRecomendations(`${DRINKS_URL_BASE}/${DRINKS_URL_DEFAULT_ENDPOINT}`);
    }

    if (pathname.includes('drinks')) {
      await getRecipeDetails(
        `${DRINKS_URL_BASE}/${DRINKS_URL_DETAILS_ENDPOINT}${id}`,
      );
      getRecomendations(`${MEALS_URL_BASE}/${MEALS_URL_DEFAULT_ENDPOINT}`);
    }
    return 0;
  };

  useEffect(() => {
    renderDetails();
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
      <CardDetails
        // * BASE INFORMATION TO DETAILS
        strCategory={ strCategory }
        strInstructions={ strInstructions }
        ingredientsAndRecipes={ ingredientsAndRecipes }
        strArea={ strArea }
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
      {/* <Recomendation /> */}
    </section>
  );
}

// RecipeDetails.propTypes = {};

export default RecipeDetails;
