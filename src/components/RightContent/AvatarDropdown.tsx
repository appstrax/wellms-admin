import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Spin, message } from 'antd';
import { history, useModel, FormattedMessage } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { logout } from '@/services/escola-lms/auth';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginOut = useCallback(async () => {
    const msg = await logout();
    if (msg.success) {
      localStorage.removeItem('TOKEN');
      message.success(msg.message);

      const { query = {} } = history.location;
      const { redirect } = query;
      if (window.location.pathname !== '/user/login' && !redirect) {
        setInitialState({ ...initialState, currentUser: undefined });
      }
    } else {
      message.error(msg.message);
    }
  }, [initialState, setInitialState]);

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        loginOut();
        return;
      }
      history.push(`/users/${key}`);
    },
    [initialState, setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser?.data?.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="me">
        <SettingOutlined />
        <FormattedMessage id="my_profile" />
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        <FormattedMessage id="logout" />
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <span className={`${styles.name} anticon`}>{currentUser.data.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
