import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material"
type Props = {
    showFlag: boolean;
    setShowModal: any;
}

const Modal = (props: Props) => {
    const closeModal = () => {
        props.setShowModal(false);
    };
  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay">
          <div id="modalContent">
            <p>メールを送信しました</p>
            <Link href="/">ログイン画面へ</Link>
          </div>
        </div>
      ) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
