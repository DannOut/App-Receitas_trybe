import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { createBrowserHistory } from 'history';

const renderWithRouter = (component, route = '/') => {
  // const history = createMemoryHistory({ initialEntries: [route] });
  // return {
  //   ...render(
  //     <Router history={ history }>
  //       {component}
  //     </Router>,
  //   ),
  //   history,
  // };

  const history = createBrowserHistory();
  history.push(route);
  const { ...resources } = render(
    <Router history={ history }>
      {component}
    </Router>,
  );
  return { ...resources, history };
};

export default renderWithRouter;
