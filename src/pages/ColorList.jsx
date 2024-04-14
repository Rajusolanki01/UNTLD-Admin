import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllColors, updateTheColor } from "../features/color/colorSlice";
import DeleteButton from "../components/DeleteButton";
import LoadingBar from "../components/LoadingBar";
import { changeDateFormat } from "../utils/dateFormat";
import { SwatchesPicker } from "react-color";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Color Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Category Updated At",
    dataIndex: "updatedAt",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const colorState = useSelector((state) => state.color);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState("");
  const [colorTitle, setColorTitle] = useState("");
  const { colors, isLoading } = colorState;

  const data = colors?.map((color, index) => ({
    key: index + 1,
    title: color.title,
    createdAt: changeDateFormat(color.createdAt),
    updatedAt: changeDateFormat(color.updatedAt),
    _id: color._id,
  }));

  useEffect(() => {
    dispatch(getAllColors());
  }, [dispatch]);

  const handleModalOk = () => {
    dispatch(
      updateTheColor({
        colorId: selectedColorId,
        updateColor: colorTitle,
      })
    )
      .then(() => {
        setModalVisible(false);
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
    <div>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table
          columns={[
            ...columns,
            {
              title: "Actions",
              dataIndex: "actions",
              render: (_, record) => (
                <div className="d-flex gap-2">
                  <button
                    className="editBtn"
                    onClick={() => {
                      setSelectedColorId(record._id);
                      setModalVisible(true);
                    }}
                  >
                    <svg height="1em" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                  <div>
                    <DeleteButton colorId={record._id} />
                  </div>
                </div>
              ),
            },
          ]}
          dataSource={data}
        />
      </div>
      <Modal
        title="Update Color Title"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Please Add New Color :</p>
        <SwatchesPicker
          color={colorTitle}
          onChange={(selectedColor) => setColorTitle(selectedColor.hex)}
        />
      </Modal>
    </div>
  );
};

export default ColorList;
