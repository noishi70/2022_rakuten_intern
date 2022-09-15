import {
    Link,
  } from "@mui/material"
type Props = {
    showFlag: boolean;
    setShowModal: any;
}

const Modal = (props: Props) => {
  return (
    <>
      {props.showFlag ? (
        <div id="overlay">
          <div id="modalContent">
            <p>メールを送信しました</p>
            <Link href="/">ログイン画面へ</Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
