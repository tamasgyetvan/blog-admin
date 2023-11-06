export const useFetch =  async (url: string, method: string, payload: string) => {
    
     const data = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: payload,
    })
    const response = await data.json()
    return response;
}