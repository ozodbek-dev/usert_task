import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification, Row, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {login } from "../features/auth/auth.actions";
import { NotificationPlacement } from "antd/es/notification/interface";
import { clearError, clearToken } from "../features/auth/auth.slice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [api,contetHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const { loading, error, isLoggedIn, token } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [username, setUsername] = useState<string>("");
  const [, setCookie] = useCookies(["token"])
  const [password, setPassword] = useState<string>("");

   const openNotification = (
    placement: NotificationPlacement,
    type: string,
    msg: string
  ) => {
    if (type === "error") {
      api.error({
        message: `Error! ${msg}`,
        placement,
      });
      return;
    }
    api.success({
      message: `Success! ${msg}`,
      placement,
    });
  };

  const submitHandler = () => {
    dispatch(login({ username, password }));
  };


  useEffect(() => {
        if (error) {
            openNotification("top", "error", error);
            dispatch(clearError());
            return;
          }
        
          if(isLoggedIn){
            if(token?.token){
              openNotification("top", "success", "You are logged in ")
            }
            setTimeout(() => {
              navigate("/prods")
            }, 500);
          }
          if(isLoggedIn && token){
            setCookie("token",token.token,
              {
                expires:new Date(token.expires_at)
              }
            )
          dispatch(clearToken())
          }


  }, [error, isLoggedIn,dispatch]);
  return (
    <Row align={"middle"} justify="center">
      {contetHolder}
      <Form
        layout="vertical"
        form={form}
        initialValues={{ layout: "vertical" }}
        style={{
          maxWidth: 600,
          minWidth: 300,
          width:"30vmax",
          borderRadius: "10px",
          background: "white",
          padding: "30px",
        }}
      >
        <Typography.Title>Login</Typography.Title>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={!username || !password}
            onClick={submitHandler}
            loading={loading}
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
