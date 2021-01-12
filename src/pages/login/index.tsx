import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Checkbox, Select } from "antd"
import loginStyle from './login.module.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../app.action'
import { CONST, SYSTEMTYPE } from '@/global/enum'
import { ILoginMessage } from '@/global/interface'
import { setLocalStorage } from '@/utils'
import styled, { keyframes } from 'styled-components'
import { useOnce } from '@/utils/hooks/use-once'

// import axios from '@/api/axios'

// 避免在 Login 中重复渲染
const list = [
  {
    label: '测试菜单',
    value: 'monitor'
  },
  {
    label: '测试菜单',
    value: 'credit'
  },
  {
    label: '测试菜单',
    value: 'search'
  },
  {
    label: '测试菜单',
    value: 'origin'
  }
]

// author动画
const authorArr = ['w', 'o', 'o', 'w', '_', 'w', 'u', '7']

// form样式
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// imgage动画数组
const imagesArr = [
  <div className={loginStyle.image1} key={1}></div>,
  <div className={loginStyle.image2} key={2}></div>,
  <div className={loginStyle.image1} key={3}></div>,
  <div className={loginStyle.image1} key={4}></div>,
  <div className={loginStyle.image1} key={5}></div>,
  <div className={loginStyle.image2} key={6}></div>,
]

const magic = keyframes`
  from {
    transform: scale(20);
    filter: blur(30px);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`


const Login = (
  props: {
    history?: any;
    changeSystemType?: any;
    getLoginMessage: (message: ILoginMessage) => void;
    systemType: string;
  }
) => {
  const [activedMenu, setActivedMenu] = useState('')
  const [currentSystemType, setcurrentSystemType] = useState(props.systemType)
  const [form] = Form.useForm();
  const once = useOnce(1000)

  const { changeSystemType, getLoginMessage, history } = props
  const { Option } = Select;

  const Span = styled.span`
    display: inline-block;
    color: ${(props: { currentNumber: number }) => props.currentNumber % 2 === 0 ? '#fff' : '#fff'};
    animation: ${!once && magic} ${(props: { currentNumber: number }) => 0.5 + props.currentNumber * 0.1}s ease;
  `

  const handleChange = (type: string) => {
    console.log('切换系统')
    setcurrentSystemType(v => v = type)
  }

  const onFinish = (values: any) => {
    const loginMessage = {
      token: 'token123456',
      roles: 'admin'
    }

    // if (+getLocalStorage('loginTimes') === 0) {
    //   console.log('第一次登陆')
    //   setLocalStorage('loginTimes', 1)
    // } else {
    //   console.log('不是第一次登陆')
    //   setLocalStorage('loginTimes', getLocalStorage('loginTimes') + 1)
    // }

    // axios({
    //   method: 'get',
    //   url: '/user',
    // }).then(res => console.log(res, 'res'))

    getLoginMessage(loginMessage); // 登陆信息存入store
    changeSystemType(currentSystemType) // 选择的系统传入store
    setLocalStorage(CONST.LOGIN_MESSAGES, loginMessage) // currentSystemType 存入 localstorage
    setLocalStorage(CONST.CURRENT_SYSTEMTYPE, currentSystemType) // currentSystemType 存如 localstorage

    console.log(history, "props => history");
    SYSTEMTYPE[currentSystemType] === SYSTEMTYPE.BIGSCREEN
      // 跳转
      // 注意：这里直接从组件的state中获取systemType，可以获取到实时的type，而store中只有点击登陆按钮的时候，才会去存入
      ? history.push('/big-screen-home')
      : history.push('/admin-home')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const fill = () => {
    form.setFieldsValue({
      username: 'username',
      password: '111'
    })
  }

  const change = (v: string) => {
    setActivedMenu(value => value = v)
  }

  useEffect(() => {
    // console.table(authorArr)
  })

  return (
    <div className={loginStyle.login}>
      {/* 底部文字动画 */}
      <div className={loginStyle.authorWrap}>
        <div className={loginStyle.author}>
          {authorArr.map((v, index) =>
            <Span key={+new Date() * Math.random()} currentNumber={index}>{v}</Span>
          )}
        </div>
      </div>

      <div className={loginStyle.wrap}>
        {/* 图片动画 */}
        <div className={loginStyle.wrapLeft}>
          {imagesArr.map(item => item)}
        </div>
        <div className={loginStyle.wrapRight}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={loginStyle.loginForm}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="custom-form-button">
              <Button type="primary" block size="large" onClick={fill}>
                自动填充
              </Button>
            </Form.Item>

            <Form.Item className="custom-form-button">
              <Button type="primary" htmlType="submit" block size="large">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={loginStyle.listMenu}>
          <div>
            <Select value={currentSystemType} className={loginStyle.select} onChange={handleChange}>
              <Option value={SYSTEMTYPE.ADMIN}>后台系统</Option>
              <Option value={SYSTEMTYPE.BIGSCREEN}>大屏系统</Option>
            </Select>
          </div>
          {list.map(({ label, value }, i) => {
            return (
              <div
                className={`${loginStyle.menuItem} ${activedMenu === value ? loginStyle.atived : ''}`}
                key={i}
                onClick={() => change(value)}
              >
                {label}
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}


const mapStateToProps = (state: any) => {
  return {
    systemType: state.app.systemType
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)