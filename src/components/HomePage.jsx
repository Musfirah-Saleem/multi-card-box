import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Row, Col, message, Space } from "antd";
import MyCard from "./Card";
const { Title } = Typography;

const HomePage = () => {
  const [storeData, setStoreData] = useState([]);
  const [addItem, setAddItem] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("allItems")) || [];
    setStoreData(storedData);
  }, []);

  const handleInputChange = (e) => {
    setAddItem(e.target.value);
  };

  const handleButtonClick = () => {
    if (addItem !== "") {
      const newItem = { id: Date.now(), value: addItem };
      if (editItemId !== null) {
        const updatedData = storeData.map((item) =>
          item.id === editItemId ? { ...item, value: addItem } : item
        );
        setStoreData(updatedData);
        localStorage.setItem("allItems", JSON.stringify(updatedData));
        setEditItemId(null);
        message.success("Item edited successfully");
      } else {
        const updatedData = [...storeData, newItem];
        setStoreData(updatedData);
        localStorage.setItem("allItems", JSON.stringify(updatedData));
        message.success("Item added successfully");
      }
      setAddItem("");
    } else {
      message.error("Please add the title");
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = storeData.find((input) => input.id === id);
    setAddItem(itemToEdit.value);
    setEditItemId(id);
  };

  const handleDelete = (id) => {
    const updatedData = storeData.filter((item) => item.id !== id);
    setStoreData(updatedData);
    localStorage.setItem("allItems", JSON.stringify(updatedData));
    message.success("Item deleted successfully");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Title level={2} style={{ color: "#FFB534", fontWeight: "bold" }}>
        Home Page
      </Title>
      <Row justify="center">
        <Col xs={24} sm={16} md={12} lg={8} xl={6} style={{ display: "flex" }}>
          <Input
            placeholder="Enter something"
            value={addItem}
            onChange={handleInputChange}
            style={{ borderColor: "#FFB534", flexGrow: 1, marginRight: "8px" }}
          />
          <Button
            type="primary"
            onClick={handleButtonClick}
            style={{ backgroundColor: "#FFB534", fontWeight: "bold" }}
          >
            {editItemId !== null ? "Update" : "Add card"}
          </Button>
        </Col>
      </Row>
      <MyCard data={storeData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
