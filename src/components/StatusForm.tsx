import React, { useEffect, useState } from "react";
import { ActivityStore } from "lib/zustand/activityStore";
import { OrgProps } from "lib/zustand/organization";
import styled from "styled-components";
import VolItem from "components/Volunteer/VolItem";
import VolDetail from "./Volunteer/VolDetail";
import { deleteActivity, updateActivity } from "lib/api/volunteerApi";
import VolDetailInfo from "./Volunteer/VolDetailInfo";
import { Button } from "react-bootstrap";

const VolList = styled.div`
  margin-top: 10px;
  border: 1px solid rgba(50, 50, 93, 0.25);
  border-radius: 5px;
  padding: 10px;

  header {
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(91, 91, 192);
  }
`;

const VolItems = styled.div`
  height: 500px;
  overflow: auto;
`;

const Header = styled.header`
  display: flex;
  margin: 0px 30px;
`;

const Footer = styled.footer`
  display: flex;
  margin: 0px 30px;
  justify-content: end;
`;

const StatusForm = ({ organizations }: any) => {
  const [activityData, setActivityData] = useState(null);
  const [isActModify, setIsActModify] = useState(false);
  const { activities, getActivities } = ActivityStore();
  // const { modActivity, modTimeList, initModData } = RegisterStore();
  const [modActData, setModActData] = useState({});
  const [ids, setIds] = useState({
    orgId: -1,
    actId: -1,
  });

  useEffect(() => {
    if (activityData) {
      const {
        activityName,
        activitySummary,
        activityContent,
        activityMethod,
        authorizationType,
        category,
        id,
      } = activityData;
      setModActData({
        activityName,
        activitySummary,
        activityContent,
        activityMethod,
        authorizationType,
        category,
      });
      setIds({
        ...ids,
        actId: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityData]);

  const checkObjIsEmpty = (obj: any) => {
    for (let key in obj) if (!obj[key].trim()) return false;
    return true;
  };

  const onChangeOrgId = (orgId: number) => {
    setIds({
      ...ids,
      orgId: orgId,
    });
    getActivities(orgId);
  };

  const onClickDeleteActivity = async (actId: any, orgId: any) => {
    if (window.confirm("해당 봉사를 정말 삭제하시겠습니까?")) {
      let res = await deleteActivity(actId);
      if (res?.data.statusCode === 200) {
        alert("삭제되었습니다.");
        setActivityData(null);
        getActivities(orgId);
      }
    }
  };

  const onClickUpdateActivity = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      if (checkObjIsEmpty(modActData)) {
        let res = await updateActivity(ids.actId, modActData);
        if (res?.data.statusCode === 200) {
          alert("수정되었습니다.");
          setIsActModify(false);
          setActivityData(null);
          getActivities(ids.orgId);
        }
      } else {
        alert("공백이 있습니다. 수정되지 않았습니다.");
      }
    }
  };

  const onChangeModAct = (e: any) => {
    const { name, value } = e.target;
    setModActData({
      ...modActData,
      [name]: value,
    });
  };

  return (
    <>
      {!activityData && !isActModify && (
        <div>
          <select onChange={(e) => onChangeOrgId(+e.target.value)}>
            <option value="">선택해주세요.</option>
            {organizations?.map((e: OrgProps) => (
              <option
                key={e.id}
                value={e.id}
                selected={(activities?.[0]?.organization || "") === e.name}
              >
                {e.name}
              </option>
            ))}
          </select>
          <VolList>
            <header style={{ fontWeight: "550" }}>봉사 내용</header>
            {!!activities?.length && (
              <VolItems>
                {activities.map((item) => (
                  <VolItem
                    key={item.id}
                    data={item}
                    setActivityData={setActivityData}
                    onClickDeleteActivity={onClickDeleteActivity}
                    setIsActModify={setIsActModify}
                  />
                ))}
              </VolItems>
            )}
            {!activities?.length && (
              <div style={{ textAlign: "center" }}>
                등록된 봉사가 없는 기관입니다
              </div>
            )}
          </VolList>
        </div>
      )}
      {!!activityData && !isActModify && (
        <VolDetail
          data={activityData}
          setActivityData={setActivityData}
          onClickDeleteActivity={onClickDeleteActivity}
          setIsActModify={setIsActModify}
        />
      )}
      {!!activityData && isActModify && (
        <>
          <Header>
            <Button
              onClick={() => {
                setIsActModify(false);
                setActivityData(null);
              }}
              variant="secondary"
            >
              목록으로
            </Button>
          </Header>
          <VolDetailInfo
            data={activityData}
            modActData={modActData}
            flag="mod"
            onChange={onChangeModAct}
          />
          <Footer>
            <Button onClick={onClickUpdateActivity}>수정 완료</Button>
          </Footer>
        </>
      )}
    </>
  );
};

export default StatusForm;
