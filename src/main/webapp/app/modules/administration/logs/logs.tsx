import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';

import { getLoggers, changeLogLevel } from '../administration.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LogsPage = () => {
  // const [filter, setFilter] = useState('');
  // const logs = useAppSelector(state => state.administration.logs);
  // const isFetching = useAppSelector(state => state.administration.loading);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getLoggers());
  // }, []);

  // const changeLevel = (loggerName, level) => () => dispatch(changeLogLevel(loggerName, level));

  // const changeFilter = evt => setFilter(evt.target.value);

  // const getClassName = (level, check, className) => (level === check ? `btn btn-sm btn-${className}` : 'btn btn-sm btn-light');

  // const filterFn = l => l.name.toUpperCase().includes(filter.toUpperCase());

  // const loggers = logs ? Object.entries(logs.loggers).map(e => ({ name: e[0], level: e[1].effectiveLevel })) : [];

  return (
    <div className="p-5">
      <h4>Logged out successfully!12312312312</h4>
    </div>
  );
};

export default LogsPage;
