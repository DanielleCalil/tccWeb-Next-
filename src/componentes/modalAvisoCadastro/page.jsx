import styles from './page.module.css';

const ModalAvisoCadastro = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.sucess}>Cadastro realizado com sucesso!</p>
                <p className={styles.text}>O seu cadastro só será aprovado após o administrador selecionar o seu nível de acesso, enquanto isso não será possível realizar o login.</p>
                <div className={styles.buttonsContainer}>
                    <button onClick={onConfirm} className={styles.modalButtonSim}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAvisoCadastro;
