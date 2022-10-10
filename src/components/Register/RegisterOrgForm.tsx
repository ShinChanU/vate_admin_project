import { OrgProps } from "lib/zustand/registerStore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Button, Modal } from "react-bootstrap";

declare global {
  interface Window {
    kakao: any;
  }
}

const Container = styled.div`
  > div > label {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
`;

const RegisterOrgForm = ({ modDataId }: any) => {
  const { kakao } = window;
  const [modalIsOpen, setModalsOpen] = useState(false);
  const [orgData, setOrgData] = useState<OrgProps>({
    id: undefined,
    name: undefined,
    manager: undefined,
    organPhoneNumber: undefined,
    address: {
      detailAddress: undefined,
      zipcode: undefined,
      coordinate: {
        longitude: undefined, // 경도  125
        latitude: undefined, // 위도  35
      },
    },
  });

  const { name, manager, organPhoneNumber, address } = orgData;
  console.log(orgData);

  // 주소에 따라 위도, 경도 저장
  const getLALOInfo = async (addr: any) => {
    kakao.maps.load(() => {
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(addr, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setOrgData({
            ...orgData,
            address: {
              ...orgData.address,
              coordinate: {
                longitude: +result[0].x,
                latitude: +result[0].y,
              },
            },
          });
        }
      });
    });
  };

  // 모달 컨트롤 함수
  const handleClose = () => setModalsOpen(false);
  const handleShow = () => setModalsOpen(true);

  // input 데이터 관리
  const onChangeOrgData = (e: any) => {
    setOrgData({
      ...orgData,
      [e.target.name]: e.target.value,
    } as Pick<OrgProps, keyof OrgProps>);
  };

  // 모달창으로부터 주소 받아오는 함수
  const handleComplete = (data: any) => {
    setOrgData({
      ...orgData,
      address: {
        ...orgData.address,
        detailAddress: data.address,
        zipcode: data.zonecode,
      },
    });
    handleClose();
  };

  // useEffect(() => {
  //   if (modDataId) {
  //     console.log(modDataId);
  //     // api
  //   }
  // }, [modDataId]);

  useEffect(() => {
    if (orgData.address?.detailAddress) {
      getLALOInfo(orgData.address?.detailAddress);
    }
  }, [orgData.address?.detailAddress]);

  return (
    <Container>
      <div>
        <label>기관명</label>
        <input value={name || ""} name="name" onChange={onChangeOrgData} />
      </div>
      <div>
        <label>기관 주소</label>
        <input
          disabled
          name="address"
          onChange={onChangeOrgData}
          value={address?.detailAddress || ""}
        />
        <Button onClick={handleShow}>주소 찾기</Button>
      </div>
      <div>
        <label>담당자</label>
        <input
          value={manager || ""}
          name="manager"
          onChange={onChangeOrgData}
        />
      </div>
      <div>
        <label>기관 번호</label>
        <input
          value={organPhoneNumber || ""}
          name="organPhoneNumber"
          onChange={onChangeOrgData}
        />
      </div>
      <Modal size="lg" centered show={modalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>주소 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RegisterOrgForm;
