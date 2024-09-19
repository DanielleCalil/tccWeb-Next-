import styles from './page.module.css';

const ModalConfirmar = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.text}>Tem certeza que deseja realizar esta ação?</p>
                <div className={styles.buttonsContainer}>
                    <button onClick={onConfirm} className={styles.modalButtonSim}>Sim</button>
                    <button onClick={onClose} className={styles.modalButtonNao}>Não</button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmar;
