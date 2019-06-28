export const set = (arrofObj) => {
    localStorage.setItem('savedLinks', JSON.stringify(arrofObj))
}
export const get = () => {
    const local = localStorage.getItem("savedLinks")
    return  local ? JSON.parse(local) : [];
}