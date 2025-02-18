import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.scss";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={`${styles["modal-container"]} ${styles["modal-open"]}`}>
        {/* Header */}
        <div className="flex justify-end items-center">
            <button onClick={onClose} className={styles["close-btn"]}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
       

        {/* Body */}
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
  