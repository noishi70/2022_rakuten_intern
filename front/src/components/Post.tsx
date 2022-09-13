import React, { useState } from 'react';
import {TextField, Button , IconButton} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import styled from 'styled-components';
import STYLES from '../styles/const';

type Content = {
  title: string;
  url: string ;
  time: number;
  text: string;
}

type Props = {
  setContent:  (arg:Content) => void,
}

export default function Search(props: Props){
  const [tweet, setTweet] = useState<Content>({title: "", url: "", time: 0, text: ""});


  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, title: event.target.value})
  }
  const handleURLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, url: event.target.value})
  }
  const handleTimeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, time:  Number(event.target.value)})
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, text: event.target.value})
  }
  const output = () => {
    console.log(tweet)
  }

  return(
    <Wrapper>
      <Head>
      <IconWrapper>
        <IconButton  aria-label="Search" size="large">
          <CancelOutlinedIcon />
        </IconButton>
      </IconWrapper>
      </Head>
      <Body>
        <User>
          <img src="https://placehold.jp/3d4070/ffffff/150x150.png"/>
        </User>
        <Form>
          <FormLine>
            <textarea
              placeholder="タイトル"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTitleChange(event)}
            />
          </FormLine>
          <FormLine>
            <textarea
              placeholder="URL"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleURLChange(event)}
            />
          </FormLine>
          <FormLine>
            <textarea
              placeholder="所要時間"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTimeChange(event)}
            />
          </FormLine>
          <FormText>
            <textarea
              placeholder="内容"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(event)}
            />
          </FormText>
          
          <FormTail>
            <ButtonWrapper>
              <Button variant="text" onClick={() => output()}> 投稿 </Button>
            </ButtonWrapper>
          </FormTail>
        </Form>
      </Body>
    </Wrapper>
  );
}



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 60vh;
  background-color: ${STYLES.COLOR.WHITE};
  @media ${STYLES.DEVICE.LAPTOP} {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 295px;
    background-color: ${STYLES.COLOR.WHITE};
    border-radius: 14px;
  }
`;

const Head = styled.div`
  height: 60px;
  padding: 0 15px;
  border-bottom: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius: 50%;
  &:hover {
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_30};
  }
  &:active {
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_20};
  }
  svg {
    width: 100%;
    height: 100%;
    fill: ${STYLES.COLOR.PRIMARY};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  padding: 10px 15px;
`;

const User = styled.div`
  width: 50px;
  margin-right: 5px;
  img {
    width: 50px;
    height: 50px;
    pointer-events: none;
    user-select: none;
    border-radius: 50%;
  }
`;

const Form = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const FormText = styled.div`
  flex: 1;
  textarea {
    width: 100%;
    height: 100%;
    font-size: 19px;
    line-height: 1.3;
  }
`;

const FormLine = styled.div`
  flex: 1;
  textarea {
    width: 100%;
    height: 40%;
    font-size: 19px;
    line-height: 1.3;
  }
  textfiled {
    width: 100%;
    height: 40%;
    font-size: 19px;
    line-height: 1.3;
  }

`;

const FormTail = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 50px;
`;

const ButtonWrapper = styled.div`
  width: 150px;
  height: 40px;
`;

const WordCounter = styled.div`
  margin: 10px;
`;
