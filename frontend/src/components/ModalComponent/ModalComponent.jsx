import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Modal.module.scss";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, title, children }) => {
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
        <div className={styles["modal-header"]}>
          
          <h1 className={styles["modal-title"]}>{title}</h1>
          <p className="text-red-500 text-sm mt-4">Mỗi người nên sử dụng riêng một tài khoản. Tài khoản nhiều người sử dụng sẽ bị khóa </p>
         
        </div>

        {/* Body */}
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
  