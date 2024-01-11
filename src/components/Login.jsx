import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
import { Flex, Spin } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      message.success("Login successful!");
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error.response.data.message);
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid email address");
  };

  const validatePassword = (_, value) => {
    if (value && value.length >= 8) {
      return Promise.resolve();
    }
    return Promise.reject("Password must be at least 8 characters");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form
        style={{
          width: 300,
          borderRadius: 8,
          padding: 16,
          boxShadow: "1px 2px 4px rgba(0,0,0,0.1)",
          border: "2px solid #FFB534", // Border with #FFB534 color
        }}
        name="login-form"
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <h1
          style={{
            color: "#FFB534",
            textAlign: "center",
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Login
        </h1>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { validator: validateEmail },
          ]}
        >
          <Input style={{ borderRadius: 6, borderColor: "#FFB534" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password style={{ borderRadius: 6, borderColor: "#FFB534" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          {loading ? (
            <Flex align="center" justify="center" gap="middle">
              <Spin />
            </Flex>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: 6,
                width: "100%",
                backgroundColor: "#FFB534",
                borderColor: "#FFB534",
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
