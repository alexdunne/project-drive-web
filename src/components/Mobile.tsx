import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from './ErrorBoundary';
import { FullPageSpinner } from './FullPageSpinner';
import { Todo } from './Todo';

const MobileSchedule = React.lazy(() => import('./MobileSchedule'));

const Mobile = () => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default Mobile;
