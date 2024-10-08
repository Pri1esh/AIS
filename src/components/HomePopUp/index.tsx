import { CustomImage } from "@components";
import styles from "./homePopUp.module.scss";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modalBody}
    >
      <Modal.Body className={styles.modalBox}>
        <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
        <CustomImage
          src={{
            mobileSource: props?.image[0]?.imageSourceMobile,
            tabletSource: props?.image[0]?.imageSourceTablet,
            defaultSource: props?.image[0]?.imageSource
          }}
          alt={props?.imageAlt}
        />
      </Modal.Body>
    </Modal>
  );
}

const HomePopUp = (props: any) => {
  const { compData } = props;
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if(!sessionStorage.getItem('PopUp-Show')){
      setModalShow(true);
      sessionStorage.setItem('PopUp-Show','true');
    }
    
  }, []);

  return (
    <>
      {compData && (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          image={compData}
        />
      )}
    </>
  );
};

export default HomePopUp;
