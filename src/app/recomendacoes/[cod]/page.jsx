// import { produtos } from '../../../mocks/dados';
import InfoLivroRecomendacao from '../../infoLivroRecomendacao/page';

export default function LivrosCodRec({ params }) {
    const codLivroRec = parseInt(params.cod);

    return (
        <InfoLivroRecomendacao codLivroRec={codLivroRec} />
    );
}