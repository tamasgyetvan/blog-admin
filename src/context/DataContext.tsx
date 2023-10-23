import { ReactNode, createContext, useEffect, useState } from "react";

type DataContextProviderProps = {
  children: ReactNode;
};

export const DataContext = createContext({
  data: [],
  errors: null,
  loading: true,
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3000/api/queryposts", {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errorMessage) {
          setErrors(response.errorMessage);
          setLoading(false);
        } else {
          console.log(response);
          setData(response);
          setLoading(false);
        }
      });
  }, []);

  return (
    <DataContext.Provider value={{ data, errors, loading }}>
      {children}
    </DataContext.Provider>
  );
}
