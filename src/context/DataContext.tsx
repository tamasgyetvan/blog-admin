import { ReactNode, createContext, useEffect, useState } from "react";

type DataContextProviderProps = {
  children: ReactNode;
};

export type BlogPost = {
  _id: string | undefined;
  author: object;
  text: string;
  timestamp: string;
  title: string;
};

type DataContext = {
  data: Array<BlogPost>;
  loading: boolean;
  error: string | null;
  removeBlogItem: (id: string | undefined) => void;
  renderTriggerer: () => void;
};

export const DataContext = createContext({} as DataContext);

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [data, setData] = useState<Array<BlogPost>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState(null);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const token = localStorage.getItem("token");

  const removeBlogItem = (id: string | undefined) => {
    setData(data.filter((data) => data._id !== id));
  };

  const renderTriggerer = () => {
    setRenderTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (token) {
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
    }
  }, [renderTrigger]);

  return (
    <DataContext.Provider
      value={{
        data,
        error,
        loading,
        removeBlogItem,
        renderTriggerer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
