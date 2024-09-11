// "use client"; // Adicione esta linha no topo

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import styles from './page.module.css';
// import axios from 'axios'; // Importando o axios

// export default function Biblioteca({ livroId }) {
//     const [livro, setLivro] = useState(null); // Estado para armazenar os dados do livro
//     const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
//     const [error, setError] = useState(null); // Estado para capturar erros

//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

//     const imageLoader = ({ src, width, quality }) => {
//         return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
//     };

//     useEffect(() => {
//         async function fetchLivro() {
//             try {
//                 const response = await axios.get(`${apiUrl}:${apiPorta}/livro/${livroId}`);
//                 setLivro(response.data);
//             } catch (error) {
//                 setError('Erro ao carregar o livro');
//                 console.error('Erro ao buscar livro:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchLivro();
//     }, [livroId]);

//     if (loading) {
//         return <p>Carregando...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <>
//             {livro && livro.liv_foto_capa ? (
//                 <Image
//                     loader={imageLoader}
//                     src={livro.liv_foto_capa}
//                     alt={livro.liv_nome}
//                     width={200}
//                     height={200}
//                     className={styles.bookImage}
//                 />
//             ) : (
//                 <p>Imagem não disponível</p>
//             )}
//         </>
//     );
// }
