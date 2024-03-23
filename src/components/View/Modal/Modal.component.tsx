import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import './modal.style.scss';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalCustom: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
        <Dialog open={open} onClose={onClose} className="modal-dialog">
            <DialogContent className="modal-dialog__content">
                {children}
            </DialogContent>
            <DialogActions className="modal-dialog__actions">
                <Button
                    className="modal-dialog__close"
                    onClick={onClose}
                    color="primary"
                >
                    Закрити
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCustom;
