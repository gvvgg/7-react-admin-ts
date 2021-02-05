import React from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { removeLocalStorage } from '@/utils'
import { useHistory } from 'react-router-dom'
import { LoginOutlined, UserOutlined, BookOutlined } from '@ant-design/icons'
import './smart-avatar-menu.scss'

const SmartAvatarMenu = () => {
  const history = useHistory()

  const loginOut = () => {
    history.replace('/login')
    removeLocalStorage() // 不传参表示删除所有
  }

  const menu = (
    <Menu className="smart-avatar-menu" style={{ zIndex: 2 }}>
      <Menu.Item disabled style={{ width: '200px' }}>
        用户设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item style={{ width: '200px' }}>
        <BookOutlined />
        <a href="https://juejin.cn/user/1063982989065799/posts" target="__blank" style={{ display: 'inline-block' }}>
          博客地址
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={loginOut}>
        <LoginOutlined /> 退出登陆
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} overlayClassName="smart-avatar-menu-wrap">
      <Avatar
        style={{
          backgroundColor: '#87d068',
          cursor: 'pointer',
        }}
        className="smart-avatar-menu-icon"
        icon={<UserOutlined />}
      />
    </Dropdown>
  )
}

export default SmartAvatarMenu
