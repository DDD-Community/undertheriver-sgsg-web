import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

export default function ErrorPopup(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    if (props.active === 'active') setIsOpen(true);
    else onClose();
  }, [props.active]);

  const onClose = () => {
    props.setErrorPopup({
      active: '',
      content: '',
    });
    setIsOpen(false);
  };

  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              안내
            </AlertDialogHeader>

            <AlertDialogBody>{props.content}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} colorScheme="gray" onClick={onClose}>
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
