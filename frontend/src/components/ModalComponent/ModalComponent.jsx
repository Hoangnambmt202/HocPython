
import styles from "./Modal.module.scss";
import { X } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={`${styles["modal-container"]} ${styles["modal-open"]}`}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
            <button onClick={onClose} className={styles["close-btn"]}>
              <X />
            </button>
          </div>
       

        {/* Body */}
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
  