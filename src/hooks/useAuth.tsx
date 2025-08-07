import { useState, useEffect } from 'react';
import { getWacApi } from '../api/generated';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  //TODO -- implementado open api, esperar carga de idiomas..
  useEffect(() => {
    const api = getWacApi();

    api.getIdiomas()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(true);
      });
  }, []);

  return { isAuthenticated };
};

export default useAuth;
