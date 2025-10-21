import { useGetIdiomaAsistenciasPagina } from '../api/generated';

const useAuth = () => {

  const { isLoading, isError } = useGetIdiomaAsistenciasPagina("es");

  //const isAuthenticated = !isLoading && !isError && !!data;
const isAuthenticated = true;
  return { isAuthenticated, isLoading, isError };
};

export default useAuth;
