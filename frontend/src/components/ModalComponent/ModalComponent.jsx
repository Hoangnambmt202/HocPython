
import styles from "./Modal.module.scss";
import { X } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 !mt-0 inset-0 z-50 flex items-center justify-center">

      <div className={`${styles["modal-container"]} ${styles["modal-open"]} scrollbar-hide `}>
        {/* Header */}
        <div className="flex justify-end items-center">
        
            <button onClick={onClose} className={styles["close-btn"]}>
              <X />
            </button>
          </div>
       

        {/* Body */}
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    <div className={styles["modal-overlay"]}>
    </div>
    </div>
  );
};

export default Modal;
  