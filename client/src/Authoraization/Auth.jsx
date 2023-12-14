// Stroring the backend data.
export const StoreData = (response) => {
    sessionStorage.setItem('profiledata',JSON.stringify(response));
}
// check if user have data.
export const haveData = () => {
    if(sessionStorage.getItem('profiledata'))return true;
    return false;
}
// return the user Data.
export const getData = () => {
    return JSON.parse(sessionStorage.getItem('profiledata'));
}
// Log out current user or remove the user data.
export const deleteData = () => {
    sessionStorage.removeItem('profiledata');
}
