import { ReactNode, createContext, useEffect, useState } from "react";

type DataContextProviderProps = {
  children: ReactNode;
};

type BlogPost = {
  _id: string;
  author: object;
  text: string;
  timestamp: string;
  title: string;
};

type DataContext = {
  data: Array<BlogPost>;
  loading: boolean;
  error: string | null;
  addBlogItem: (item: BlogPost) => void;
  removeBlogItem: (id: string) => void;
};

export const DataContext = createContext({} as DataContext);

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [data, setData] = useState<Array<BlogPost>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState(null);
  const token = localStorage.getItem("token");

  const addBlogItem = (item: BlogPost) => {
    setData([...data, item]);
  };
  const removeBlogItem = (id: string) => {
    setData(data.filter((data) => data._id !== id));
  };

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
    <DataContext.Provider
      value={{ data, error, loading, addBlogItem, removeBlogItem }}
    >
      {children}
    </DataContext.Provider>
  );
}
