
// import { produtos } from '../../../mocks/dados';
import LivroRec from '../../infoLivroRecomendacao/page';

export default function LivrosCodRec({ params }) {
    const codLivroRec = parseInt(params.cod);
    console.log("Código do livro recomendado:", codLivroRec); // Verificar se o código está sendo recebido corretamente

    return (
        <LivroRec codLivroRec={codLivroRec} />
    );
}


