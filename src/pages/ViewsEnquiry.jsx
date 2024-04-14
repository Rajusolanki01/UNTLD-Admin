import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";
import { avatar } from "../assets/assets";
import {
  getASingleEnquiry,
  updateTheEnquiriesStatus,
} from "../features/enquiry/enquirySlice";
import { Modal, Select, Tag } from "antd";
import { changeDateFormat } from "../utils/dateFormat";

const { Option } = Select;

const ViewsEnquiry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [enquiryTextStatus, setEnquiryTextStatus] = useState("");
  const [selectedEnquiryId, setSelectedEnquiryId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const enquiryState = useSelector((state) => state.enquiry);
  const singleEnquiryState = useSelector(
    (state) => state.enquiry.singleEnquiry
  );
  const { isLoading } = enquiryState;
  const userInfo = singleEnquiryState.user;

  useEffect(() => {
    dispatch(getASingleEnquiry(id));
  }, [dispatch, id]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleModalOk = () => {
    dispatch(
      updateTheEnquiriesStatus({
        updateEnquiryId: selectedEnquiryId,
        statusEnquiry: selectedStatus,
      })
    )
      .then(() => {
        setModalVisible(false);
        setTimeout(() => {
          navigate("/dashboard/enquiries");
        }, 100);
      })
      .catch((error) => {
        console.error(
          "An error occurred while updating the enquiry status:",
          error
        );
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <div className="LoadingBar">
        <LoadingBar />
      </div>
    );
  }

  return (
    <div className="d-flex gap-3 flex-wrap">
      <div className="card position-relative">
        <div className="card__img">
          <svg width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect height={400} width={540} fill="#ffffff" />
            <defs>
              <linearGradient
                gradientTransform="rotate(222,648,379)"
                y2="100%"
                y1={0}
                x2={0}
                x1={0}
                gradientUnits="userSpaceOnUse"
                id="a"
              >
                <stop stopColor="#ffffff" offset={0} />
                <stop stopColor="#FC726E" offset={1} />
              </linearGradient>
              <pattern
                viewBox="0 0 1080 900"
                y={0}
                x={0}
                height={250}
                width={300}
                id="b"
                patternUnits="userSpaceOnUse"
              >
                <g fillOpacity="0.5">
                  <polygon points="90 150 0 300 180 300" fill="#444" />
                  <polygon points="90 150 180 0 0 0" />
                  <polygon points="270 150 360 0 180 0" fill="#AAA" />
                  <polygon points="450 150 360 300 540 300" fill="#DDD" />
                  <polygon points="450 150 540 0 360 0" fill="#999" />
                  <polygon points="630 150 540 300 720 300" />
                  <polygon points="630 150 720 0 540 0" fill="#DDD" />
                  <polygon points="810 150 720 300 900 300" fill="#444" />
                  <polygon points="810 150 900 0 720 0" fill="#FFF" />
                  <polygon points="990 150 900 300 1080 300" fill="#DDD" />
                  <polygon points="990 150 1080 0 900 0" fill="#444" />
                  <polygon points="90 450 0 600 180 600" fill="#DDD" />
                  <polygon points="90 450 180 300 0 300" />
                  <polygon points="270 450 180 600 360 600" fill="#666" />
                  <polygon points="270 450 360 300 180 300" fill="#AAA" />
                  <polygon points="450 450 360 600 540 600" fill="#DDD" />
                  <polygon points="450 450 540 300 360 300" fill="#999" />
                  <polygon points="630 450 540 600 720 600" fill="#999" />
                  <polygon points="630 450 720 300 540 300" fill="#FFF" />
                  <polygon points="810 450 720 600 900 600" />
                  <polygon points="810 450 900 300 720 300" fill="#DDD" />
                  <polygon points="990 450 900 600 1080 600" fill="#AAA" />
                  <polygon points="990 450 1080 300 900 300" fill="#444" />
                  <polygon points="90 750 0 900 180 900" fill="#222" />
                  <polygon points="270 750 180 900 360 900" />
                  <polygon points="270 750 360 600 180 600" fill="#DDD" />
                  <polygon points="450 750 540 600 360 600" />
                  <polygon points="630 750 540 900 720 900" />
                  <polygon points="630 750 720 600 540 600" fill="#444" />
                  <polygon points="810 750 720 900 900 900" fill="#AAA" />
                  <polygon points="810 750 900 600 720 600" fill="#666" />
                  <polygon points="990 750 900 900 1080 900" fill="#999" />
                  <polygon points="180 0 90 150 270 150" fill="#999" />
                  <polygon points="360 0 270 150 450 150" fill="#444" />
                  <polygon points="540 0 450 150 630 150" fill="#FFF" />
                  <polygon points="900 0 810 150 990 150" />
                  <polygon points="0 300 -90 450 90 450" fill="#222" />
                  <polygon points="0 300 90 150 -90 150" fill="#FFF" />
                  <polygon points="180 300 90 450 270 450" fill="#FFF" />
                  <polygon points="180 300 270 150 90 150" fill="#666" />
                  <polygon points="360 300 270 450 450 450" fill="#222" />
                  <polygon points="360 300 450 150 270 150" fill="#FFF" />
                  <polygon points="540 300 450 450 630 450" fill="#444" />
                  <polygon points="540 300 630 150 450 150" fill="#222" />
                  <polygon points="720 300 630 450 810 450" fill="#AAA" />
                  <polygon points="720 300 810 150 630 150" fill="#666" />
                  <polygon points="900 300 810 450 990 450" fill="#FFF" />
                  <polygon points="900 300 990 150 810 150" fill="#999" />
                  <polygon points="0 600 -90 750 90 750" />
                  <polygon points="0 600 90 450 -90 450" fill="#666" />
                  <polygon points="180 600 90 750 270 750" fill="#AAA" />
                  <polygon points="180 600 270 450 90 450" fill="#444" />
                  <polygon points="360 600 270 750 450 750" fill="#444" />
                  <polygon points="360 600 450 450 270 450" fill="#999" />
                  <polygon points="540 600 630 450 450 450" fill="#666" />
                  <polygon points="720 600 630 750 810 750" fill="#222" />
                  <polygon points="900 600 810 750 990 750" fill="#FFF" />
                  <polygon points="900 600 990 450 810 450" fill="#222" />
                  <polygon points="0 900 90 750 -90 750" fill="#DDD" />
                  <polygon points="180 900 270 750 90 750" fill="#444" />
                  <polygon points="360 900 450 750 270 750" fill="#FFF" />
                  <polygon points="540 900 630 750 450 750" fill="#AAA" />
                  <polygon points="720 900 810 750 630 750" fill="#FFF" />
                  <polygon points="900 900 990 750 810 750" fill="#222" />
                  <polygon points="1080 300 990 450 1170 450" fill="#222" />
                  <polygon points="1080 300 1170 150 990 150" fill="#FFF" />
                  <polygon points="1080 600 990 750 1170 750" />
                  <polygon points="1080 600 1170 450 990 450" fill="#666" />
                  <polygon points="1080 900 1170 750 990 750" fill="#DDD" />
                </g>
              </pattern>
            </defs>
            <rect height="100%" width="100%" fill="url(#a)" y={0} x={0} />
            <rect height="100%" width="100%" fill="url(#b)" y={0} x={0} />
          </svg>
        </div>

        <div className="image-cricle">
          <img src={avatar} alt="" className="avatar-image" />
        </div>
        <div className="card__title">{`${userInfo?.firstname} ${userInfo?.lastname}`}</div>
        <div className="card__subtitle p-3 d-flex gap-3">
          <div>
            <Tag
              className="p-2"
              color={
                singleEnquiryState?.status === "Submitted"
                  ? "blue"
                  : singleEnquiryState?.status === "Contacted"
                  ? "gold"
                  : singleEnquiryState?.status === "In Progress"
                  ? "red"
                  : singleEnquiryState?.status === "Resolved"
                  ? "green"
                  : ""
              }
            >
              {singleEnquiryState?.status}
            </Tag>
          </div>
          <div>
            {" "}
            <button
              className="editBtn"
              onClick={() => {
                setEnquiryTextStatus(singleEnquiryState?.status);
                setSelectedEnquiryId(id);
                setModalVisible(true);
              }}
            >
              <svg height="1em" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="card__wrapper d-flex align-singleUserStates-center gap-3"></div>
      </div>
      <div className="card-2">
        <div className="heading m-2 flex-grow-1">
          <div className="customer py-2">
            <div className="customer-details d-flex flex-wrap flex-column m-1">
              <div className="d-flex gap-2 mb-0">
                <h6 className="mt-0">Name : </h6>
                <p>{`${userInfo?.firstname} ${userInfo?.lastname}`}</p>
              </div>
              <div className="d-flex gap-2">
                <h6>Email : </h6>
                <p>{userInfo?.email}</p>
              </div>
              <div className="d-flex gap-2">
                <h6>Mobile : </h6>
                <a href="tel:+" className="text-bg-info">
                  {userInfo?.mobile}
                </a>
              </div>
              <div className="d-flex gap-2"></div>

              <div className="d-flex gap-3 my-2">
                <h6 className="mb-3 mt-2">Address :</h6>
                <div className="ml-1">
                  {userInfo?.address?.map((address, index) => (
                    <p key={index}>
                      <span>{`${address?.street}`}</span> <br />
                      <span>
                        {` ${address?.city}, ${address?.state}, ${address?.zipcode}
                        `}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="d-flex gap-2">
                <h6>status : </h6>
                <Tag
                  color={
                    singleEnquiryState?.status === "Submitted"
                      ? "blue"
                      : singleEnquiryState?.status === "Contacted"
                      ? "gold"
                      : singleEnquiryState?.status === "In Progress"
                      ? "red"
                      : singleEnquiryState?.status === "Resolved"
                      ? "green"
                      : ""
                  }
                >
                  {singleEnquiryState?.status}
                </Tag>
              </div>
              <div className="d-flex gap-2 my-2">
                <h6 className="mb-0">Date : </h6>
                {changeDateFormat(singleEnquiryState?.updatedAt)}
              </div>

              <div className="d-flex gap-2 my-2">
                <h6 className="mb-0">Comment : </h6>
                <span className="blocked">{singleEnquiryState?.comment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Update Enquiry Status"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Please select the new Enquiry Status:</p>
        <Select
          style={{ width: 200 }}
          onChange={handleStatusChange}
          defaultValue={enquiryTextStatus}
        >
          <Option value="Submitted">Submitted</Option>
          <Option value="Contacted">Contacted</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Resolved">Resolved</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ViewsEnquiry;
