// import { produtos } from '../../../mocks/dados';
import LivroRec from '../../infoLivroRecomendacao/page';

export default function LivrosCodRec({ params }) {
    const codLivroRec = parseInt(params.cod);

    return (
        <LivroRec codLivroRec={codLivroRec} />
    );
}