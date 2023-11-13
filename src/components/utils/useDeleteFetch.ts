export const useDeleteFetch =  async (url: string, method: string) => {

    const data = await fetch(url, {
        method: method,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json",
        },
      })
      const response = await data.json()
      return response;
}