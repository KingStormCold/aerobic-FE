import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { resetToastMessage } from 'app/shared/reducers/toast-message';

const ToastWrapper = styled.div`
    border-radius: 6px;
    display: flex;
    position: relative;
    align-items: center;
    .close-icon {
        position: absolute;
        right: 15px;
        top: 10px;
        cursor: pointer;
    }
`;

const ToastBodyWrapper = styled.div`
    display: 'flex';
    flex-direction: column;
    margin-left: 10px;
`;
const ToastBody = styled.p`
    margin: 0;
    margin-top: 5px;
`;

const StyledToastContainer = styled(ToastContainer)`
    .Toastify__toast-container--top-right {
        bottom: 1em;
        right: 1em;
    }
    .Toastify__toast {
        padding: 0px;
        min-height: 0px;
    }
    .toast-progressbar {
    }
`;

const CustomToastComp = ({ contentText }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetToastMessage())
  }, [])
  return (
    <>
      <ToastWrapper>
        <ToastBodyWrapper>
          <ToastBody>
            <Card.Text as="div" >{contentText}</Card.Text>
          </ToastBody>
        </ToastBodyWrapper>
      </ToastWrapper>
    </>
  );
};

export const ToastMessage = () => {
  const isOpen = useAppSelector(state => state.toastMessage.isOpen);
  const message = useAppSelector(state => state.toastMessage.message);
  const isError = useAppSelector(state => state.toastMessage.isError);
  const notify = () =>
    isError ? toast.error(<CustomToastComp contentText={message} />, {
      position: toast.POSITION.BOTTOM_RIGHT,
    }) :
      toast.success(<CustomToastComp contentText={message} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  if (isOpen) {
    notify();
  }
  return (
    <StyledToastContainer hideProgressBar={false} autoClose={10000} limit={5} />
  );
};
