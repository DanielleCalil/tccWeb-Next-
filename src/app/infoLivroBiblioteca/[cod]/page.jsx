
// import { produtos } from '../../../mocks/dados';
import EditarInformacoesLivro from '../../editarInfoLivro/page';

export default function LivrosCod({ params }) {

    const codLivro = parseInt(params.cod);

    return (

        <EditarInformacoesLivro codLivro={codLivro} />

    );
}