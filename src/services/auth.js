const STORAGE_KEY = 'SmoakBook';

/* 
    Tranforma o retorno de getItem em um booleano, assim se houver algum valor em STORAGE_KEY o retorno é verdadeiro. 
    Esse storageKey deve vir da API e é validado pela mesma. 
*/

const isLogged = () => !!localStorage.getItem(STORAGE_KEY);
const login = token => localStorage.setItem(STORAGE_KEY, token);
const logout = () => localStorage.removeItem(STORAGE_KEY);

const dados = JSON.parse(localStorage.getItem(STORAGE_KEY));
// const tipo = dados?.tipo; 
// "id": usuario.usu_id,
// "nome": usuario.usu_nome,
// "acesso": usuario.usu_tipo


export { isLogged, login, logout, dados }