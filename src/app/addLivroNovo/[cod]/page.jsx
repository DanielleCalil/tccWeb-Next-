
// import { produtos } from '../../../mocks/dados';
import AddLivroNovo from "../page";

export default function LivCod({ params }) {

    const codLiv = parseInt(params.cod);

    return (

        <AddLivroNovo codLiv={codLiv} />

    );
}