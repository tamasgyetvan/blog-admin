type AuthResponseObject = {
  user?: string,
  token?: string,
  errorMessage?: string;
  successMessage?: string;
};


export const useFetch =  async (url: string, method: string, payload?: string) => {
    let body = null;
    if (payload) {
      body = payload
    }
     const data = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: body
    })
    const response: AuthResponseObject = await data.json()
    return response;
}