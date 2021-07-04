// import React, { cloneElement, isValidElement, ReactNode, useCallback, useState } from 'react';
//
// import Modal from '../components/Modal';
//
// interface UseModal {
//   children: ReactNode;
//   handleOpenedCallback?: VoidFunction;
//   handleClosedCallback?: VoidFunction;
// }
//
// const useModal = ({ handleClosedCallback, handleOpenedCallback, children }: UseModal) => {
//   const [isOpen, setIsOpen] = useState(false);
//
//   const handleOpen = useCallback(() => {
//     setIsOpen(true);
//   }, []);
//
//   const handleClose = useCallback(() => {
//     setIsOpen(false);
//   }, []);
//
//   const renderModal = () => (
//     <Modal
//       isOpen={isOpen}
//       onOpened={handleClosedCallback}
//       onClosed={handleOpenedCallback}
//       onClose={handleClose}
//     >
//       {isValidElement(children)
//         ? cloneElement(children, {
//             onClose: handleClose,
//           })
//         : children}
//     </Modal>
//   );
//
//   return {
//     handleOpen,
//     handleClose,
//     renderModal,
//   };
// };
//
export default {};

