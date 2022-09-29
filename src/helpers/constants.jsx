// * * NUMBERS INFORMATION
export const MIN_PASSWORD = 6;
export const MAX_LIMIT_INFORMATION = 12;

// * * URL CONSTANTS
// * MEALS URL
export const MEALS_URL_BASE = 'https://www.themealdb.com/api/json/v1/1';
export const MEALS_URL_DEFAULT_ENDPOINT = 'search.php?s=';
export const MEALS_URL_FILTER_ENDPOINT = 'filter.php?c=';
export const MEALS_URL_DETAILS_ENDPOINT = 'lookup.php?i=';

export const MEALS_URL_ING_ENDPOINT = 'filter.php?i=';
export const MEALS_URL_FL_ENDPOINT = 'search.php?f=';

// * DRINKS URL
export const DRINKS_URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1';
export const DRINKS_URL_DEFAULT_ENDPOINT = 'search.php?s=';
export const DRINKS_URL_FILTER_ENDPOINT = 'filter.php?c=';
export const DRINKS_URL_DETAILS_ENDPOINT = 'lookup.php?i=';
export const DRINKS_URL_ING_ENDPOINT = 'filter.php?i=';
export const DRINKS_URL_FL_ENDPOINT = 'search.php?f=';

// * * TEST INFORMATIONS
export const PASSWORD_TEST = 'ABC123##';
export const EMAIL_TEST = 'teste@teste.com';

// * * LINKS INFORMATIONS
export const MAIN_LOGIN_PAGE = '/';
export const MEALS_LINK = '/meals';
export const DRINKS_LINK = '/drinks';
export const RCP_DETAILS_MEALS_LINK = '/meals/:id';
export const RCP_DETAILS_DRINKS_LINK = '/drinks/:id';
export const PROFILE_LINK = '/profile';
export const FAVORITE_RECIPES = '/favorite-recipes';
export const DONE_RECIPES = '/done-recipes';
export const RCP_IN_PROGRESS_MEALS = '/meals/:id/in-progress';
export const RCP_IN_PROGRESS_DRINKS = '/drinks/:id/in-progress';
export const CHICKEN_CATEGORY_FILTER = 'Chicken-category-filter';

// * * COMPONENTS INFORMATIONS
export const EMAIL = 'email';
export const PASSWORD = 'password';

// * * DATA_TEST_IDS INFORMATIONS
// * LOGIN PAGE
export const TEST_ID_EMAIL_INPUT = 'email-input';
export const TEST_ID_PASSWORD_INPUT = 'password-input';
export const TEST_ID_LOGIN_SUBMIT = 'login-submit-btn';
// * FOOTER
export const TEST_ID_FOOTER_DRINKS = 'drinks-bottom-btn';
export const TEST_ID_FOOTER_MEALS = 'meals-bottom-btn';
// * HEADER
export const TEST_ID_HEADER_SEARCH = 'search-top-btn';
export const TEST_ID_HEADER_PROFILE = 'profile-top-btn';
// * SEARCHBAR
export const TEST_ID_SEARCHBAR_INPUT = 'search-input';
export const TEST_ID_SEARCHBAR_BTN = 'exec-search-btn';
export const TEST_ID_SEARCHBAR_FL_FILTER = 'first-letter-search-radio';
export const TEST_ID_SEARCHBAR_NAME_FILTER = 'name-search-radio';
export const TEST_ID_SEARCHBAR_ING_FILTER = 'ingredient-search-radio';

// * LOCAL STORAGE INFORMATIONS
export const USER_KEY_LS = 'user';
export const MEALS_TOKEN_KEY_LS = 'mealsToken';
export const DRINKS_TOKEN_KEY_LS = 'drinksToken';

// * CATEGORY INFORMATIONS
export const MAX_LIMIT_CATEGORY = 5;
export const MEALS_CATEGORY_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORY_LIST = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
