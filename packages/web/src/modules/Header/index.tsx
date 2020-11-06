import React from "react";
import { Menu } from 'antd';
import { OrderedListOutlined, FolderOpenOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

function handleClick(info: { key: any; }) {
  console.log(`clicked ${info.key}`);
  console.log(info);
}

const Header = () => 
<div style={{ margin: 20, display: "flex", justifyContent: "center" }}>

<Menu onClick={handleClick}  mode="horizontal">
        <Menu.Item key="list" icon={<OrderedListOutlined />}>
          <Link to={`/viewraw`}>
          전체목록
          </Link>
        </Menu.Item>
        <Menu.SubMenu icon={<EditOutlined />} title="데이터입력">
          <Menu.ItemGroup title="">
            <Menu.Item key="setting:1">
              <Link to={`/insertyear`}>
                연도입력
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to={`/insertmonth`}>
                월입력
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item key="app" icon={<FolderOpenOutlined />}>
          <Link to={`/createedb`}>
          에너지테이블 생성
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            외부링크 주소 연결
          </a>
        </Menu.Item> */}
      </Menu>
</div>;


export default Header;