import { useGetIdiomaTiposPlanes } from '../api/generated';

const useAuth = () => {

  const { isLoading, isError } = useGetIdiomaTiposPlanes("es");

  //const isAuthenticated = !isLoading && !isError && !!data;
const isAuthenticated = true;
  return { isAuthenticated, isLoading, isError };
};

export default useAuth;
