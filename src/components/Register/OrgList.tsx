import React from "react";
import { RegisterStore } from "lib/zustand/registerStore";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const tmp = [
  {
    id: 1,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },
  {
    id: 2,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },
  {
    id: 3,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },
  {
    id: 4,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },

  {
    id: 4,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },
  {
    id: 4,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },
  {
    id: 4,
    name: "찬우센터",
    manager: "신찬우",
    organPhoneNumber: "01028333904",
    address: {
      detailAddress: "주소주소",
      zipcode: "1234123",
      coordinate: {
        longitude: 127.0102,
        latitude: 37.1203,
      },
    },
  },
];

const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrgList = ({ setModView, setModDataId }: any) => {
  const { organizations } = RegisterStore();

  console.log(organizations, tmp.length);

  const onClickModBtn = (id: number) => {
    setModView(true);
    setModDataId(id);
  };

  return (
    <div>
      {!!tmp.length && (
        <>
          {tmp.map((e) => (
            <div>
              <div>기관명 {e.name}</div>
              <div>기관주소 {e.address.detailAddress}</div>
              <div>담당자 {e.manager}</div>
              <div>기관번호 {e.organPhoneNumber}</div>
              <BtnFlex>
                <Button variant="primary" onClick={() => onClickModBtn(e.id)}>
                  수정
                </Button>
                <Button variant="danger" onClick={() => setModView(true)}>
                  삭제
                </Button>
              </BtnFlex>
            </div>
          ))}
        </>
      )}
      {tmp.length === 0 && <>조회되는 활동 기관이 없습니다. 추가해주세요</>}
    </div>
  );
};

export default OrgList;
