import React, { useState } from "react";
import { Card, Button, Row, Col, Empty } from "antd";

const MyCard = ({ data, onEdit, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDelete = (id, index) => {
    onDelete(id);
    if (index === data.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  return (
    <div style={{ margin: "16px" }}>
      {data?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data.map((input, index) => (
            <Col xs={24} sm={12} md={6} lg={6} key={input.id}>
              <Card
                bordered
                style={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginTop: "16px",
                  padding: "16px",
                  border: "1px solid #FFB534",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                }}
                headStyle={{ color: "#FFB534", marginBottom: "16px" }}
                title={input.value}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Row
                    gutter={[16, 16]}
                    style={{
                      display: index === currentIndex ? "flex" : "none",
                    }}
                  >
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        style={{ border: "1px solid #FFB534" }}
                      >
                        Back
                      </Button>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Button
                        disabled={index === data.length - 1}
                        onClick={handleNext}
                        style={{ border: "1px solid #FFB534" }}
                      >
                        Next
                      </Button>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Button
                        onClick={() => onEdit(input.id)}
                        style={{ border: "1px solid #FFB534" }}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Button
                        onClick={() => handleDelete(input.id, index)}
                        style={{ border: "1px solid #FFB534" }}
                      >
                        Del
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default MyCard;
