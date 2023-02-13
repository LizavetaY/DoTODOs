import { createSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateParams = () => {
  const navigate = useNavigate();

  return (pathname, params) => {
    const path = {
      pathname,
      search: createSearchParams(params).toString()
    };

    navigate(path);
  };
};
