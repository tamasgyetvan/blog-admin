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
    const response = await data.json()
    return response;
}