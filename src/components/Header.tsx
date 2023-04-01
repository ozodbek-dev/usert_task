import React from "react";
import { Header } from "antd/es/layout/layout";
import { Button, Row, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/auth.actions";

const HeaderComp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const removeCookie = useCookies(['token'])[2];
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const logoutHandler = ()=>{
    removeCookie("token");
    dispatch(logout())
    navigate("/");
  }
  return (
    <Header style={{padding:"0 10vmax"}}>
      <Row align="middle" justify="center">
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{ display: "flex", alignItems: "center", color: "white" }}
          >
         <span style={{ color: "lightblue" }}>TASK</span>
          </h1>
          {isLoggedIn && (
            <Button
              type="primary"
              style={{ display: "flex", alignItems: "center", fontSize:"18px" }}
              onClick={logoutHandler}
            >
              Logout <LogoutOutlined />
            </Button>
          )}
        </Space>
      </Row>
    </Header>
  );
};

export default HeaderComp;
