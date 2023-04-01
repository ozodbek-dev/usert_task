import React from 'react';
import {Footer} from "antd/es/layout/layout";
import {Row, Typography} from "antd";

const FooterComp = () => {
    return (
        <Footer>
           <Row align="middle" justify='center' >
               <Typography.Title level={5}>
                   &copy; {new Date().getFullYear()}
               </Typography.Title >
           </Row>
        </Footer>
    );
};
export default FooterComp;
