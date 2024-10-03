
// import { produtos } from '../../../mocks/dados';
import InfoLivroBiblioteca from '../../infoLivroBiblioteca/page';

export default function LivrosCod({ params }) {

    const codLivro = parseInt(params.cod);

    return (

        <InfoLivroBiblioteca codLivro={codLivro} />

    );
}