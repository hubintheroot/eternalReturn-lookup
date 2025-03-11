import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import EditCoupon from "./Coupon/EditCoupon";
import DeleteCoupon from "./Coupon/DeleteCoupon";

export default function CouponCard({ data, isLogin, permission, handler }) {
  const [isUsed, setUsed] = useState(data["is_used"]);
  const [showModal, setModal] = useState(false);
  const mod = useRef();

  let expiresAt = null;

  useEffect(() => {
    setUsed(data["is_used"]);
  }, [data]);

  if (data.expires_at) {
    const date = new Date(data.expires_at);
    expiresAt = `${date.getFullYear().toString()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  }
  const copyHandler = (e) => {
    if (showModal || e.target.id === "edit-button") {
      return;
    }

    const toastInfo = {
      isShow: true,
      message: null,
      status: null,
    };
    try {
      navigator.clipboard.writeText(data.code);
      toastInfo.message = `복사된 쿠폰: ${data.code}`;
      toastInfo.status = "successed";
      setUsed(true);
      handler.isUsed(data);
    } catch (err) {
      toastInfo.message = `복사는 pc환경을 이용해주세요`;
      toastInfo.status = "alert";
      console.log(err);
    } finally {
      handler.toast.show(toastInfo);
    }
  };
  const modalHandler = {
    show: () => {
      setModal(true);
    },
    hide: () => {
      setModal(false);
    },
  };
  const buttonHandler = {
    edit: () => {
      mod.current = "edit";
      modalHandler.show();
    },
    del: () => {
      mod.current = "del";
      modalHandler.show();
    },
  };

  return (
    <Card onClick={copyHandler} $isUsed={isUsed}>
      <CodeText>{data.code}</CodeText>
      <P>
        🎁 <strong>{data.description}</strong>
      </P>
      <Expiry>
        <strong>
          {data.expires_at ? `~ ${expiresAt}` : `영구`}
          <br />
          {isUsed && "사용됨"}
          {!data["is_active"] && "만료됨"}
        </strong>
      </Expiry>
      {isLogin && permission && (
        <>
          <EditButton onClick={buttonHandler.edit} id="edit-button">
            Edit
          </EditButton>
          <DeleteButton onClick={buttonHandler.del} id="edit-button">
            Delete
          </DeleteButton>
        </>
      )}
      {showModal && (
        <Modal>
          {mod.current === "edit" ? (
            <EditCoupon
              onClose={modalHandler.hide}
              data={data}
              handler={handler}
            />
          ) : (
            <DeleteCoupon
              onClose={modalHandler.hide}
              data={data}
              handler={handler}
            />
          )}
        </Modal>
      )}
    </Card>
  );
}

const Card = styled.li`
  position: relative;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  ${(props) =>
    props.$isUsed &&
    `
      background-color: lightGrey;
      border-color: #d8d8d8;
      boxShadow: inset 0 2px 4px rgba(0,0,0,0.1);
      & h2 {
        color: PaleVioletRed
      }
  `}
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: #d4d4d4;
    transition: background-color 0.3s ease-in-out;
  }

  @media screen and (min-width: 768px) {
    width: 300px;
    margin-bottom: 0;
  }
`;
const EditButton = styled.div`
  border: 1px solid #000;
  border-radius: 8px;
  width: fit-content;
  padding: 0.5em 1em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;
const DeleteButton = styled.div`
  border: 1px solid #000;
  border-radius: 8px;
  width: fit-content;
  padding: 0.5em 1em;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;
const CodeText = styled.h2`
  font-size: 1.2rem;
  margin-top: 2em;
  margin-bottom: 8px;
  color: #007bff;
  text-align: center;
`;
const P = styled.p`
  margin: 8px 0;
  word-break: keep-all;
`;
const Expiry = styled(P)`
  color: #ff4d4f;
  text-align: end;
`;
