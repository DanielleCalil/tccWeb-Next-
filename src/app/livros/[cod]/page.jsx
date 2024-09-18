
// import { produtos } from '../../../mocks/dados';
import Livro from '../../infoLivroBiblioteca';

export default function LivrosCod({ params }) {

    const codLivro = parseInt(params.cod);

    return (

        <Livro codLivro={codLivro} />

    );
}