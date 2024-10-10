
// import { produtos } from '../../../mocks/dados';
import InfoContatoEditar from '../../infoContatoEditar/page';

export default function InfoCod({ params }) {

    const codInfo = parseInt(params.cod);

    return (

        <InfoContatoEditar codInfo={codInfo} />

    );
}