const useAuth = () => {
    return {isAuthenticated : true};
  //const isAuthenticated = !!localStorage.getItem('token'); // por ejemplo
  //return { isAuthenticated };
};

export default useAuth;