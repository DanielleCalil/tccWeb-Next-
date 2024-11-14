
// import { produtos } from '../../../mocks/dados';
import reservarLivro from "../../reservarLivro";

export default function LivrosCod({ params }) {

    const livroCod = parseInt(params.cod);

    return (

        <reservarLivro livroCod={livroCod} />

    );
}