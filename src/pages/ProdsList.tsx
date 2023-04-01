import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { useCookies } from "react-cookie";
import { NotificationPlacement } from "antd/es/notification/interface";
import { getAllProds } from "../features/prod/prod.actions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Table } from "antd";
import GlobalSearch from "../components/GlobalSearch";
import { clearError } from "../features/prod/prod.slice";

export interface ProdType {
  id: number | string;
  name: string;
  price_uz: number;
  price_$: number;
  count: number;
  description: string;
}

export default function ProdsList() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const { loading, error, fillteredProds } = useAppSelector((state) => state.prods);
  const [cookies, ] = useCookies(["token"]);

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

  useEffect(() => {
      setProducts(fillteredProds);
  }, [fillteredProds]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price (UZS)",
      dataIndex: "price_uz",
    },
    {
      title: "Price (USD)",
      dataIndex: "price_$",
    },
  ];

  useEffect(() => {
    if (cookies.token) {
      dispatch(getAllProds(cookies.token));
    }
  }, []);

  useEffect(() => {
    if (error) {
        openNotification("top", "error", error);
        dispatch(clearError());
        return;
      }

}, [error,dispatch]);

  return (
    <div style={{width:"100%"}}>
      <GlobalSearch/>
      {contextHolder}
      <Table columns={columns} dataSource={products} loading={loading} bordered/>
    </div>
  );
}
