import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { FullPageSpinner } from './FullPageSpinner';
import { Todo } from './Todo';

const MobileSchedule = React.lazy(() => import('./MobileSchedule'));

const Mobile = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <Todo />
                <Link to="/schedule">Schedule</Link>
              </Fragment>
            }
          />
          <Route path="/schedule" element={<MobileSchedule />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Mobile;
