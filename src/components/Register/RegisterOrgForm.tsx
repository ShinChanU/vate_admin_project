import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Button, Modal } from "react-bootstrap";
import { OrganizationStore, OrgProps } from "lib/zustand/organization";
import { getOrganization } from "lib/api/volunteerApi";

declare global {
  interface Window {
    kakao: any;
  }
}

const Container = styled.div`
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div > div > label {
    margin-top: 5px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  margin-top: 10px;

  .org {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Label = styled.label`
  width: 80px;
`;

const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RegisterOrgForm = ({ modDataId, onSetListView }: any) => {
  const { kakao } = window;
  const { postOrganization } = OrganizationStore();
  const [modalIsOpen, setModalsOpen] = useState(false);
  const [orgData, setOrgData] = useState<OrgProps>({
    id: undefined,
    name: undefined,
    manager: undefined,
    contact: undefined,
    address: {
      detailAddress: undefined,
      zipcode: undefined,
      coordinate: {
        longitude: undefined, // 경도  125
        latitude: undefined, // 위도  35
      },
    },
  });

  useEffect(() => {
    if (modDataId) {
      (async () => {
        const res = await getOrganization(modDataId);
        if (res?.data?.statusCode === 200) {
          let tmp = res.data.result;
          setOrgData(tmp);
        }
      })();
    }
  }, [modDataId]);

  useEffect(() => {
    if (orgData.address?.detailAddress) {
      getLALOInfo(orgData.address?.detailAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgData.address?.detailAddress]);

  const onClickPostOrg = async () => {
    if (orgData.id && window.confirm("수정하시겠습니까?")) {
      await postOrganization(orgData);
    }

    if (!orgData.id) {
      let res = await postOrganization(orgData);
      if (res)
        setOrgData({
          id: undefined,
          name: undefined,
          manager: undefined,
          contact: undefined,
          address: {
            detailAddress: undefined,
            zipcode: undefined,
            coordinate: {
              longitude: undefined,
              latitude: undefined,
            },
          },
        });
    }
  };

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

  return (
    <Container>
      <div className="org">
        <div>
          <Label>기관명</Label>
          <input
            value={orgData?.name || ""}
            name="name"
            onChange={onChangeOrgData}
          />
        </div>
        <div>
          <Label>기관 주소</Label>
          <input
            style={{ marginRight: "10px" }}
            disabled
            name="address"
            onChange={onChangeOrgData}
            value={orgData?.address?.detailAddress || ""}
          />
          <Button onClick={handleShow}>주소 찾기</Button>
        </div>
        <div>
          <Label>담당자</Label>
          <input
            value={orgData?.manager || ""}
            name="manager"
            onChange={onChangeOrgData}
          />
        </div>
        <div>
          <Label>기관 번호</Label>
          <input
            value={orgData?.contact || ""}
            name="contact"
            onChange={onChangeOrgData}
          />
        </div>
      </div>
      <Modal size="lg" centered show={modalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>주소 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal.Body>
      </Modal>
      <BtnFlex>
        {!modDataId && (
          <Button variant="dark" onClick={onSetListView}>
            목록
          </Button>
        )}
        <Button variant="primary" onClick={onClickPostOrg}>
          {modDataId ? "수정" : "등록"}
        </Button>
      </BtnFlex>
    </Container>
  );
};

export default RegisterOrgForm;
